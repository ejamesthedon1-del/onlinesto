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
  background-color: transparent;
  transition: opacity ${props => props.theme.transitions.fast} ease;

  &:hover {
    opacity: 0.8;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* Square aspect ratio */
  overflow: hidden;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};

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
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  padding-top: ${props => props.theme.spacing.xs};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
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

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-weight: ${props => props.theme.typography.fontWeight.normal};
    font-size: ${props => props.theme.typography.fontSize.base};
  }
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

  // Get the first image, or use placeholder if no images exist
  const hasImages = product.images && Array.isArray(product.images) && product.images.length > 0 && product.images[0]
  const imageSrc = hasImages ? product.images[0] : '/images/products/placeholder.jpg'

  return (
    <CardContainer href={`/shop/${product.id}`}>
      <ImageContainer>
        <ImageWrapper>
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </ImageWrapper>
      </ImageContainer>
      <Content>
        <ProductName>{product.name}</ProductName>
        <PriceContainer>
          <PriceDisplay price={product.price} />
        </PriceContainer>
      </Content>
    </CardContainer>
  )
}

