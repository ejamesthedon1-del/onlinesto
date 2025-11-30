'use client'

import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing['2xl']} 0 ${props => props.theme.spacing.xl};
  margin-top: auto;
`

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const SectionTitle = styled.button`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin: 0;
  color: ${props => props.theme.colors.text};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  transition: color ${props => props.theme.transitions.fast} ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  overflow: hidden;
  transition: max-height ${props => props.theme.transitions.normal} ease,
              opacity ${props => props.theme.transitions.normal} ease;
  max-height: ${props => props.isOpen ? '500px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
`

const ToggleIcon = styled.span`
  display: inline-block;
  transition: transform ${props => props.theme.transitions.fast} ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  font-size: ${props => props.theme.typography.fontSize.sm};
`

const FooterLink = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast} ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const Copyright = styled.div`
  text-align: center;
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    shop: false,
    customerService: false,
    about: false,
  })

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <SectionTitle onClick={() => toggleSection('shop')}>
              Shop
              <ToggleIcon isOpen={openSections.shop}>▼</ToggleIcon>
            </SectionTitle>
            <SectionContent isOpen={openSections.shop}>
              <FooterLink href="/shop">All Products</FooterLink>
              <FooterLink href="/shop?category=Tops">Tops</FooterLink>
              <FooterLink href="/shop?category=Bottoms">Bottoms</FooterLink>
              <FooterLink href="/shop?category=Outerwear">Outerwear</FooterLink>
            </SectionContent>
          </FooterSection>
          <FooterSection>
            <SectionTitle onClick={() => toggleSection('customerService')}>
              Customer Service
              <ToggleIcon isOpen={openSections.customerService}>▼</ToggleIcon>
            </SectionTitle>
            <SectionContent isOpen={openSections.customerService}>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/shipping">Shipping Info</FooterLink>
              <FooterLink href="/returns">Returns</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </SectionContent>
          </FooterSection>
          <FooterSection>
            <SectionTitle onClick={() => toggleSection('about')}>
              About
              <ToggleIcon isOpen={openSections.about}>▼</ToggleIcon>
            </SectionTitle>
            <SectionContent isOpen={openSections.about}>
              <FooterLink href="/about">Our Story</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/press">Press</FooterLink>
            </SectionContent>
          </FooterSection>
        </FooterGrid>
        <Copyright>
          © {new Date().getFullYear()} Store. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  )
}

