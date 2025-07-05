// Transcribe the credentials over here
const theForm = document.getElementById('this_and_that');
theForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    
    // Now that you have the credentials, check if they are found 
    // within the MySQL table containing them.

    fetch('/api/user-retrieval')
    .then((res) => {
        if (!res.ok) throw new Error('Did not work mate');
        return res.json();
    })
    .then((data) => {
        data.forEach((row) => {
            alert(row)
        })
    })
    
});


