// Product fetching abstraction
// Currently returns mock data, ready for API integration

import { products, getProductById, getProductsByCategory, getFeaturedProducts } from '@/data/products'

/**
 * Fetch all products
 * Uses API if available, falls back to static data
 * @returns {Promise<Array>} Array of products
 */
export async function fetchProducts() {
  // Only use fetch in client-side context
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/products', { cache: 'no-store' })
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.warn('API not available, using static data:', error)
    }
  }
  
  // Fallback to static data
  return products
}

/**
 * Fetch a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object|null>} Product object or null if not found
 */
export async function fetchProductById(id) {
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch(`/api/products/${id}`, { cache: 'no-store' })
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.warn('API not available, using static data:', error)
    }
  }
  
  // Fallback to static data
  return getProductById(id) || null
}

/**
 * Fetch products by category
 * @param {string} category - Product category
 * @returns {Promise<Array>} Array of products in category
 */
export async function fetchProductsByCategory(category) {
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch(`/api/products?category=${category}`, { cache: 'no-store' })
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.warn('API not available, using static data:', error)
    }
  }
  
  // Fallback to static data
  return getProductsByCategory(category)
}

/**
 * Fetch featured products
 * @returns {Promise<Array>} Array of featured products
 */
export async function fetchFeaturedProducts() {
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/products?featured=true', { cache: 'no-store' })
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.warn('API not available, using static data:', error)
    }
  }
  
  // Fallback to static data
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

