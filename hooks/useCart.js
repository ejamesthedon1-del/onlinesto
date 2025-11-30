'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { CART_STORAGE_KEY } from '@/lib/storage'
import {
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartItemQuantity as updateCartItemQuantityUtil,
  clearCart as clearCartUtil,
  getCartItemCount,
  isCartEmpty,
} from '@/lib/cart'

// Cart context
const CartContext = createContext()

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        items: addToCartUtil(state.items, action.payload.product, action.payload.options),
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: removeFromCartUtil(state.items, action.payload.cartItemId),
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: updateCartItemQuantityUtil(
          state.items,
          action.payload.cartItemId,
          action.payload.quantity
        ),
      }
    case 'CLEAR_CART':
      return {
        ...state,
        items: clearCartUtil(),
      }
    default:
      return state
  }
}

// Cart provider component
export function CartProvider({ children }) {
  const [storedCart, setStoredCart] = useLocalStorage(CART_STORAGE_KEY, [])
  
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isLoading: true,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    dispatch({ type: 'LOAD_CART', payload: storedCart || [] })
  }, []) // Only run on mount

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      setStoredCart(state.items)
    }
  }, [state.items, state.isLoading, setStoredCart])

  const addToCart = (product, options) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, options } })
  }

  const removeFromCart = (cartItemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { cartItemId } })
  }

  const updateQuantity = (cartItemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartItemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const value = {
    items: state.items,
    isLoading: state.isLoading,
    itemCount: getCartItemCount(state.items),
    isEmpty: isCartEmpty(state.items),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

