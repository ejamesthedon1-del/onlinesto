import styled from 'styled-components'
import { formatPrice } from '@/lib/pricing'

const PriceContainer = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  font-size: ${props => {
    if (props.size === 'small') return props.theme.typography.fontSize.sm
    if (props.size === 'large') return props.theme.typography.fontSize['2xl']
    return props.theme.typography.fontSize.lg
  }};
`

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.base};
  margin-right: ${props => props.theme.spacing.xs};
`

export default function PriceDisplay({ price, originalPrice, size = 'medium' }) {
  const formattedPrice = formatPrice(price)
  const formattedOriginalPrice = originalPrice ? formatPrice(originalPrice) : null

  return (
    <PriceContainer size={size}>
      {originalPrice && originalPrice > price && (
        <OriginalPrice>{formattedOriginalPrice}</OriginalPrice>
      )}
      {formattedPrice}
    </PriceContainer>
  )
}

