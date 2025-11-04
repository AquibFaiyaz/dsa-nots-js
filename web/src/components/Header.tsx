import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import ThemeToggle from './ThemeToggle'
import { useSearch } from '../hooks/useSearch'
import { useProblems } from '../hooks/useProblems'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import SearchSuggestions from './SearchSuggestions'

export default function Header() {
  const { query, setQuery } = useSearch()
  const { problems } = useProblems()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || !problems) return []
    return problems
      .filter((p) => (`${p.title} ${p.category}`).toLowerCase().includes(q))
      .slice(0, 8)
  }, [query, problems])
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: 'saturate(180%) blur(8px)',
        bgcolor: 'rgba(15,23,42,0.85)', // dark translucent
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        zIndex: (t) => t.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ gap: 2, px: 2 }}>
        {/* Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mr: 1 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#22d3ee 0%, #34d399 100%)',
              boxShadow: '0 0 0 2px rgba(255,255,255,0.08) inset',
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>DSA Notes</Typography>
        </Box>

        {/* Search (placeholder) */}
        <Box sx={{ flexGrow: 1, maxWidth: 720, position: 'relative' }}>
          <SearchBar
            value={query}
            onChange={(v) => { setQuery(v); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onClear={() => { setQuery(''); setOpen(false) }}
          />
          <SearchSuggestions
            open={open}
            items={matches}
            onSelect={(p) => { navigate(`/problem/${p.id}`); setOpen(false) }}
          />
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          <IconButton size="small" color="inherit" href="#" aria-label="GitHub" sx={{ color: 'rgba(226,232,240,0.9)' }}>
            <GitHubIcon />
          </IconButton>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  )
}


