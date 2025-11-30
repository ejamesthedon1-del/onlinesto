'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { useCart } from '@/hooks/useCart'
import { calculateTotal } from '@/lib/pricing'
import { formatPrice } from '@/lib/pricing'
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

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const FormSection = styled.section`
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
`

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`

const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
`

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-family: ${props => props.theme.typography.fontFamily.sans.join(', ')};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: border-color ${props => props.theme.transitions.fast} ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
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

const ItemList = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.xs} 0;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['3xl']};
  color: ${props => props.theme.colors.textSecondary};
`

const SuccessMessage = styled.div`
  background-color: ${props => props.theme.colors.success}20;
  color: ${props => props.theme.colors.success};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`

export default function CheckoutPage() {
  const { items, isEmpty, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const totals = calculateTotal(items)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setOrderPlaced(true)
    setIsSubmitting(false)
    clearCart()
  }

  if (isEmpty && !orderPlaced) {
    return (
      <PageContainer>
        <PageTitle>Checkout</PageTitle>
        <EmptyState>
          <h2>Your cart is empty</h2>
          <p>Add items to your cart before checkout.</p>
          <Link href="/shop">
            <Button size="large" style={{ marginTop: '1rem' }}>
              Continue Shopping
            </Button>
          </Link>
        </EmptyState>
      </PageContainer>
    )
  }

  if (orderPlaced) {
    return (
      <PageContainer>
        <SuccessMessage>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
        </SuccessMessage>
        <Link href="/shop">
          <Button size="large">Continue Shopping</Button>
        </Link>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageTitle>Checkout</PageTitle>
      <CheckoutLayout>
        <FormSection>
          <form onSubmit={handleSubmit}>
            <SectionTitle>Shipping Information</SectionTitle>
            <FormGroup>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="address">Address *</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label htmlFor="city">City *</Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="state">State *</Label>
                <Input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </div>

            <SectionTitle style={{ marginTop: '2rem' }}>Payment Information</SectionTitle>
            <FormGroup>
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </FormGroup>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label htmlFor="cardExpiry">Expiry Date *</Label>
                <Input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="cardCVC">CVC *</Label>
                <Input
                  type="text"
                  id="cardCVC"
                  name="cardCVC"
                  value={formData.cardCVC}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </FormGroup>
            </div>

            <Button
              type="submit"
              size="large"
              fullWidth
              disabled={isSubmitting}
              style={{ marginTop: '1.5rem' }}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </FormSection>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <ItemList>
            {items.map((item) => (
              <ItemRow key={item.cartItemId}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </ItemRow>
            ))}
          </ItemList>
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
        </OrderSummary>
      </CheckoutLayout>
    </PageContainer>
  )
}

