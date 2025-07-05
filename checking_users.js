const form = document.querySelector('form');

function alertingCredentials() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    alert(username);
    alert(password);
}

form.addEventListener("submit", alertingCredentials);

