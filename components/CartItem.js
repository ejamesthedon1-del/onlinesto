import styled from 'styled-components'
import Image from 'next/image'
import Button from './Button'
import PriceDisplay from './PriceDisplay'

const CartItemContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  background-color: ${props => props.theme.colors.surface};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    height: 200px;
  }
`

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`

const ItemName = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin: 0;
`

const ItemMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-top: auto;
`

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.lg};
  transition: all ${props => props.theme.transitions.fast} ease;

  &:hover {
    background-color: ${props => props.theme.colors.surface};
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const QuantityDisplay = styled.span`
  min-width: 40px;
  text-align: center;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${props => props.theme.spacing.sm};
  min-width: 120px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`

const RemoveButton = styled(Button)`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
`

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleQuantityChange = (delta) => {
    const newQuantity = item.quantity + delta
    if (newQuantity > 0) {
      onUpdateQuantity(item.cartItemId, newQuantity)
    }
  }

  return (
    <CartItemContainer>
      <ImageContainer>
        <Image
          src={item.image || '/images/products/placeholder.jpg'}
          alt={item.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </ImageContainer>
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemMeta>
          {item.size && <span>Size: {item.size}</span>}
          {item.color && <span>Color: {item.color}</span>}
        </ItemMeta>
        <QuantityControls>
          <QuantityButton
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </QuantityButton>
          <QuantityDisplay>{item.quantity}</QuantityDisplay>
          <QuantityButton
            onClick={() => handleQuantityChange(1)}
            disabled={item.quantity >= item.stock}
            aria-label="Increase quantity"
          >
            +
          </QuantityButton>
        </QuantityControls>
      </ItemDetails>
      <PriceContainer>
        <PriceDisplay price={item.price * item.quantity} />
        <RemoveButton
          variant="outline"
          size="small"
          onClick={() => onRemove(item.cartItemId)}
        >
          Remove
        </RemoveButton>
      </PriceContainer>
    </CartItemContainer>
  )
}

