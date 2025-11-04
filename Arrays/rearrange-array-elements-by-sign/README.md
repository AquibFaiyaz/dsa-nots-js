# Rearrange Array Elements by Sign

**Source**: `https://takeuforward.org/arrays/rearrange-array-elements-by-sign/`

## Problem
Given an integer array containing an equal number of positive and negative elements, rearrange it so that they appear alternately, starting with a positive at index 0 and a negative at index 1. Maintain the relative order among positives and among negatives as they appear in the input.

- Input: An array of integers with equal counts of positive (>0) and negative (<0) numbers; treat 0 as non-negative if present.
- Output: An array where indices 0, 2, 4, ... are positives and 1, 3, 5, ... are negatives.

## Examples
Input:
```
3 1 -2 -5 2 -4
```
Output:
```
3 -2 1 -5 2 -4
```
Explanation:
- Start with positives at even indices and negatives at odd indices: 3 (pos), -2 (neg), 1 (pos), -5 (neg), 2 (pos), -4 (neg). Relative order within positives [3,1,2] and negatives [-2,-5,-4] is preserved.

Input:
```
-1 2 -3 4 -5 6
```
Output:
```
2 -1 4 -3 6 -5
```
Explanation:
- Place positives at even indices and negatives at odd indices while keeping relative order: positives [2,4,6] occupy indices 0,2,4 and negatives [-1,-3,-5] occupy indices 1,3,5.

## Solution
- Allocate an output array of the same size.
- Use two pointers: `posIndex = 0` and `negIndex = 1`.
- Scan the input once: place positives at `posIndex` and increment by 2; place negatives at `negIndex` and increment by 2.
- This preserves the original order within positives and within negatives and ensures alternating signs.
- Complexity: Time: O(n), Space: O(n).

## Dry run
- Example: [3, 1, -2, -5, 2, -4]
  - Positives = [3, 1, 2], Negatives = [-2, -5, -4]
  - Build: 3, -2, 1, -5, 2, -4 → done
  - Output length = 6; relative orders within signs preserved.

## Pseudocode
```
res = new array of length n
pos = 0
neg = 1
for each x in nums:
  if x < 0:
    res[neg] = x; neg += 2
  else:
    res[pos] = x; pos += 2
return res
```
Explanation:
- Even indices take non-negatives, odd indices take negatives; order within each sign is preserved.

## Code
See `solution/code.js`.


