document.getElementById('user_form').addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = FormData(form)
    alert(formData);
    
});
