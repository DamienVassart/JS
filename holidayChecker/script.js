const DATE_FORMAT = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
};

var now = new Date(Date.now());

var form = document.getElementById("form");
var startDate = document.getElementById("start-date");
var startTime = document.getElementById("start-time");
var endDate = document.getElementById("end-date");
var endTime = document.getElementById("end-time");
var result = document.getElementById("result");

// adds a '0' before the number of minutes & the number of seconds if it is less than 10:
function twoDigits(n) {
    return n < 10 ? "0" + n : n;
}

// adds a 's' the the words 'day', 'hour', 'minute' & 'second' if they come after a number bigger than 1:
function pad(n, str) {
    if (n < 1) return "";
    else if (n === 1) return n + str + " ";
    else if (n > 1) return n + str + "s ";
}

// returns the interval between the dates sent by the user:
function interval(a, b) {
    var d = Math.floor((a - b) / 86400000);
    var h = Math.floor((a - b) / 3600000) % 24;
    var m = Math.floor((a - b) / 60000) % 60;
    var s = Math.floor((a - b) / 1000) % 60;
    return pad(d, " day") + pad(h, " hour") + pad(twoDigits(m), " minute") + pad(twoDigits(s), " second") + "</p>";
};

// Time input fields being optional, a default value is set to 00:00 (12:00 AM)
startTime.defaultValue = "00:00";
endTime.defaultValue = "00:00";
// before the user sends input, the div containing the result is hidden:
result.style.visibility = "hidden";

form.addEventListener("submit", function(e) {
    result.style.visibility = "visible";
    result.innerHTML = "";

    // These variables will store the user's input:
    var targetStartDate = new Date(startDate.value);
    var targetEndDate = new Date(endDate.value);
    var targetStartTime = startTime.value.split(""); // time input field sends data as a string; we split it to separate the hours and minutes and store them in an array
    var targetEndTime = endTime.value.split(""); // same than above

    // Setting the hours and minutes for the given dates:
    targetStartDate.setHours(targetStartTime[0]);
    targetStartDate.setMinutes(targetStartTime[1]);
    targetStartDate.setSeconds(0);
    targetEndDate.setHours(targetEndTime[0]);
    targetEndDate.setMinutes(targetEndTime[1]);
    targetEndDate.setSeconds(0);

    // Displaying the result:

    if (targetStartDate > targetEndDate) {
        result.innerHTML =
            "<p>Your vacation <strong>cannot</strong> start after it ends !</p>";
    } else {
        if (now < targetStartDate) {
            result.innerHTML = "<p>" + interval(targetStartDate, now) + " remaining.</p>";
        } else if (now > targetStartDate && now < targetEndDate) {
            result.innerHTML = "<p>" + interval(targetEndDate, now) + "</p><p> of vacation left.</p>";
        } else {
            result.innerHTML = "<p>Vacation ended </p><p>";
            result.innerHTML += interval(now, targetEndDate);
            result.innerHTML += "</p><p> ago.</p>";
        }
    }

    e.preventDefault();
});