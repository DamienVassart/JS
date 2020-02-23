/* For every number from 2 to 100, this will display if this number is primary or not */

function isPrime(num) {
	var result = [];
	for (var i = 2; i < num; i++) {
		result.push(num % i);
	}
	return (result.find(elt => elt == 0) == 0 ? 'not a prime number' : 'a prime number');
}

for (var i = 2; i <= 100; i++) {
	console.log(i + ' is ' + isPrime(i));
} 