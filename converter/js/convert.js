var decimal = document.getElementById("decimal");
var binaire = document.getElementById("binaire");
var hexa = document.getElementById("hexa");
var info = document.getElementById("info");

function letterToDigit(letter) {
	var converted = 0;
	for(let i = 0; i < letter.length; i++) {
		switch(letter[i]) {
			case "A":
				converted = 10;
				break;
			case "B":
				converted = 11;
				break;
			case "C":
				converted = 12;
				break;
			case "D":
				converted = 13;
				break;
			case "E":
				converted = 14;
				break;
			case "F":
				converted = 15;
				break;
		}
	}
	return converted;
}

function fromDecimal(number, base) {
	var result = [];
	while(number != 0) {
		var converted = number % base;
		switch (converted) {
			case 10:
				converted = "A";
				break;
			case 11:
				converted = "B";
				break;
			case 12:
				converted = "C";
				break;
			case 13:
				converted = "D";
				break;
			case 14:
				converted = "E";
				break;
			case 15:
				converted = "F";
				break;
		}
		result.push(converted);
		number = Math.floor(number / base);
	}
	result.reverse();
	return result.join('');
}

function toDecimal(number, base) {
	var converted = 0;
	for(let i = 0; i < number.length; i++) {
		converted += number[0] * (base**i);
	}
	return converted;
}

decimal.addEventListener("input", function() {
	var regexNumber = /\d/;
	if(decimal.value == 0) {
		binaire.value = 0;
		hexa.value = 0;
	} else if(regexNumber.test(decimal.value[decimal.value.length-1])) {
	 	info.innerHTML = "";
	 	binaire.value = "";	
		hexa.value = "";
		binaire.value += fromDecimal(decimal.value, 2);
		hexa.value += fromDecimal(decimal.value, 16);
	 } else {
		decimal.value = "";
		binaire.value = "NaN";
		hexa.value = "NaN";
		info.innerHTML = "<p>Veuillez saisir un entier décimal</p>";
		return;
	}
});

binaire.addEventListener("input", function() {
	var regexBinaire = /[0-1]/;
	if(regexBinaire.test(binaire.value[binaire.value.length-1])) {
		info.innerHTML ="";
		decimal.value = "";
		hexa.value = "";
		var input = '';
		input += binaire.value;
		var tab = Array.from(input);
		for(let i = 0; i < tab.length; i++) {
			tab[i] = Number(tab[i]);
		}
		tab.reverse();
		decimal.value += toDecimal(tab, 2);
		hexa.value += fromDecimal(decimal.value, 16);
	} else {
		binaire.value = "";
		decimal.value = "NaN";
		hexa.value = "NaN";
		info.innerHTML = "<p>Veuillez saisir un 0 ou un 1</p>";
		return;
	}
});

hexa.addEventListener("input", function() {
	var regexHexa = /[0-9a-fA-F]/;
	var regexLettre = /[a-fA-F]/;
	if(regexHexa.test(hexa.value[hexa.value.length-1])) {
		info.innerHTML = "";
		decimal.value = "";
		binaire.value ="";
		var input = '';
		input += hexa.value;
		var tab = Array.from(input);
		for(let i = 0; i < tab.length; i++) {
			if(regexLettre.test(tab[i])) {
				tab[i] = letterToDigit(tab[i].toUpperCase());
			}
			tab[i] = Number(tab[i]);
		}
		tab.reverse();
		hexa.value = hexa.value.toUpperCase();
		decimal.value += toDecimal(tab, 16);
		binaire.value += fromDecimal(decimal.value, 2);
	} else {
		hexa.value = "";
		decimal.value = "NaN";
		binaire.value = "NaN";
		info.innerHTML = "<p>Veuillez saisir un chiffre hexadécimal</p>";
		return;
	}
});
