// Cart management functions

/**
 * Add item to cart
 * @param {Array} cartItems - Current cart items
 * @param {Object} product - Product to add
 * @param {Object} options - Options like size, color, quantity
 * @returns {Array} Updated cart items
 */
export function addToCart(cartItems, product, options = {}) {
  const {
    size = null,
    color = null,
    quantity = 1,
  } = options

  // Create unique cart item ID based on product ID, size, and color
  const cartItemId = `${product.id}-${size || 'default'}-${color || 'default'}`

  // Check if item already exists in cart
  const existingItemIndex = cartItems.findIndex(item => item.cartItemId === cartItemId)

  if (existingItemIndex >= 0) {
    // Update quantity of existing item
    const updatedItems = [...cartItems]
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      quantity: updatedItems[existingItemIndex].quantity + quantity,
    }
    return updatedItems
  }

  // Add new item to cart
  const newItem = {
    cartItemId,
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0] || '/images/products/placeholder.jpg',
    size,
    color,
    quantity,
    stock: product.stock,
  }

  return [...cartItems, newItem]
}

/**
 * Remove item from cart
 * @param {Array} cartItems - Current cart items
 * @param {string} cartItemId - Cart item ID to remove
 * @returns {Array} Updated cart items
 */
export function removeFromCart(cartItems, cartItemId) {
  return cartItems.filter(item => item.cartItemId !== cartItemId)
}

/**
 * Update item quantity in cart
 * @param {Array} cartItems - Current cart items
 * @param {string} cartItemId - Cart item ID to update
 * @param {number} quantity - New quantity (must be > 0)
 * @returns {Array} Updated cart items
 */
export function updateCartItemQuantity(cartItems, cartItemId, quantity) {
  if (quantity <= 0) {
    return removeFromCart(cartItems, cartItemId)
  }

  return cartItems.map(item => 
    item.cartItemId === cartItemId
      ? { ...item, quantity }
      : item
  )
}

/**
 * Clear all items from cart
 * @returns {Array} Empty cart array
 */
export function clearCart() {
  return []
}

/**
 * Get total number of items in cart
 * @param {Array} cartItems - Cart items
 * @returns {number} Total quantity
 */
export function getCartItemCount(cartItems) {
  if (!cartItems || cartItems.length === 0) return 0
  return cartItems.reduce((total, item) => total + item.quantity, 0)
}

/**
 * Check if cart is empty
 * @param {Array} cartItems - Cart items
 * @returns {boolean} True if cart is empty
 */
export function isCartEmpty(cartItems) {
  return !cartItems || cartItems.length === 0
}

