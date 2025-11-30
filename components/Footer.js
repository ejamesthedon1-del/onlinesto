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

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin: 0;
  color: ${props => props.theme.colors.text};
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
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <SectionTitle>Shop</SectionTitle>
            <FooterLink href="/shop">All Products</FooterLink>
            <FooterLink href="/shop?category=Tops">Tops</FooterLink>
            <FooterLink href="/shop?category=Bottoms">Bottoms</FooterLink>
            <FooterLink href="/shop?category=Outerwear">Outerwear</FooterLink>
          </FooterSection>
          <FooterSection>
            <SectionTitle>Customer Service</SectionTitle>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/shipping">Shipping Info</FooterLink>
            <FooterLink href="/returns">Returns</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </FooterSection>
          <FooterSection>
            <SectionTitle>About</SectionTitle>
            <FooterLink href="/about">Our Story</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/press">Press</FooterLink>
          </FooterSection>
        </FooterGrid>
        <Copyright>
          © {new Date().getFullYear()} Store. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  )
}

