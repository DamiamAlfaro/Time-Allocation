
/* ANNOTATE THE TIME: We need to do three crucial things:
1) Label the activity
2) Start counting the activity's time
3) Stop the activity's time and do the math
on the total hours spent on it. Let's start with
that functionility. */

// Label the activity
const form = document.querySelector("form");

function alertingTotal() {
    const theValue = document.getElementById("activity").value;
}

// Start counting the activity's time

function startingCount() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const currentTime = `${hours}: ${minutes}: ${seconds}`;
    const timeList = [hours, minutes, seconds];
    return timeList;

}


// This is temporary but this basically just triggers
// all of the functions below.
function activationFunction() {
    alertingTotal();
    startingCount();
}

form.addEventListener("submit",activationFunction);


