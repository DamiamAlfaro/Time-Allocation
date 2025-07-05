// Transcribe the credentials over here
const theForm = document.getElementById('this_and_that');
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


