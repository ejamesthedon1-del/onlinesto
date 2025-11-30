// Product fetching abstraction
// Currently returns mock data, ready for API integration

import { products, getProductById, getProductsByCategory, getFeaturedProducts } from '@/data/products'

/**
 * Fetch all products
 * In production, this would make an API call
 * @returns {Promise<Array>} Array of products
 */
export async function fetchProducts() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // In production, replace with:
  // const response = await fetch('/api/products')
  // return await response.json()
  
  return products
}

/**
 * Fetch a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object|null>} Product object or null if not found
 */
export async function fetchProductById(id) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // In production, replace with:
  // const response = await fetch(`/api/products/${id}`)
  // return await response.json()
  
  return getProductById(id) || null
}

/**
 * Fetch products by category
 * @param {string} category - Product category
 * @returns {Promise<Array>} Array of products in category
 */
export async function fetchProductsByCategory(category) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // In production, replace with:
  // const response = await fetch(`/api/products?category=${category}`)
  // return await response.json()
  
  return getProductsByCategory(category)
}

/**
 * Fetch featured products
 * @returns {Promise<Array>} Array of featured products
 */
export async function fetchFeaturedProducts() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // In production, replace with:
  // const response = await fetch('/api/products?featured=true')
  // return await response.json()
  
  return getFeaturedProducts()
}

/**
 * Search products by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching products
 */
export async function searchProducts(query) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150))
  
  if (!query || query.trim() === '') return []
  
  const lowerQuery = query.toLowerCase()
  
  // In production, replace with:
  // const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
  // return await response.json()
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  )
}

