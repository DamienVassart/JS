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

function twoDigits(n) {
    return n < 10 ? "0" + n : n;
}

startTime.defaultValue = "00:00";
endTime.defaultValue = "00:00";
result.style.visibility = "hidden";

form.addEventListener("submit", function(e) {
    result.style.visibility = "visible";
    result.innerHTML = "";
    // These variables will store the user's input:
    var targetStartDate = new Date(startDate.value);
    var targetEndDate = new Date(endDate.value);
    var targetStartTime = startTime.value.split("");
    var targetEndTime = endTime.value.split("");
    // Setting the time for the given dates:
    targetStartDate.setHours(targetStartTime[0]);
    targetStartDate.setMinutes(targetStartTime[1]);
    targetStartDate.setSeconds(0);
    targetEndDate.setHours(targetEndTime[0]);
    targetEndDate.setMinutes(targetEndTime[1]);
    targetEndDate.setSeconds(0);
    // Calculating the time interval and setting the days | hours | minutes | seconds values:
    var interval = 0;
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    // Displaying the result:
    var answer = document.createElement("p");

    if (targetStartDate > targetEndDate) {
        answer.innerHTML =
            "Your vacation <strong>cannot</strong> start after it ends !";
    } else {
        if (now < targetStartDate) {
            answer.innerHTML =
                Math.ceil((targetStartDate - now) / 86400000) +
                " day(s) to go before your vacation !";
        } else if (now > targetStartDate && now < targetEndDate) {
            answer.innerHTML =
                Math.ceil((targetEndDate - now) / 86400000) + " day(s) left. Enjoy !";
        } else {
            answer.innerHTML =
                "Your vacation ended " +
                Math.floor((now - targetEndDate) / 86400000) +
                " day(s) ago. Wait for the next one !";
        }
    }

    result.appendChild(answer);
    e.preventDefault();
});