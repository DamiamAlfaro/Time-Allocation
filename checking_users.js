// Transcribe the credentials over here
const theForm = document.getElementById('signInForm');
theForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const inputtedUsername = formData.get('username');
    const inputtedPassword = formData.get('password');
    
    // Retrieve the content from the MySQL that contains
    // all of the users' information.

    fetch('/api/user-retrieval')
    .then((res) => {
        if (!res.ok) throw new Error('Did not work mate');
        return res.json();
    })
    .then((data) => {
        data.forEach((row) => {
            const userName = row.user_name;
            const userPassword = row.user_password;

            // Now that you have the credentials, as well as the
            // content from the table, check if they match.

            if (userName === inputtedUsername && userPassword === inputtedPassword) {
                matchFound = true;
            } else {
                matchFound = false;
            }
        });

        if (matchFound) {
            alert("they match mate");
        } else {
            alert("they do not match");
        }
    })
    .catch((err) => {
        console.error('Error in the fetching fuck:', err);
        alert('something came up FUCK!');
    })




    
});



// USER SIGN UP
const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Define the desired variables that we want to store
    // within the existing database.
    const formData = new FormData(this);
    const newUsername = formData.get('new_username');
    const newPassword = formData.get('new_password');
    const newEmail = formData.get('new_email');

    // Now that we have the variables, we need to store them.
    // However, let's set a rule for each of the variables:
    // Username: cannot be added if existent.
    // Password: more than 5 characters.
    // Email: cannot be added if existent.

    fetch('/api/user-retrieval')
    .then((res) => {
        if (!res.ok) throw new Error('Did not work mate');
        return res.json();
    })
    .then((data) => {
        data.forEach((row) => {
            const userNameRetrieved = row.user_name;
            const userPasswordRetrieved = row.user_password;
            const userEmailRetrieved = row.user_email;

            if (userNameRetrieved == newUsername) {
                document.getElementById('messageDisplay').innerHTML = "<p>Existent username, choose a different one.</p>";
            } else if (newEmail == userEmailRetrieved) {
                document.getElementById('messageDisplay').innerHTML = "<p>Existent email, choose a different one.</p>";
            } else if (newPassword.toString().length <= 5) {
                document.getElementById('messageDisplay').innerHTML = "<p>Make your password longer than 5 characters.</p>";
            } else {
                document.getElementById('messageDisplay').innerHTML =
                    "<p>Nice choice of credentials</p>" +
                    "<br><p>Make sure you don't forget them</p>";

                // If everything is good to go, we are going to store
                // the variables into the MySQL table. That will be the
                // next step.
                
                const payload = {
                    newUsername,
                    newPassword,
                    newEmail,
                };

                fetch("/api/store-new-user", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
                .then((res) => {
                if (!res.ok) throw new Error('Network Error New User');
                console.log(res.json());
                })
                .then((data) => {
                console.log('New user stored!', data);
                alert('Activity stored successfully!');
                })
                .catch((err) => {
                console.error('Error with new user:', err);
                alert('Failed to store activity.');
                });
                

            }

        });

    })
    .catch((err) => {
        console.error('Error in the user retrieval in sign up fuck:', err);
        alert('something came up with user retrieval in sign up FUCK!');
    })




})

