'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { useProduct } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import ImageGallery from '@/components/ImageGallery'
import PriceDisplay from '@/components/PriceDisplay'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Link from 'next/link'

const PageContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
`

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: 1080px 1fr;
    justify-content: center;
  }
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`

const ProductCategory = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const ProductName = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin: 0;
`

const ProductDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.base};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  color: ${props => props.theme.colors.textSecondary};
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
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

const NotFoundState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['3xl']};
`

const SizeSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.xs};
`

const SizeLabel = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
`

const SizeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`

const SizeButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  border: 1px solid ${props => props.available ? props.theme.colors.border : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.selected 
    ? props.theme.colors.text 
    : props.available 
      ? props.theme.colors.background 
      : props.theme.colors.surface};
  color: ${props => props.selected 
    ? props.theme.colors.background 
    : props.available 
      ? props.theme.colors.text 
      : props.theme.colors.textSecondary};
  cursor: ${props => props.available ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.available ? 1 : 0.5};
  transition: all ${props => props.theme.transitions.fast} ease;
  font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:hover {
    ${props => props.available && `
      border-color: ${props.theme.colors.text};
      background-color: ${props.selected ? props.theme.colors.text : props.theme.colors.surface};
    `}
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`

export default function ProductDetailPage({ params }) {
  const { product, loading, error } = useProduct(params.id)
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!product) return
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size')
      return
    }

    addToCart(product, {
      size: selectedSize || null,
      color: selectedColor || null,
      quantity,
    })
    
    alert('Added to cart!')
  }

  if (loading) {
    return (
      <PageContainer>
        <LoadingState>Loading product...</LoadingState>
      </PageContainer>
    )
  }

  if (error || !product) {
    return (
      <PageContainer>
        <NotFoundState>
          <h2>Product not found</h2>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </NotFoundState>
      </PageContainer>
    )
  }

  // Standard sizes to display
  const standardSizes = ['Small', 'Medium', 'Large', '2X']
  
  const sizeOptions = product.sizes?.map(size => ({ value: size, label: size })) || []
  const colorOptions = product.colors?.map(color => ({ value: color, label: color })) || []
  const quantityOptions = Array.from({ length: Math.min(product.stock, 10) }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }))
  
  const isSizeAvailable = (size) => {
    return product.sizes && product.sizes.includes(size)
  }

  return (
    <PageContainer>
      <ProductContainer>
        <ImageGallery images={product.images} />
        <ProductInfo>
          <ProductCategory>{product.category}</ProductCategory>
          <ProductName>{product.name}</ProductName>
          <PriceDisplay price={product.price} size="large" />
          <SizeSelector>
            <SizeLabel>Size</SizeLabel>
            <SizeGrid>
              {standardSizes.map((size) => {
                const available = isSizeAvailable(size)
                const isSelected = selectedSize === size
                return (
                  <SizeButton
                    key={size}
                    available={available}
                    selected={isSelected}
                    onClick={() => available && setSelectedSize(size)}
                    disabled={!available}
                    type="button"
                  >
                    {size}
                  </SizeButton>
                )
              })}
            </SizeGrid>
          </SizeSelector>
          <ProductDescription>{product.description}</ProductDescription>
          
          <ProductDetails>
            {product.colors && product.colors.length > 0 && (
              <DetailRow>
                <Select
                  label="Color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  options={colorOptions}
                  placeholder="Select a color"
                />
              </DetailRow>
            )}
            
            <DetailRow>
              <Select
                label="Quantity"
                value={quantity.toString()}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                options={quantityOptions}
              />
            </DetailRow>
          </ProductDetails>

          <ActionsContainer>
            <Button size="large" fullWidth onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Link href="/shop">
              <Button variant="outline" fullWidth>
                Continue Shopping
              </Button>
            </Link>
          </ActionsContainer>
        </ProductInfo>
      </ProductContainer>
    </PageContainer>
  )
}

