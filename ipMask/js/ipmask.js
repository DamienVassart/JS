var choiceElts = document.getElementsByName("choice");
var input = document.getElementById("input");
var result = document.getElementById("result");

result.style.visibility = "hidden";

// Checks if the IP field is not empty and if the typed IP is valid

function ipError() {
	error.innerHTML = "";
	var ipElt = document.getElementById("ip");
	var regexIp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
	if(!regexIp.test(ipElt.value)) {
		var ipError = document.createElement("p");
		ipError.textContent = "This field must be filled with a valid IP address";
		error.appendChild(ipError);
	} 
}

// Creates input fields when an option is selected

function newInputField(id, size, placeholder) {
	var fieldElt = document.createElement("input");
	fieldElt.type = "text";
	fieldElt.setAttribute("size", size);
	fieldElt.id = id;
	fieldElt.setAttribute("placeholder", placeholder);
	fieldElt.setAttribute("required", "true");
	fieldElt.style.marginRight = "10px";
	return fieldElt;
}


// Turns IP into a binary array

function tabFromIp(ip) {
	var t1 = Array.from(Number((ip.split('.')[0])).toString(2));
	while(t1.length < 8) {
		t1.unshift("0");
	}
	var t2 = Array.from(Number((ip.split('.')[1])).toString(2));
	while(t2.length < 8) {
		t2.unshift("0");
	}
	var t3 = Array.from(Number((ip.split('.')[2])).toString(2));
	while(t3.length < 8) {
		t3.unshift("0");
	}
	var t4 = Array.from(Number((ip.split('.')[3])).toString(2));
	while(t4.length < 8) {
		t4.unshift("0");
	}
	var tabIp = t1.concat(t2, t3, t4);
	for(let i = 0; i < tabIp.length; i++) {
		tabIp[i] = Number(tabIp[i]);
	}
	return tabIp;
}

// Separates a 32 bits array into 4 arrays of 8 bits

function sliceTab(tab) {
	var t4 = tab.slice(24, 32);
	var t3 = tab.slice(16, 24);
	var t2 = tab.slice(8, 16);
	var t1 = tab.slice(0, 8);
	return parseInt(t1.join(''), 2) + "." + parseInt(t2.join(''), 2) + "." + parseInt(t3.join(''), 2) + "." + parseInt(t4.join(''), 2);	
}

// Turns bitmask value into a binary array

function tabFromMask(bitmask) {
	var tabMask = [];
	while(tabMask.length < bitmask) {
		tabMask.push(1);
	}
	while(tabMask.length < 32) {
		tabMask.push(0);
	}
	return tabMask;
}

// Returns the subnet mask from the bitmask value

function splitMask(bitmask) {
	var tabMask = tabFromMask(bitmask);
	return sliceTab(tabMask);
}

// Return the wildcard mask from the bitmask value

function wildcard(bitmask) {
	var tabMask = tabFromMask(bitmask)
	for(let i = 0; i < tabMask.length; i++) {
		if(tabMask[i] === 0) {
			tabMask[i] = 1;
		} else if(tabMask[i] === 1) {
			tabMask[i] = 0;
		}
	}
	return sliceTab(tabMask);
}

// Returns the network address from the IP and bitmask value

function network(ip, bitmask) {
	var tabIp = tabFromIp(ip);
	if(bitmask === 32) {
		return ip;
	} else if(bitmask === 31) {
		tabIp[tabIp.length - 1] = 0;
	} else {
		for(let i = Number(bitmask); i < tabIp.length; i++) {
			tabIp[i] = 0;
		}
		return sliceTab(tabIp);
	}
}

// Returns the address of the first host from the IP and bitmask value

function hostMin(ip, bitmask) {
	var tabIp = tabFromIp(ip);
	if(bitmask >= 31) {
		return undefined;
	} else {
		for(let i = Number(bitmask); i < tabIp.length; i++) {
			tabIp[i] = 0;
		}
		tabIp[tabIp.length - 1] = 1;
		return sliceTab(tabIp);
	}
}

// Returns the address of the last host from the IP and bitmask value

function hostMax(ip, bitmask) {
	var tabIp = tabFromIp(ip);
	if(bitmask >= 31) {
		return undefined;;
	} else {
		for(let i = Number(bitmask); i < tabIp.length; i++) {
			tabIp[i] = 1;
		}
		tabIp[tabIp.length - 1] = 0;
		return sliceTab(tabIp);
	}
}

// Returns the broadcast address from the IP and bitmask value

function broadcast(ip, bitmask) {
	var tabIp = tabFromIp(ip);
	if(bitmask === 32) {
		return ip;
	} else {
		for(let i = Number(bitmask); i < tabIp.length; i++) {
			tabIp[i] = 1;
		}
		return sliceTab(tabIp);
	}
}

// Returns the total number of hosts from the bitmask value

function hosts(bitmask) {
	var hosts = (2**(32 - bitmask)) - 2;
	if(hosts <=0) {
		return 0;
	}
	else if(hosts >= 2) {
		return hosts;
	}
}

// Returns a subnet mask value from a given number of hosts

function maskFromHosts(hosts) {
	var nbHosts = 0;
	var bitmask;
	for(bitmask = 32; bitmask >= 0; bitmask--) {
		nbHosts = (2 ** (32 - bitmask) - 2);
		if(nbHosts >= hosts) {
			break;
		} 
	}
	return bitmask;
}

for(let i = 0; i < choiceElts.length; i++) {

	choice.addEventListener("change", function(e) {
		
		switch(e.target.value) {
			
			case "1":

				result.style.visibility = "hidden";
				input.innerHTML = "";
				
				var ipRange = document.createElement("form");
				ipRange.id = "iprange";
				input.appendChild(ipRange);
				
				var ipElt = newInputField("ip", 32, "Type an IP address - ex: 192.168.0.1");
				ipRange.appendChild(ipElt);
				
				var maskElt = document.createElement("select");
				maskElt.id = "mask";
				maskElt.style.width = "200px";
				maskElt.setAttribute("required", "true");
				maskElt.style.marginRight = "10px";
				ipRange.appendChild(maskElt);
				
				var hintElt = document.createElement("option");
				hintElt.innerHTML = '<option value="">Select an IP Mask</option>';
				maskElt.appendChild(hintElt);
				
				for(let i = 32; i >= 0; i--) {
					var optionElt = document.createElement("option");
					optionElt.value = i;
					optionElt.textContent = splitMask(i) + " /" + i;
					mask.appendChild(optionElt);
				}
				
				var btnElt = document.createElement("input");
				btnElt.type = "submit";
				btnElt.value = "Calculate";
				ipRange.appendChild(btnElt);

				ipElt.addEventListener("blur", ipError);

				ipRange.addEventListener("submit", function(e) {
					e.preventDefault();

					result.style.visibility = "visible";

					var ip = ipElt.value;
					var mask = maskElt.value;

					if(ip == network(ip, mask) && ip == broadcast(ip, mask)) {
						document.getElementById("info").innerHTML = '<p>This is both a network and broadcast address</p>';
					}else if(ip == network(ip, mask)) {
						document.getElementById("info").innerHTML = '<p>This is a network address</p>';
					} else if(ip == broadcast(ip, mask)) {
						document.getElementById("info").innerHTML = '<p>This is a broadcast address</p>';
					} else {
						document.getElementById("info").innerHTML = "";
					}

					document.getElementById("address").value = ip;
					document.getElementById("bitmask").value = mask;
					document.getElementById("netmask").value = splitMask(mask);
					document.getElementById("wildcard").value = wildcard(mask);
					document.getElementById("network").value = network(ip, mask);
					document.getElementById("hostmin").value = hostMin(ip, mask);
					document.getElementById("hostmax").value = hostMax(ip, mask);
					document.getElementById("broadcast").value = broadcast(ip, mask);
					document.getElementById("hosts").value = hosts(mask);
				});

				break;
			
			case "2":

				result.style.visibility = "hidden";
				input.innerHTML = "";

				var subnet = document.createElement("form");
				subnet.id = "subnet";
				input.appendChild(subnet);

				var ipElt = newInputField("ip", 32, "Type an IP address - ex: 192.168.0.1");
				subnet.appendChild(ipElt);

				var hostsElt = newInputField("nbhosts", 32, "Type the desired number of hosts");
				subnet.appendChild(hostsElt);

				var btnElt = document.createElement("input");
				btnElt.type = "submit";
				btnElt.value = "Calculate";
				subnet.appendChild(btnElt);

				ipElt.addEventListener("blur", ipError);

				hostsElt.addEventListener("blur", function() {
					if(Number(hostsElt.value) < 2 || Number(hostsElt.value) > 4294967294) {
						var hostsError = document.createElement("p");
						hostsError.textContent = "This number of hosts is off boundaries";
						hostsError.style.fontWeight = "bold";
						error.appendChild(hostsError);
					}
				});

				subnet.addEventListener("submit", function(e) {
					e.preventDefault();

					result.style.visibility = "visible";

					var ip = ipElt.value;
					var nbHosts = hostsElt.value;
					var mask = maskFromHosts(hostsElt.value);
					
					document.getElementById("info").innerHTML = '<p>For '+ nbHosts + ' hosts, you have to set the mask value to ' + splitMask(mask) + ' (/' + mask + ')' + '.</p>';
					document.getElementById("address").value = ip;
					document.getElementById("bitmask").value = mask;
					document.getElementById("netmask").value = splitMask(mask);
					document.getElementById("wildcard").value = wildcard(mask);
					document.getElementById("network").value = network(ip, mask);
					document.getElementById("hostmin").value = hostMin(ip, mask);
					document.getElementById("hostmax").value = hostMax(ip, mask);
					document.getElementById("broadcast").value = broadcast(ip, mask);
					document.getElementById("hosts").value = hosts(mask);
				});

				break;
		}
	});
}
