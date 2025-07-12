// PREVENT NON USERS ENTRY: Check if the user has logged in.




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

// Stop the activity and start doing the math. Also,
// keep the elapsed time stored in a different variable
// for later use in analysis.

let elapsedTime = 0;

function deactivationFunction() {
    timeFinishing = gettingTime();
    alert(`Time finished at: ${timeFinishing.join(":")}`);

    if(timeStarting) {
        const startSeconds = timeStarting[0]*3600 + timeStarting[1]*60 + timeStarting[2];
        const endSeconds = timeFinishing[0]*3600 + timeFinishing[1]*60 + timeFinishing[2];
        elapsedTime = endSeconds - startSeconds
        const theActivity = document.getElementById('activity').value; 
        alert(`Elapsed seconds: ${elapsedTime} for activity: ${theActivity}`);

        // We will use the function below for STORE TIME approach. Let's
        // keep everything organized. DB PW: timeallocationw1Ns!

        storeElapsedTime(elapsedTime, theActivity);

    }
}

// Activate the mechanism
form.addEventListener("submit", activationFunction);
endButton.addEventListener("click",deactivationFunction);


/* STORE TIME:
The next step is to store the time sowhere. First of all,
we are going to store the time using a tabulation form. The
second thing will be to store every single iteration of the 
program separately. After that, we will do the statistics
of the site. */

function storeElapsedTime(time, activity) {

    const payload = {
        time,
        activity,
        timestamp: new Date().toISOString(),
    };

    fetch('../api/store-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
        })
        .then((data) => {
        console.log('Stored!', data);
        alert('Activity stored successfully!');
        })
        .catch((err) => {
        console.error('Error:', err);
        alert('Failed to store activity.');
        });

}


/* SHOW ALL ACTIVITIES:
Let's show all the activities that have been listed 
within the lifespan of the user. */

const displayActivitiesButton = document.getElementById(
    "show_activities_button").addEventListener(
        'click',showActivities);


function showActivities() {
  fetch('../api/show-activities')
    .then((res) => {
      if (!res.ok) throw new Error('Network error');
      return res.json();
    })
    .then((data) => {
      const container = document.getElementById('activitiesContainer');
      container.innerHTML = ''; // Clear old results

      if (data.length === 0) {
        container.innerHTML = '<p>No activities found.</p>';
        return;
      }


      data.forEach((row) => {
        const div = document.createElement('div');
        div.className = 'activity-entry';
        div.innerHTML = `
          <p><strong>Activity:</strong> ${row.activity}</p>
          <p><strong>Elapsed Time:</strong> ${row.elapsed_time} seconds</p>
          <p><strong>Timestamp:</strong> ${new Date(row.timestamp).toLocaleString()}</p>
          <hr>
        `;
        container.appendChild(div);
      });
    })
    .catch((err) => {
      console.error('Error:', err);
      alert('Failed to load activities.');
    });

}


/* STATISTICS:
Let's calculate how many hours per activiy the user
possesses. */

const statisticsButton = document.getElementById(
    "show_statistics_button").addEventListener("click",hoursStatistics);

function hoursStatistics() {
  fetch('../api/show-activities')
    .then((res) => {
      if (!res.ok) throw new Error('Network error');
      return res.json();
    })
    .then((data) => {
      const container = document.getElementById('activitiesContainer');
      container.innerHTML = ''; // Clear old results

      if (data.length === 0) {
        container.innerHTML = '<p>No activities found.</p>';
        return;
      }

      // Stratify each of the activities within an object.
      const activitySummary = {};

      // Add each of the activities and their respective times.
      data.forEach((row) => {
        
        if (!activitySummary[row.activity]) {
            activitySummary[row.activity] = {
                count: 1,
                totalDuration: row.elapsed_time
            };
        } else {
            activitySummary[row.activity].count += 1;
            activitySummary[row.activity].totalDuration += row.elapsed_time
        }

      });
      
      // Display the statistics for each of the activities.
      const statisticsDisplay = document.getElementById('statisticsContainer');
      statisticsDisplay.innerHTML = "";
      for (const activity in activitySummary) {
        const p = document.createElement("p")
        p.textContent = `${activity}: ${activitySummary[activity].count} times, total duration ${activitySummary[activity].totalDuration} mins`;    
        statisticsDisplay.appendChild(p) 
      }

    })
    .catch((err) => {
      console.error('Error:', err);
      alert('Failed to load activities.');
    });

}

/* ERROR HANDLING:
We want to make sure that an alert is thrown if the user
attempts to leave the website without closing or finishing
the activity running. How? Let's see... */

// Attach a checking mechanism to the button that
// starts each of the outsets for each activity.
const submissionButton = document.getElementById("submit_button");

// This will be the "body guard that decides whether
// one should leave or not.
let preventLeaving = false;

// If the submission button is clicked, we assign
// the body guard to the user. 
submissionButton.addEventListener('click', function() {
  preventLeaving = true;
});

// If the finish button is clicked, we relocate
// the body guard somewhere else.
endButton.addEventListener('click', function() {
  preventLeaving = false;
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

// This function is to check if the guard is in his
// position or not.
function preventUserFromLeaving(event) {
  if (preventLeaving) {
    event.preventDefault();
    event.returnValue = 'You cannot leave mate';
  }
}

// If the user tries to leave, the code assigns
// the body guard to him...
window.addEventListener("beforeunload", preventUserFromLeaving);


/* USER MANAGEMENT:
We will check if the username and user's password derived
from the landing index.html form is found within the MySQL
via fetch() API, and other approaches */
