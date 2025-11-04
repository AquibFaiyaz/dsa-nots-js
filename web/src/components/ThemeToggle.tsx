import { IconButton, Tooltip } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useContext } from 'react'
import { ColorModeContext } from '../theme/AppThemeProvider'
import { useTheme } from '@mui/material/styles'

export default function ThemeToggle() {
  const { toggleColorMode } = useContext(ColorModeContext)
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        size="small"
        color="inherit"
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        sx={{ color: 'rgba(226,232,240,0.9)' }}
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  )
}


