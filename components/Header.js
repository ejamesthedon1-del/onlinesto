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
  justify-content: center;
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast} ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`

const CartBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.full};
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
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
          <CartLink href="/cart" aria-label="Shopping cart">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            {itemCount > 0 && <CartBadge>{itemCount}</CartBadge>}
          </CartLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  )
}

