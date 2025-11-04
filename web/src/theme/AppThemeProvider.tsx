import React, { createContext, useEffect, useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

export type ColorMode = 'light' | 'dark'

export const ColorModeContext = createContext<{ mode: ColorMode; toggleColorMode: () => void }>({
  mode: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
})

function getInitialMode(): ColorMode {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem('color-mode') : null
  if (stored === 'light' || stored === 'dark') return stored
  // Default to dark when no preference is stored
  return 'dark'
}

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ColorMode>(getInitialMode)

  useEffect(() => {
    try {
      window.localStorage.setItem('color-mode', mode)
    } catch {}
  }, [mode])

  const theme = useMemo(() =>
    createTheme({
      palette: { mode },
      typography: {
        // Modern dev feel: IBM Plex Sans for UI, IBM Plex Mono accents
        fontFamily: '"IBM Plex Sans", Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 800, letterSpacing: '-0.02em' },
        h3: { fontWeight: 700, letterSpacing: '-0.01em' },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' },
        h6: { fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' },
        subtitle1: { fontWeight: 600 },
        body1: { lineHeight: 1.75 },
        body2: { lineHeight: 1.75 },
        button: { textTransform: 'none', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' },
      },
    }),
  [mode])

  const value = useMemo(() => ({ mode, toggleColorMode: () => setMode((m) => (m === 'light' ? 'dark' : 'light')) }), [mode])

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}


