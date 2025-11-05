# Sort an Array of 0s, 1s and 2s

**Source**: `https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/`

## Problem
Given an array containing only 0s, 1s, and 2s, sort the array in non-decreasing order in-place.

- Input: An array of integers where each element is 0, 1, or 2.
- Output: The array sorted as all 0s first, then 1s, then 2s.

## Examples
Input:
```
0 2 1 2 0 1
```
Output:
```
0 0 1 1 2 2
```
Explanation:
- Dutch National Flag: move 0s to the front (low), 2s to the back (high), leave 1s in the middle.

Input:
```
2 0 1
```
Output:
```
0 1 2
```
Explanation:
- Swap 2 with last, then place 0 at front; 1 remains in the middle.

## Solution
- Maintain three regions using pointers: `[0..low-1]=0`, `[low..mid-1]=1`, `[high+1..n-1]=2`.
- Scan with `mid`:
  - If `arr[mid] == 0`, swap with `low` and increment both.
  - If `arr[mid] == 1`, just increment `mid`.
  - If `arr[mid] == 2`, swap with `high` and decrement `high`.
- One pass, constant extra space.
- Complexity: Time: O(n), Space: O(1).

## Dry run
- Example: [2, 0, 1, 2, 1, 0]
  - Start: low=0, mid=0, high=5, arr=[2,0,1,2,1,0]
  - arr[mid]=2 → swap(mid,high): arr=[0,0,1,2,1,2], high=4
  - arr[mid]=0 → swap(low,mid): arr=[0,0,1,2,1,2], low=1, mid=1
  - arr[mid]=0 → swap(low,mid): arr=[0,0,1,2,1,2], low=2, mid=2
  - arr[mid]=1 → mid=3
  - arr[mid]=2 → swap(mid,high): arr=[0,0,1,1,2,2], high=3
  - arr[mid]=1 → mid=4 > high → stop; sorted.

## Pseudocode
```
low = 0; mid = 0; high = n-1
while mid <= high:
  if a[mid] == 0:
    swap(a[low], a[mid]); low += 1; mid += 1
  else if a[mid] == 1:
    mid += 1
  else:
    swap(a[mid], a[high]); high -= 1
```
Explanation:
- 0s bubble to the front, 2s to the back; 1s settle in the middle automatically.

## Code
See `solution/code.js`.


