import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import PriceDisplay from './PriceDisplay'
import Button from './Button'

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: transform ${props => props.theme.transitions.normal} ease,
              box-shadow ${props => props.theme.transitions.normal} ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* Square aspect ratio */
  background-color: ${props => props.theme.colors.surface};
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 130%; /* Taller aspect ratio on mobile */
  }
`

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  flex: 1;
`

const ProductName = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin: 0;
  color: ${props => props.theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ProductCategory = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const PriceContainer = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};
`

const QuickAddButton = styled(Button)`
  display: none;
`

export default function ProductCard({ product, onQuickAdd }) {
  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onQuickAdd) {
      onQuickAdd(product)
    }
  }

  return (
    <CardContainer href={`/shop/${product.id}`}>
      <ImageContainer>
        <ImageWrapper>
          <Image
            src={product.images[0] || '/images/products/placeholder.jpg'}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </ImageWrapper>
      </ImageContainer>
      <Content>
        <PriceContainer>
          <PriceDisplay price={product.price} />
        </PriceContainer>
      </Content>
    </CardContainer>
  )
}

