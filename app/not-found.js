'use client'

import styled from 'styled-components'
import Link from 'next/link'
import Button from '@/components/Button'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
`

const NotFoundTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['5xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
`

const NotFoundMessage = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
`

export default function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundMessage>Page not found</NotFoundMessage>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </NotFoundContainer>
  )
}

