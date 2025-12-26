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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;700&family=Anton&family=Bangers&family=Black+Ops+One&family=Creepster&family=Russo+One&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Righteous&family=Fredoka+One&family=Lilita+One&family=Passion+One&family=Staatliches&family=Changa+One&family=Comfortaa:wght@300;400;700&family=Josefin+Sans:wght@100;300;400;600;700&family=Montserrat:wght@100;300;400;600;700;900&family=Raleway:wght@100;300;400;600;700;900&family=Roboto:wght@100;300;400;500;700;900&family=Open+Sans:wght@300;400;600;700;800&family=Lato:wght@100;300;400;700;900&family=Poppins:wght@100;300;400;600;700;900&family=Ubuntu:wght@300;400;500;700&family=Playfair+Display:wght@400;700;900&family=Merriweather:wght@300;400;700;900&family=Lora:wght@400;700&family=Crimson+Text:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=PT+Serif:wght@400;700&family=Source+Serif+Pro:wght@400;600;700&family=Arvo:wght@400;700&family=Roboto+Slab:wght@100;300;400;700&family=Oxygen:wght@300;400;700&family=Quicksand:wght@300;400;500;600;700&family=Nunito:wght@200;300;400;600;700;800;900&family=Work+Sans:wght@100;300;400;500;600;700;800;900&family=Inter:wght@100;300;400;500;600;700;800;900&family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;600;700;800&family=Archivo:wght@100;300;400;500;600;700&family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <StylesProvider>
            <CartProvider>
              <PageContainer>
                <Header />
                <MainContent>{children}</MainContent>
                <Footer />
              </PageContainer>
            </CartProvider>
          </StylesProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

