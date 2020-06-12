var form = document.getElementById("form");
var lengthElt = document.getElementById("length");
var checkboxElts = document.querySelectorAll("input[type='checkbox']");
var maxLengthElt = document.getElementById("max-length");
var passwordElt = document.getElementById("password");
var passwordLengthElt = document.getElementById("pwd-length");
var infoElt = document.getElementById("info");

function pwdParameters() {
    var length = lengthElt.value;
    var useDigits = document.getElementById("digits").checked;
    var useLowers = document.getElementById("lowers").checked;
    var useUppers = document.getElementById("uppers").checked;
    var useSymbols = document.getElementById("symbols").checked;
    var noDuplicates = document.getElementById("no-duplicates").checked;
    var regex, range;
    switch ([useDigits ? 1 : 0, useLowers ? 2 : 0, useUppers ? 4 : 0, useSymbols ? 8 : 0].reduce(function(acc, curr) { return acc + curr })) {
        case 0:
            return null;
        case 1:
            regex = /[0-9]/;
            range = 10;
            break;
        case 2:
            regex = /[a-z]/;
            range = 26;
            break;
        case 3:
            regex = /[a-z0-9]/;
            range = 36;
            break;
        case 4:
            regex = /[A-Z]/;
            range = 26;
            break;
        case 5:
            regex = /[A-Z0-9]/;
            range = 36;
            break;
        case 6:
            regex = /[A-Za-z]/;
            range = 52;
            break;
        case 7:
            regex = /[A-Za-z0-9]/;
            range = 62;
            break;
        case 8:
            regex = /\W|_/;
            range = 33;
            break;
        case 9:
            regex = /\W|_|\d/;
            range = 43;
            break;
        case 10:
            regex = /\W|_|[a-z]/;
            range = 59;
            break;
        case 11:
            regex = /\W|_|[a-z0-9]/
            range = 69;
            break;
        case 12:
            regex = /\W|_|[A-Z]/;
            range = 59;
            break;
        case 13:
            regex = /\W|_|[A-Z0-9]/;
            range = 69;
            break;
        case 14:
            regex = /\W|_|[A-Za-z]/;
            range = 85;
            break;
        case 15:
            regex = /./;
            range = 95;
            break;
    }
    return noDuplicates ? [length, regex, range, noDuplicates] : [length, regex, 100, noDuplicates];
}

function randomNumber() {
    let n = Math.trunc(Math.random() * 100) + 32;
    return n > 126 ? n - 5 : n;
}

function pwdGen() {
    var pwdLength = pwdParameters()[0]
    var regExp = pwdParameters()[1];
    var noDup = pwdParameters()[3];
    var res = '';
    if (noDup) {
        while (res.length < pwdLength) {
            let c = String.fromCharCode(randomNumber());
            if (regExp.test(c) && res.indexOf(c) === -1) res += c;
        }
    }
    while (res.length < pwdLength) {
        let c = String.fromCharCode(randomNumber());
        if (regExp.test(c)) res += c;
    }
    return res;
}

function render() {
    if (pwdParameters() === null) infoElt.textContent = "You must at least select one option";
    passwordElt.value = pwdGen();
    lengthElt.setAttribute("max", pwdParameters()[2]);
    maxLengthElt.innerHTML = "&nbsp;" + pwdParameters()[2];
    passwordLengthElt.innerHTML = "Password length: " + lengthElt.value;
}

window.onload = render();

lengthElt.addEventListener("click", render);

for (let i = 0; i < checkboxElts.length; i++) {
    checkboxElts[i].addEventListener("click", render);
}