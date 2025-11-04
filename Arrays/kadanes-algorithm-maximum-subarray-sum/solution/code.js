/**
 * Kadane's Algorithm (optimal): maximum subarray sum
 * Matches the standard implementation pattern: keep a running sum that
 * resets to 0 when it becomes negative, and track the maximum seen.
 *
 * @param {number[]} nums - Array of integers
 * @returns {number} - Maximum subarray sum
 */
function solve(nums) {
  if (!Array.isArray(nums)) throw new TypeError("solve expects an array of numbers");
  if (nums.length === 0) return 0;

  let sum = 0;                 // running sum of current subarray
  let maxi = -Infinity;        // best (maximum) sum seen so far

  for (const x of nums) {
    sum += x;                  // extend the current subarray with x
    if (sum > maxi) maxi = sum; // update best
    if (sum < 0) sum = 0;      // if negative, drop current subarray
  }

  return maxi;
}

module.exports = solve;

// To run locally from this folder:
// node -e "const solve=require('./solution/code');console.log(solve([-2,1,-3,4,-1,2,1,-5,4]));"


