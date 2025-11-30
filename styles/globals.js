'use client'

import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyles } from './GlobalStyles'

export function StylesProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

