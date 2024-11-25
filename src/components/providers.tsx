'use client'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider, useTheme } from 'next-themes'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ThemeProvider
        enableSystem
        attribute='class'
        defaultTheme='dark'
        disableTransitionOnChange
      >
        {children}
        <ToasterProvider />
      </ThemeProvider>
  )
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      closeButton
      position='top-center'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}
