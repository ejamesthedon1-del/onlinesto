'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { useFeaturedProducts } from '@/hooks/useProducts'

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
`

const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.xl};
`

const MenuTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['5xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: left;
  align-self: center;
  line-height: 0.9;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
  }
`

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${props => `calc(${props.theme.spacing.lg} / 2)`};
  align-items: flex-start;
`

const MenuItem = styled.li`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-align: left;
`

const MenuLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.normal} ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
    transition: width ${props => props.theme.transitions.normal} ease;
  }

  &:hover::after {
    width: 100%;
  }
`

const SocialIcons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  justify-content: flex-start;
  margin-top: ${props => props.theme.spacing.lg};
`

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  opacity: 0.5;
  transition: opacity ${props => props.theme.transitions.fast} ease;
  
  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: ${props => props.theme.colors.textSecondary};
  }
`

const FooterText = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
`

const SliderContainer = styled.div`
  display: none;
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.xl};
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const SliderTrack = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  width: max-content;
`

const Slide = styled.div`
  flex: 0 0 calc(100vw - ${props => props.theme.spacing.xl * 2});
  scroll-snap-align: start;
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  background-color: ${props => props.theme.colors.surface};
`

const SlideImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const SlideContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${props => props.theme.spacing.md};
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: ${props => props.theme.colors.background};
`

const SlideTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.xs};
`

const SlidePrice = styled.div`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`

const DateTimeStamp = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  letter-spacing: 0.05em;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`

const DateTimeText = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  justify-content: center;
  align-items: center;
`

const Counter = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
`

export default function HomePage() {
  const { products: featuredProducts, loading } = useFeaturedProducts()
  const [dateTime, setDateTime] = useState({ date: '', time: '', counter: 0 })

  useEffect(() => {
    const startTime = Date.now()
    
    const updateDateTime = () => {
      const now = new Date()
      const elapsed = Math.floor((Date.now() - startTime) / 1000) // seconds since page load
      
      const dateOptions = { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric'
      }
      
      const timeOptions = {
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
      
      setDateTime({
        date: now.toLocaleDateString('en-US', dateOptions),
        time: now.toLocaleTimeString('en-US', timeOptions),
        counter: elapsed
      })
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  return (
    <HomeContainer>
      <MenuContainer>
        {!loading && featuredProducts.length > 0 && (
          <SliderContainer>
            <SliderWrapper>
              <SliderTrack>
                {featuredProducts.map((product) => (
                  <Slide key={product.id}>
                    <Link href={`/shop/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                      <SlideImage>
                        <Image
                          src={product.images[0] || '/images/products/placeholder.jpg'}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="100vw"
                        />
                      </SlideImage>
                    </Link>
                  </Slide>
                ))}
              </SliderTrack>
            </SliderWrapper>
          </SliderContainer>
        )}
        <MenuTitle>
          SINNERS<br />TESTIMONY<sub style={{ fontSize: '0.4em', verticalAlign: 'sub' }}>®</sub>
        </MenuTitle>
        {dateTime.date && (
          <DateTimeStamp>
            <DateTimeText>
              <span>{dateTime.date}</span>
              <span>{dateTime.time}</span>
            </DateTimeText>
          </DateTimeStamp>
        )}
        <MenuList>
          <MenuItem>
            <MenuLink href="/shop">Shop</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/faq">FAQ</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/track-order">Track my order</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/waitlist">Join the waitlist</MenuLink>
          </MenuItem>
        </MenuList>
        <SocialIcons>
          <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </SocialIcon>
          <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </SocialIcon>
          <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </SocialIcon>
        </SocialIcons>
      </MenuContainer>
      <FooterText>© Sinners Testimony 2026</FooterText>
    </HomeContainer>
  )
}
