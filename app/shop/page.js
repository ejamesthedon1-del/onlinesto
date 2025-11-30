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
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding-top: 0;
  }
`

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const SortWrapper = styled.div`
  width: 100%;
  max-width: 200px;
`

const SidebarTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const CategoryButton = styled.button`
  text-align: left;
  padding: ${props => props.theme.spacing.xs} 0;
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.active 
    ? props.theme.typography.fontWeight.semibold 
    : props.theme.typography.fontWeight.normal};
  color: ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.textSecondary};
  background: none;
  border: none;
  cursor: pointer;
  transition: color ${props => props.theme.transitions.fast} ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  ${props => props.active && `
    &::before {
      content: '';
      position: absolute;
      left: -${props.theme.spacing.md};
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 100%;
      background-color: ${props.theme.colors.primary};
    }
  `}
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
        <Sidebar>
          <SidebarSection>
            <CategoryList>
              {categories.map((category) => (
                <CategoryButton
                  key={category.value}
                  active={categoryFilter === category.value}
                  onClick={() => setCategoryFilter(category.value)}
                >
                  {category.label}
                </CategoryButton>
              ))}
            </CategoryList>
          </SidebarSection>
          <SidebarSection>
            <SidebarTitle>Sort By</SidebarTitle>
            <SortWrapper>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={sortOptions}
              />
            </SortWrapper>
          </SidebarSection>
        </Sidebar>

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
