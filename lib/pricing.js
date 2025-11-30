// Price calculation utilities

/**
 * Format a price value as currency
 * @param {number} price - The price value
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted price string
 */
export function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price)
}

/**
 * Calculate subtotal from cart items
 * @param {Array} items - Array of cart items with price and quantity
 * @returns {number} Subtotal amount
 */
export function calculateSubtotal(items) {
  if (!items || items.length === 0) return 0
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
}

/**
 * Calculate tax amount
 * @param {number} subtotal - Subtotal amount
 * @param {number} taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns {number} Tax amount
 */
export function calculateTax(subtotal, taxRate = 0.08) {
  return subtotal * taxRate
}

/**
 * Calculate shipping cost
 * @param {number} subtotal - Subtotal amount
 * @param {number} freeShippingThreshold - Threshold for free shipping (default: 100)
 * @param {number} shippingCost - Standard shipping cost (default: 10)
 * @returns {number} Shipping cost
 */
export function calculateShipping(subtotal, freeShippingThreshold = 100, shippingCost = 10) {
  if (subtotal >= freeShippingThreshold) return 0
  return shippingCost
}

/**
 * Calculate total amount including tax and shipping
 * @param {Array} items - Array of cart items
 * @param {Object} options - Calculation options
 * @returns {Object} Object with subtotal, tax, shipping, and total
 */
export function calculateTotal(items, options = {}) {
  const {
    taxRate = 0.08,
    freeShippingThreshold = 100,
    shippingCost = 10,
  } = options

  const subtotal = calculateSubtotal(items)
  const tax = calculateTax(subtotal, taxRate)
  const shipping = calculateShipping(subtotal, freeShippingThreshold, shippingCost)
  const total = subtotal + tax + shipping

  return {
    subtotal,
    tax,
    shipping,
    total,
  }
}

/**
 * Apply discount percentage
 * @param {number} price - Original price
 * @param {number} discountPercent - Discount percentage (e.g., 20 for 20%)
 * @returns {number} Discounted price
 */
export function applyDiscount(price, discountPercent) {
  return price * (1 - discountPercent / 100)
}

