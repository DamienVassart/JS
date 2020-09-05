/*
Returns an array with the n first digits of the Fibonacci suite. 
Default start value is 0, but it can be optionally set to 1 in the arguments.
*/

function fibonacci(n, firstNum = 0) {
  if ([...arguments].every(e => typeof e == 'number')) {
    if (firstNum < 0 || firstNum > 1) return 'the sequence must start with 0 or 1';

    var fibonacci = [...Array(firstNum == 0 ? n : n + 1)].reduce((res, val, i) => res.concat(i > 1 ? res[i - 1] + res[i - 2] : i), []);
    return firstNum == 0 ? fibonacci : fibonacci.splice(1);
  }
  return 'please provide only numbers as arguments';
}