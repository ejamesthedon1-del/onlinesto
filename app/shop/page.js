'use client'

import { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
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

const CategoryIconMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md} 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: ${props => props.theme.spacing.lg};
  }
`

const CategoryIconButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  transition: opacity ${props => props.theme.transitions.fast} ease;
  opacity: ${props => props.active ? 1 : 0.5};

  &:hover {
    opacity: 1;
  }
`

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? props.theme.colors.text : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: border-color ${props => props.theme.transitions.fast} ease;

  ${CategoryIconButton}:hover & {
    border-color: ${props => props.theme.colors.text};
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const IconLabel = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.active ? props.theme.typography.fontWeight.medium : props.theme.typography.fontWeight.normal};
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
            <>
              <CategoryIconMenu>
                <CategoryIconButton 
                  onClick={() => setCategoryFilter('')}
                  active={categoryFilter === ''}
                  aria-label="Show all products"
                >
                  <IconWrapper active={categoryFilter === ''}>
                    <Image 
                      src="/images/icons/all.png" 
                      alt="All products"
                      width={24}
                      height={24}
                      onError={(e) => {
                        // Fallback to SVG if image doesn't exist
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'block'
                      }}
                    />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                    </svg>
                  </IconWrapper>
                  <IconLabel active={categoryFilter === ''}>All</IconLabel>
                </CategoryIconButton>
                <CategoryIconButton 
                  onClick={() => setCategoryFilter('Tops')}
                  active={categoryFilter === 'Tops'}
                  aria-label="Show tops"
                >
                  <IconWrapper active={categoryFilter === 'Tops'}>
                    <Image 
                      src="/images/icons/tops.png" 
                      alt="Tops"
                      width={24}
                      height={24}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'block'
                      }}
                    />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                      <path d="M6 3H18C19.1 3 20 3.9 20 5V7H4V5C4 3.9 4.9 3 6 3Z"/>
                      <path d="M4 7V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V7H4Z"/>
                      <path d="M8 7V3H16V7"/>
                      <path d="M8 11H16"/>
                    </svg>
                  </IconWrapper>
                  <IconLabel active={categoryFilter === 'Tops'}>Tops</IconLabel>
                </CategoryIconButton>
                <CategoryIconButton 
                  onClick={() => setCategoryFilter('Bottoms')}
                  active={categoryFilter === 'Bottoms'}
                  aria-label="Show bottoms"
                >
                  <IconWrapper active={categoryFilter === 'Bottoms'}>
                    <Image 
                      src="/images/icons/bottoms.png" 
                      alt="Bottoms"
                      width={24}
                      height={24}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'block'
                      }}
                    />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                      <path d="M7 4H17C18.1 4 19 4.9 19 6V9H5V6C5 4.9 5.9 4 7 4Z"/>
                      <path d="M5 9V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V9H5Z"/>
                      <path d="M9 9V12H15V9"/>
                      <path d="M9 18H15"/>
                    </svg>
                  </IconWrapper>
                  <IconLabel active={categoryFilter === 'Bottoms'}>Bottoms</IconLabel>
                </CategoryIconButton>
              </CategoryIconMenu>
              <ProductGrid 
                products={filteredProducts} 
                onQuickAdd={handleQuickAdd}
                emptyMessage="No products found matching your criteria."
              />
            </>
          )}
        </MainContent>
      </ShopLayout>
    </PageContainer>
  )
}
