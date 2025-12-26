'use client'

import { useState, useEffect } from 'react'
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
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

const Logo = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-family: ${props => props.currentFont || props.theme.typography.fontFamily.sans};
  transition: font-family 200ms ease-in-out;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;

  .desktop-logo {
    display: inline;
  }
  
  .mobile-logo {
    display: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    order: 2;
    white-space: normal;
    line-height: 0.9;
    text-align: center;
    
    .desktop-logo {
      display: none;
    }
    
    .mobile-logo {
      display: inline;
    }
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: ${props => props.theme.spacing.md};
    order: 1;
  }
`

const RightNav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  margin-left: auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: ${props => props.theme.spacing.md};
    margin-left: auto;
    order: 3;
  }
`

const NavLink = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast} ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`

const ShopButton = styled.button`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color ${props => props.theme.transitions.fast} ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`

const Submenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  min-width: 120px;
  padding: ${props => props.theme.spacing.sm};
  z-index: 1000;
  padding-top: ${props => props.theme.spacing.xs};
`

const SubmenuLink = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  transition: color ${props => props.theme.transitions.fast} ease;
  line-height: 1.2;
  white-space: nowrap;

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

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  z-index: 1001;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    
    &.mobile-menu {
      display: none;
    }
  }
`

const HamburgerLine = styled.span`
  width: 24px;
  height: 2px;
  background-color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.fast} ease;
  transform-origin: center;

  ${props => props.isOpen && `
    &:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  `}
`

const MobileMenu = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.background};
    padding: ${props => props.theme.spacing.lg};
    box-shadow: ${props => props.theme.shadows.lg};
    z-index: 1000;
  }
`

const MobileNavLink = styled(Link)`
  display: block;
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  padding: ${props => props.theme.spacing.md} 0;
  transition: color ${props => props.theme.transitions.fast} ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`

// Array of fonts to cycle through for logo animation
const FONT_ARRAY = [
  'Impact',
  'Arial Black',
  'Bebas Neue',
  'Oswald',
  'Anton',
  'Bangers',
  'Black Ops One',
  'Creepster',
  'Russo One',
  'Orbitron',
  'Rajdhani',
  'Righteous',
  'Fredoka One',
  'Lilita One',
  'Passion One',
  'Staatliches',
  'Changa One',
  'Comfortaa',
  'Josefin Sans',
  'Montserrat',
  'Raleway',
  'Roboto',
  'Open Sans',
  'Lato',
  'Poppins',
  'Ubuntu',
  'Playfair Display',
  'Merriweather',
  'Lora',
  'Crimson Text',
  'Libre Baskerville',
  'PT Serif',
  'Source Serif Pro',
  'Arvo',
  'Roboto Slab',
  'Oxygen',
  'Quicksand',
  'Nunito',
  'Work Sans',
  'Inter',
  'DM Sans',
  'Space Grotesk',
  'Syne',
  'Archivo',
  'Manrope',
  'Georgia',
  'Courier New',
  'Verdana',
  'Times New Roman',
  'Trebuchet MS',
  'Satoshi'
]

export default function Header() {
  const { itemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false)
  const [currentFontIndex, setCurrentFontIndex] = useState(0)

  // Font animation effect - continuous loop
  useEffect(() => {
    const fontInterval = setInterval(() => {
      setCurrentFontIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        if (nextIndex >= FONT_ARRAY.length) {
          return 0
        }
        return nextIndex
      })
    }, 300) // 300ms per font

    return () => clearInterval(fontInterval)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const openShopMenu = () => {
    setIsShopMenuOpen(true)
  }

  const closeShopMenu = () => {
    setIsShopMenuOpen(false)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Nav>
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={openShopMenu}
            onMouseLeave={closeShopMenu}
          >
            <ShopButton onClick={openShopMenu}>
              Shop
            </ShopButton>
            <Submenu isOpen={isShopMenuOpen}>
              <SubmenuLink href="/shop" onClick={closeShopMenu}>All Products</SubmenuLink>
              <SubmenuLink href="/shop?category=Tops" onClick={closeShopMenu}>Tops</SubmenuLink>
              <SubmenuLink href="/shop?category=Bottoms" onClick={closeShopMenu}>Bottoms</SubmenuLink>
              <SubmenuLink href="/shop?category=Outerwear" onClick={closeShopMenu}>Outerwear</SubmenuLink>
            </Submenu>
          </div>
          <HamburgerButton onClick={toggleMenu} aria-label="Toggle menu">
            <HamburgerLine isOpen={isMenuOpen} />
            <HamburgerLine isOpen={isMenuOpen} />
            <HamburgerLine isOpen={isMenuOpen} />
          </HamburgerButton>
        </Nav>
        <Logo href="/" currentFont={FONT_ARRAY[currentFontIndex]}>
          <span className="desktop-logo">SINNERS TESTIMONY<sub style={{ fontSize: '0.4em', verticalAlign: 'sub' }}>®</sub></span>
          <span className="mobile-logo">SINNERS<br />TESTIMONY<sub style={{ fontSize: '0.4em', verticalAlign: 'sub' }}>®</sub></span>
        </Logo>
        <RightNav>
          <HamburgerButton onClick={toggleMenu} aria-label="Toggle menu" className="mobile-menu">
            <HamburgerLine isOpen={isMenuOpen} />
            <HamburgerLine isOpen={isMenuOpen} />
            <HamburgerLine isOpen={isMenuOpen} />
          </HamburgerButton>
          <CartLink href="/cart" aria-label="Shopping cart">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            {itemCount > 0 && <CartBadge>{itemCount}</CartBadge>}
          </CartLink>
        </RightNav>
        <MobileMenu isOpen={isMenuOpen}>
          <MobileNavLink href="/shop" onClick={closeMenu}>Shop</MobileNavLink>
        </MobileMenu>
      </HeaderContent>
    </HeaderContainer>
  )
}

