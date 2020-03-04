var form = document.getElementById("form");
var date = document.getElementById("date");
var time = document.getElementById("time");
var content = document.getElementById("content");

function twoDigits(n) {
    return n < 10 ? "0" + n : n;
}

form.addEventListener("submit", function(e) {
    var targetDateTime = new Date(date.value);
    var targetTime = time.value.split(":");
    targetDateTime.setHours(targetTime[0]);
    targetDateTime.setMinutes(targetTime[1]);
    var interval = targetDateTime.getTime() - Date.now();
    var days = Math.floor(interval / 86400000);
    var hours = Math.floor(interval / 3600000) % 24;
    var minutes = Math.floor(interval / 60000) % 60;
    var seconds = Math.floor(interval / 1000) % 60;
    var msg = " to go.";
    if (interval < 0) {
        days += 1;
        hours += 1;
        minutes += 1;
        msg = " ago.";
    }
    content.innerHTML =
        Math.abs(days) +
        "d : " +
        twoDigits(Math.abs(hours)) +
        "h : " +
        twoDigits(Math.abs(minutes)) +
        "m : " +
        twoDigits(Math.abs(seconds)) +
        "s" +
        msg;
    e.preventDefault();
});