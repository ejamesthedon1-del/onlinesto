'use client'

import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing['2xl']} 0 ${props => props.theme.spacing.xl};
  margin-top: auto;
`

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`

const FooterGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xs};
  flex-wrap: wrap;
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  align-items: center;
`

const SectionTitle = styled.button`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  margin: 0;
  color: ${props => props.theme.colors.text};
  background: none;
  border: none;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color ${props => props.theme.transitions.fast} ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  overflow: hidden;
  transition: max-height ${props => props.theme.transitions.normal} ease,
              opacity ${props => props.theme.transitions.normal} ease;
  max-height: ${props => props.isOpen ? '500px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  align-items: center;
`

const ToggleIcon = styled.span`
  display: inline-block;
  transition: transform ${props => props.theme.transitions.fast} ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  font-size: ${props => props.theme.typography.fontSize.sm};
`

const FooterLink = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast} ease;
  text-align: center;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const Copyright = styled.div`
  text-align: center;
  padding-top: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    contact: false,
    info: false,
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
            <SectionTitle onClick={() => toggleSection('contact')}>
              Contact
            </SectionTitle>
            <SectionContent isOpen={openSections.contact}>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </SectionContent>
          </FooterSection>
          <FooterSection>
            <SectionTitle onClick={() => toggleSection('info')}>
              Info
            </SectionTitle>
            <SectionContent isOpen={openSections.info}>
              <FooterLink href="/about">About</FooterLink>
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

