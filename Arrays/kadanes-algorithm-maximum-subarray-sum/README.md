# Kadane's Algorithm — Maximum Subarray Sum

**Source**: `https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/`

## Problem
Given an integer array, find the contiguous subarray with the maximum possible sum and return that sum.

- Input: An array of integers (may contain negatives and positives).
- Output: A single integer — the maximum subarray sum.

## Examples
Input:
```
-2 1 -3 4 -1 2 1 -5 4
```
Output:
```
6
```
Explanation:
- The subarray [4, -1, 2, 1] has the maximum sum = 6.

Input:
```
5 4 -1 7 8
```
Output:
```
23
```
Explanation:
- The entire array forms the maximum sum subarray: 5 + 4 + (-1) + 7 + 8 = 23.

## Solution
- Scan the array once, keeping a running sum of the current subarray.
- If the running sum ever becomes negative, drop it (reset to 0) since a negative prefix can’t improve future sums.
- Track the best (maximum) sum seen at each step as the answer.
- This also works for all-negative inputs because the best sum is recorded before resets.
- Complexity: Time: O(n), Space: O(1).

## Dry run
- Example (matching the code): [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  - Start: sum = 0, maxi = -∞
  - x = -2: sum = -2, maxi = max(-∞, -2) = -2 → sum < 0 so sum = 0
  - x = 1: sum = 1, maxi = max(-2, 1) = 1
  - x = -3: sum = -2, maxi = 1 → sum < 0 so sum = 0
  - x = 4: sum = 4, maxi = max(1, 4) = 4
  - x = -1: sum = 3, maxi = max(4, 3) = 4
  - x = 2: sum = 5, maxi = max(4, 5) = 5
  - x = 1: sum = 6, maxi = max(5, 6) = 6
  - x = -5: sum = 1, maxi = 6
  - x = 4: sum = 5, maxi = 6
  - Answer: 6

## Pseudocode
```
sum = 0
maxi = -infinity
for each x in nums:
  sum = sum + x
  if sum > maxi: maxi = sum
  if sum < 0: sum = 0
return maxi
```
Explanation:
- Drop negative prefixes (reset sum) and keep the best running sum as the answer.

## Code
See `solution/code.js`.


