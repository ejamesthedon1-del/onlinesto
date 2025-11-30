'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background-color: ${props => props.theme.colors.background}dd;
`

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

const Logo = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: ${props => props.theme.spacing.md};
  }
`

const NavLink = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast} ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`

const CartLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: background-color ${props => props.theme.transitions.fast} ease;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.full};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`

export default function Header() {
  const { itemCount } = useCart()

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo href="/">STORE</Logo>
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/shop">Shop</NavLink>
          <CartLink href="/cart">
            Cart
            {itemCount > 0 && <CartBadge>{itemCount}</CartBadge>}
          </CartLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  )
}

