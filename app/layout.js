'use client'

import { usePathname } from 'next/navigation'
import StyledComponentsRegistry from '@/lib/registry'
import { StylesProvider } from '@/styles/globals'
import { CartProvider } from '@/hooks/useCart'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styled from 'styled-components'

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <StylesProvider>
            <CartProvider>
              <PageContainer>
                {!isHomePage && <Header />}
                <MainContent>{children}</MainContent>
                {!isHomePage && <Footer />}
              </PageContainer>
            </CartProvider>
          </StylesProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

