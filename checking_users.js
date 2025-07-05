const form = document.getElementById('this_and_that');

function alertingCredentials(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    alert(username);
    alert(password);
}

form.addEventListener("submit", alertingCredentials);

