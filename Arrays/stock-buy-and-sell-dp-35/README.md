# Best Time to Buy and Sell Stock (Single Transaction)

**Source**: `https://takeuforward.org/data-structure/stock-buy-and-sell-dp-35/`

## Problem
Given an array `prices[i]` representing the stock price on day `i`, find the maximum profit achievable from a single buy followed by a single sell. If no profit is possible, return 0.

- Input: An array of non-negative integers (prices by day).
- Output: A single integer — the maximum profit.

## Examples
Input:
```
7 1 5 3 6 4
```
Output:
```
5
```
Explanation:
- Buy at price 1 (day 2), sell at price 6 (day 5): profit = 5.

Input:
```
7 6 4 3 1
```
Output:
```
0
```
Explanation:
- Prices only decline; no profitable transaction, so profit is 0.

## Solution
- Track the minimum price seen so far while scanning left-to-right.
- At each day, compute potential profit = current price − min price so far; update the maximum profit.
- Never sell before buying, ensured by maintaining the min-so-far as you move forward.
- Complexity: Time: O(n), Space: O(1).

## Dry run
- Example: [7, 1, 5, 3, 6, 4]
  - min=7, maxP=0
  - price=1 → min=1, maxP=0
  - price=5 → profit=4, maxP=4
  - price=3 → profit=2, maxP=4
  - price=6 → profit=5, maxP=5
  - price=4 → profit=3, maxP=5 → answer=5

## Pseudocode
```
minPrice = prices[0]
maxProfit = 0
for i from 1 to n-1:
  profit = prices[i] - minPrice
  maxProfit = max(maxProfit, profit)
  minPrice = min(minPrice, prices[i])
return maxProfit
```
Explanation:
- Keep best buy cost so far and update best sell profit on the fly.

## Code
See `solution/code.js`.


