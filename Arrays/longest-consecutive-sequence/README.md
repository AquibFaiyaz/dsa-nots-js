# Longest Consecutive Sequence

**Source**: `https://takeuforward.org/data-structure/longest-consecutive-sequence-in-an-array/`

## Problem
Given an array of integers, find the length of the longest sequence of consecutive integers that can be formed from the array elements (order in the array does not matter). Return the length.

- Input: An array of integers (may contain duplicates, positive/negative values).
- Output: A single integer — the maximum length of any consecutive sequence.

## Examples
Input:
```
100 4 200 1 3 2
```
Output:
```
4
```
Explanation:
- The longest consecutive run is 1, 2, 3, 4 of length 4.

Input:
```
0 3 7 2 5 8 4 6 0 1
```
Output:
```
9
```
Explanation:
- The values 0 through 8 are all present, forming a consecutive sequence of length 9.

## Solution
- Insert all numbers into a hash set to allow O(1) membership checks.
- For each number, start a sequence only if it has no predecessor in the set (x − 1 not present).
- If it is a start, extend forward (x + 1, x + 2, …) counting the streak length.
- Track the maximum streak over all starts.
- Duplicates do not affect correctness due to set usage.
- Handles negatives and unsorted arrays naturally.
- Complexity: Time: O(n), Space: O(n).

## Dry run
- Example: [100, 4, 200, 1, 3, 2]
  - Set = {100, 4, 200, 1, 3, 2}
  - 100 has no predecessor (99 not in set) → streak = 1
  - 4 has predecessor (3) → skip
  - 200 has no predecessor (199 not in set) → streak = 1
  - 1 has no predecessor (0 not in set) → extend: 1→2→3→4 → streak = 4, max = 4

## Pseudocode
```
S = set(nums)
maxLen = 0
for n in S:
  if (n - 1) not in S:           # start of a sequence
    len = 1
    while (n + len) in S:
      len += 1
    maxLen = max(maxLen, len)
return maxLen
```
Explanation:
- Only start counting at sequence beginnings to keep total work O(n).

## Code
See `solution/code.js`.


