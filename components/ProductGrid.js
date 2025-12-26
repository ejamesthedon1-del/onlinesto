import styled from 'styled-components'
import ProductCard from './ProductCard'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.viewMode === 'single' 
    ? 'repeat(1, 1fr)' 
    : 'repeat(auto-fill, minmax(280px, 1fr))'};
  gap: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg} 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: ${props => props.viewMode === 'single' 
      ? 'repeat(1, 1fr)' 
      : 'repeat(auto-fill, minmax(180px, 1fr))'};
    gap: ${props => props.theme.spacing.xl};
    row-gap: ${props => props.theme.spacing['2xl']};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: ${props => props.viewMode === 'single' 
      ? 'repeat(1, 1fr)' 
      : 'repeat(auto-fill, minmax(160px, 1fr))'};
    gap: ${props => props.theme.spacing.xl};
    row-gap: ${props => props.theme.spacing['2xl']};
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: ${props => props.viewMode === 'single' 
      ? 'repeat(1, 1fr)' 
      : 'repeat(auto-fill, minmax(300px, 1fr))'};
  }
`

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${props => props.theme.spacing['3xl']};
  color: ${props => props.theme.colors.textSecondary};
`

export default function ProductGrid({ products = [], onQuickAdd, emptyMessage = 'No products found.', viewMode = 'grid' }) {
  if (products.length === 0) {
    return <EmptyState>{emptyMessage}</EmptyState>
  }

  return (
    <GridContainer viewMode={viewMode}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickAdd={onQuickAdd}
        />
      ))}
    </GridContainer>
  )
}

