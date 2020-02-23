/* This function will return an array which begins with startNum and ends with endNum */

function rangeOfNumbers(startNum, endNum) {
  if (startNum > endNum) {
    return [];
  } else {
    const nums = rangeOfNumbers(startNum, endNum - 1);
    nums.push(endNum);
    return nums;
  }
}