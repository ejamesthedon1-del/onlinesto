import { useState, useEffect } from 'react'
import { fetchProducts, fetchProductById, fetchProductsByCategory, fetchFeaturedProducts, searchProducts } from '@/lib/products'

/**
 * Hook for fetching all products with loading and error states
 * @returns {Object} { products, loading, error, refetch }
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { products, loading, error, refetch: fetchData }
}

/**
 * Hook for fetching a single product by ID
 * @param {string} id - Product ID
 * @returns {Object} { product, loading, error, refetch }
 */
export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    if (!id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await fetchProductById(id)
      setProduct(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch product')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return { product, loading, error, refetch: fetchData }
}

/**
 * Hook for fetching products by category
 * @param {string} category - Product category
 * @returns {Object} { products, loading, error, refetch }
 */
export function useProductsByCategory(category) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    if (!category) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await fetchProductsByCategory(category)
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [category])

  return { products, loading, error, refetch: fetchData }
}

/**
 * Hook for fetching featured products
 * @returns {Object} { products, loading, error, refetch }
 */
export function useFeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchFeaturedProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch featured products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { products, loading, error, refetch: fetchData }
}

/**
 * Hook for searching products
 * @param {string} query - Search query
 * @returns {Object} { products, loading, error, refetch }
 */
export function useProductSearch(query) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    if (!query || query.trim() === '') {
      setProducts([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await searchProducts(query)
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Failed to search products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData()
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [query])

  return { products, loading, error, refetch: fetchData }
}

