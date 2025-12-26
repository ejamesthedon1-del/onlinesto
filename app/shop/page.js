'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import ProductGrid from '@/components/ProductGrid'
import Select from '@/components/Select'

const PageContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
`

const ShopLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.md};
  }
`

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`

const SortContainer = styled.div`
  min-width: 200px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`

const LoadingState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['3xl']};
  color: ${props => props.theme.colors.textSecondary};
`

const ErrorState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['3xl']};
  color: ${props => props.theme.colors.error};
`

const categories = [
  { value: '', label: 'Shop all' },
  { value: 'Tops', label: 'Tops' },
  { value: 'Bottoms', label: 'Bottoms' },
  { value: 'Outerwear', label: 'Outerwear' },
]

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
]

export default function ShopPage() {
  const { products, loading, error } = useProducts()
  const { addToCart } = useCart()
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')

  const handleQuickAdd = (product) => {
    addToCart(product, { quantity: 1 })
  }

  // Filter and sort products
  const filteredProducts = products
    .filter(product => !categoryFilter || product.category === categoryFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        default:
          return 0
      }
    })

  return (
    <PageContainer>
      <ShopLayout>
        <MainContent>

          {loading && <LoadingState>Loading products...</LoadingState>}
          {error && <ErrorState>Error loading products: {error}</ErrorState>}
          {!loading && !error && (
            <ProductGrid 
              products={filteredProducts} 
              onQuickAdd={handleQuickAdd}
              emptyMessage="No products found matching your criteria."
            />
          )}
        </MainContent>
      </ShopLayout>
    </PageContainer>
  )
}
