// Transcribe the credentials over here
const theForm = document.getElementById('signInForm');
theForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const inputtedUsername = formData.get('username');
    const inputtedPassword = formData.get('password');
    
    let allUsers = [];
    let allPasswords = [];

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
            allUsers.push(userName);
            allPasswords.push(userPassword);
        });

        const userIndex = allUsers.findIndex(user => user === inputtedUsername);

        if (userIndex !== -1) {
            if (allPasswords[userIndex] == inputtedPassword) {
                document.getElementById('usernameLoginFound').innerHTML = "Good to go mate.";
                document.cookie = "auth=true; path=/; SameSite=Lax";
                window.location.href = '/webapp'
            } else {
                document.getElementById('usernameLoginFound').innerHTML = "Are you sure that's your password?...";
            }

        } else {
            document.getElementById('usernameLoginFound').innerHTML = "Username not found, sign up for new account.";
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

    let existentUsernames = [];
    let existentEmails = [];

    fetch('/api/user-retrieval')
    .then((res) => {
        if (!res.ok) throw new Error('Did not work mate');
        return res.json();
    })

    .then((data) => {
        data.forEach((row) => {
            const userNameRetrieved = row.user_name;
            const userEmailRetrieved = row.user_email;

            existentUsernames.push(userNameRetrieved);
            existentEmails.push(userEmailRetrieved);

        });

        let goodToGoOrNot = false;

        if (existentUsernames.includes(newUsername)) {
            document.getElementById('messageDisplay').innerHTML = 'Username already exists, try another one...';
        } else if (existentEmails.includes(newEmail)) {
            document.getElementById('messageDisplay').innerHTML = 'Email already exists, try a different one...';
        } else if (newPassword.length <= 5) {
            document.getElementById('messageDisplay').innerHTML = 'Password must be more than 5 characters mate...';
        } else {
            document.getElementById('messageDisplay').innerHTML = 'Finally mate!';
            goodToGoOrNot = true;
        };

        if (goodToGoOrNot) {

            // Let's access the MySQL table

            let payload = {
                newUsername,
                newPassword,
                newEmail
            }

            fetch('/api/store-new-user', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then((res) => {
            if (!res.ok) throw new Error('Something came up.')
            })
            .then((data) => {
            console.log('It fucking worked!', data);
            alert('It fucking worked mon ami!');
            })
            .catch((err) => {
            console.error('Error:', err);
            alert('what the fuck man!');
            });

            document.getElementById('secondDisplay').innerHTML = "Good to go mate!";
        }

    })
    .catch((err) => {
        console.error('Error in the user retrieval in sign up fuck:', err);
        alert('something came up with user retrieval in sign up FUCK!');
    });







})

