/**
 * Sort an array containing only 0s, 1s, and 2s using Dutch National Flag.
 * The function mutates the input array in-place and returns it.
 *
 * @param {number[]} arr
 * @returns {number[]}
 */
function solve(arr) {
  if (!Array.isArray(arr)) throw new TypeError('solve expects an array of numbers');

  let low = 0;                 // Pointer for the next position of 0
  let mid = 0;                 // Current element pointer
  let high = arr.length - 1;   // Pointer for the next position of 2

  // Loop until mid crosses high
  while (mid <= high) {
    if (arr[mid] === 0) {
      // If current element is 0, swap it with the element at 'low'
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      // If current element is 1, just move mid forward
      mid++;
    } else {
      // If current element is 2, swap it with the element at 'high'
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }

  return arr;
}

module.exports = solve;

// To run locally from this folder:
// node -e "const solve=require('./solution/code');console.log(solve([0,2,1,2,0,1]).join(' '));"


