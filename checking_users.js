const form = document.querySelector('form');
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

form.addEventListener('submit', function(event) {
    event.preventDefault();
    alert(username);
    alert(password);
});


