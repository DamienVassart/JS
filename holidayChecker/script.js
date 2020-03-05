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

function pad(n, str) {
    if (n < 1) {
        return "";
    } else if (n === 1) {
        return n + str + " ";
    } else if (n > 1) {
        return n + str + "s ";
    }
}

function interval(a, b) {
    var d = Math.floor((a - b) / 86400000);
    var h = Math.floor((a - b) / 3600000) % 24;
    var m = Math.floor((a - b) / 60000) % 60;
    var s = Math.floor((a - b) / 1000) % 60;
    return pad(d, " day") + pad(h, " hour") + pad(twoDigits(m), " minute") + pad(twoDigits(s), " second");
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

    // Displaying the result:
    var answer = document.createElement("p");

    if (targetStartDate > targetEndDate) {
        answer.innerHTML =
            "Your vacation <strong>cannot</strong> start after it ends !";
    } else {
        if (now < targetStartDate) {
            answer.innerHTML = "Hold tight, there's still <br>" + interval(targetStartDate, now) + " to go before your vacation !";
        } else if (now > targetStartDate && now < targetEndDate) {
            answer.innerHTML = "Booom ! You are on vacation and you have <br>" + interval(targetEndDate, now) + " left. Enjoy !";
        } else {
            answer.innerHTML =
                "Oh, noes ! Seems like your vacation ended <br>" + interval(now, targetEndDate) + " ago. Wait for the next one !";
        }
    }

    result.appendChild(answer);
    e.preventDefault();
});