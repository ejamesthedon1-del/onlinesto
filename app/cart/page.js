'use client'

import styled from 'styled-components'
import { useCart } from '@/hooks/useCart'
import { calculateTotal } from '@/lib/pricing'
import { formatPrice } from '@/lib/pricing'
import CartItem from '@/components/CartItem'
import Button from '@/components/Button'
import Link from 'next/link'

const PageContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
`

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.xl};
`

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
`

const OrderSummary = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  height: fit-content;
  position: sticky;
  top: 100px;
`

const SummaryTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.sm} 0;
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.text};
`

const SummaryRowTotal = styled(SummaryRow)`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  border-top: 2px solid ${props => props.theme.colors.border};
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.md};
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['3xl']};
  color: ${props => props.theme.colors.textSecondary};
`

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, isEmpty } = useCart()
  const totals = calculateTotal(items)

  if (isEmpty) {
    return (
      <PageContainer>
        <PageTitle>Shopping Cart</PageTitle>
        <EmptyState>
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart.</p>
          <Link href="/shop">
            <Button size="large" style={{ marginTop: '1rem' }}>
              Continue Shopping
            </Button>
          </Link>
        </EmptyState>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageTitle>Shopping Cart</PageTitle>
      <CartLayout>
        <CartItems>
          {items.map((item) => (
            <CartItem
              key={item.cartItemId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </CartItems>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <span>Subtotal</span>
            <span>{formatPrice(totals.subtotal)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Tax</span>
            <span>{formatPrice(totals.tax)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping</span>
            <span>
              {totals.shipping === 0 ? (
                <span style={{ color: 'green' }}>FREE</span>
              ) : (
                formatPrice(totals.shipping)
              )}
            </span>
          </SummaryRow>
          <SummaryRowTotal>
            <span>Total</span>
            <span>{formatPrice(totals.total)}</span>
          </SummaryRowTotal>

          <ActionsContainer>
            <Link href="/checkout">
              <Button size="large" fullWidth>
                Proceed to Checkout
              </Button>
            </Link>
            <Button variant="outline" fullWidth onClick={clearCart}>
              Clear Cart
            </Button>
            <Link href="/shop">
              <Button variant="outline" fullWidth>
                Continue Shopping
              </Button>
            </Link>
          </ActionsContainer>
        </OrderSummary>
      </CartLayout>
    </PageContainer>
  )
}

