
/* ANNOTATE THE TIME: We need to do three crucial things:
1) Label the activity
2) Start counting the activity's time
3) Stop the activity's time and do the math
on the total hours spent on it. Let's start with
that functionility. */

// Label the activity
const form = document.querySelector("form");
const endButton = document.getElementById("finish_button");
 

// Start counting the activity's time

function gettingTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return [hours, minutes, seconds];

}

// This is temporary but this basically just triggers
// all of the functions below.
function activationFunction(event) {
    event.preventDefault();
    timeStarting = gettingTime();
    alert(`Time started at: ${timeStarting.join(":")}`);
}


// Stop the acitivity and start doing the math
let timeStarting = activationFunction();



function deactivationFunction() {
    const timeEnd = gettingTime();
    return timeEnd;
}

let timeFinishing = deactivationFunction();

endButton.addEventListener("click",deactivationFunction);

alert(`Start: ${timeStarting}, Ending: ${timeFinishing}`);

