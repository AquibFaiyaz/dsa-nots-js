/**
 * Best Time to Buy and Sell Stock (single transaction).
 * Uses min-so-far and max profit tracking in one pass.
 *
 * @param {number[]} prices - Daily prices
 * @returns {number} - Maximum profit
 */
function solve(prices) {
  if (!Array.isArray(prices)) throw new TypeError('solve expects an array of numbers')
  if (prices.length === 0) return 0

  let maxProfit = 0            // best profit seen so far
  let minPrice = prices[0]     // lowest price to buy so far

  for (let i = 1; i < prices.length; i += 1) {
    // Profit if we sell today after buying at the lowest price so far
    const currentProfit = prices[i] - minPrice
    // Update the best (max) profit
    if (currentProfit > maxProfit) maxProfit = currentProfit
    // Update the lowest price for future days
    if (prices[i] < minPrice) minPrice = prices[i]
  }

  return maxProfit
}

module.exports = solve

// To run locally from this folder:
// node -e "const solve=require('./solution/code');console.log(solve([7,1,5,3,6,4]));"


