/**
 * Rearrange array elements by sign using even/odd index placement.
 * Assumption: array contains equal counts of non-negative and negative numbers.
 * - Non-negative values (including 0) go to even indices: 0, 2, 4, ...
 * - Negative values go to odd indices: 1, 3, 5, ...
 * This preserves the relative order within each sign due to single left-to-right pass.
 *
 * @param {number[]} nums - Input array (equal positives and negatives)
 * @returns {number[]} - New array with alternating signs starting with non-negative
 */
function solve(nums) {
  if (!Array.isArray(nums)) {
    throw new TypeError("solve expects an array of numbers");
  }
  const n = nums.length;
  if (n === 0) return [];

  // Validate the assumption: equal counts of non-negative and negative numbers
  let posCount = 0;
  for (const v of nums) if (v >= 0) posCount += 1;
  const negCount = n - posCount;
  if (posCount !== negCount) {
    throw new Error("Input must contain equal numbers of positive and negative elements.");
  }

  // Prepare result array and two write pointers
  const result = new Array(n);
  let posIndex = 0; // next even index for non-negative value
  let negIndex = 1; // next odd index for negative value

  for (const value of nums) {
    if (value < 0) {
      // place negative at next odd index
      result[negIndex] = value;
      negIndex += 2;
    } else {
      // place non-negative at next even index
      result[posIndex] = value; // 0 is treated as non-negative
      posIndex += 2;
    }
  }

  return result;
}

module.exports = solve;

// To run locally from this folder:
// node -e "const solve=require('./solution/code');console.log(solve([3,1,-2,-5,2,-4]).join(' '));"


