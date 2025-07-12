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
            document.getElementById('secondDisplay').innerHTML = "Good to go mate!";
        }

    })
    .catch((err) => {
        console.error('Error in the user retrieval in sign up fuck:', err);
        alert('something came up with user retrieval in sign up FUCK!');
    });







})

