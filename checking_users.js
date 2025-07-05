// Transcribe the credentials over here
// const form = document.getElementById('this_and_that');

// function alertingCredentials(event) {
//     event.preventDefault();
    
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     alert(username);
//     alert(password);
// }

// form.addEventListener("submit", alertingCredentials);

const theForm = document.getElementById('this_and_that');
theForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    alert(formData.username);

});


// Now that you have the credentials, check if they are found 
// within the MySQL table containing them.
