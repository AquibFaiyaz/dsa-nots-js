/**
 * Longest Consecutive Sequence using a hash set (O(n) time).
 * Idea:
 * - Insert all numbers into a Set for O(1) lookups.
 * - A number starts a sequence only if (num - 1) is NOT in the set.
 * - From each start, walk forward (num + 1, num + 2, ...) counting length.
 * - Track the maximum length seen.
 *
 * @param {number[]} nums - Array of integers (duplicates allowed)
 * @returns {number} - Length of the longest consecutive streak
 */
function solve(nums) {
  if (!Array.isArray(nums)) {
    throw new TypeError("solve expects an array of numbers");
  }
  // unique values for O(1) membership checks
  const values = new Set(nums);
  let maxLength = 0;

  for (const num of values) {
    // only start counting when num has no predecessor
    if (!values.has(num - 1)) {
      let currentLength = 1;
      // extend the streak forward
      while (values.has(num + currentLength)) currentLength += 1;
      if (currentLength > maxLength) maxLength = currentLength;
    }
  }

  return maxLength;
}

module.exports = solve;

// To run locally from this folder:
// node -e "const solve=require('./solution/code');console.log(solve([100,4,200,1,3,2]));"


