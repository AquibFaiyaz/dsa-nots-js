import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Drawer, List, ListItemButton, ListItemText, ListSubheader, Collapse, Divider } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useProblems, type Problem } from '../hooks/useProblems'
import { useTheme } from '@mui/material/styles'
import { useEffect } from 'react'

const drawerWidth = 288
const darkBg = 'rgba(15,23,42,0.85)'
const lightBg = 'rgba(255,255,255,0.7)'
const darkFg = '#E2E8F0'
const lightFg = '#0F172A'
const darkMuted = '#94A3B8'
const lightMuted = '#64748B'
const activeBg = 'rgba(255,255,255,0.08)'

export default function Sidebar() {
  const { problems, error } = useProblems()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const bg = isDark ? darkBg : lightBg
  const fg = isDark ? darkFg : lightFg
  const fgMuted = isDark ? darkMuted : lightMuted
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)'

  const grouped = useMemo(() => {
    const map = new Map<string, Problem[]>()
    if (problems) {
      for (const p of problems) {
        const arr = map.get(p.category) || []
        arr.push(p)
        map.set(p.category, arr)
      }
      for (const [, arr] of map) arr.sort((a, b) => a.title.localeCompare(b.title))
    }
    return map
  }, [problems])

  // Auto-expand the category of the current problem when route changes
  useEffect(() => {
    const m = location.pathname.match(/\/problem\/(.+)$/)
    if (!m || !problems) return
    const currentId = m[1]
    const current = problems.find((p) => p.id === currentId)
    if (!current) return
    setOpenCats((s) => (s[current.category] ? s : { ...s, [current.category]: true }))
  }, [location.pathname, problems])

  const [openCats, setOpenCats] = useState<Record<string, boolean>>({})
  const toggleCat = (name: string) => setOpenCats((s) => ({ ...s, [name]: !s[name] }))

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          // Match header look: translucent + blur, theme-aware
          bgcolor: bg,
          backdropFilter: 'saturate(180%) blur(8px)',
          color: fg,
          borderRight: `1px solid ${borderColor}`,
          position: 'fixed',
          top: (theme) => theme.spacing(8), // 64px default AppBar height
          height: 'calc(100% - 64px)'
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List subheader={<ListSubheader disableSticky sx={{ bgcolor: 'transparent', color: fgMuted, fontWeight: 600 }}>Categories</ListSubheader>}>
          {error && <ListSubheader sx={{ bgcolor: 'transparent', color: '#ef4444' }}>{error}</ListSubheader>}
          {!problems && <ListSubheader sx={{ bgcolor: 'transparent', color: fgMuted }}>Loading…</ListSubheader>}
          {problems && problems.length === 0 && (
            <ListSubheader sx={{ bgcolor: 'transparent', color: fgMuted }}>No problems found. Run generate:problems</ListSubheader>
          )}
          {[...grouped.keys()].map((cat) => (
            <Box key={cat}>
              <ListItemButton onClick={() => toggleCat(cat)} sx={{ py: 1.2 }}>
                <ListItemText primary={cat} primaryTypographyProps={{ fontWeight: 600 }} />
                {openCats[cat] ? <ExpandLess htmlColor={fgMuted} /> : <ExpandMore htmlColor={fgMuted} />}
              </ListItemButton>
              <Collapse in={openCats[cat]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {grouped.get(cat)?.map((p) => {
                    const selected = location.pathname === `/problem/${p.id}`
                    return (
                      <ListItemButton
                        key={p.id}
                        sx={{ pl: 3, my: 0.5, borderRadius: 1, bgcolor: selected ? activeBg : 'transparent' }}
                        selected={selected}
                        onClick={() => navigate(`/problem/${p.id}`)}
                      >
                        <ListItemText
                          primary={p.title}
                          primaryTypographyProps={{ color: selected ? fg : fgMuted, fontSize: 14 }}
                        />
                      </ListItemButton>
                    )
                  })}
                </List>
              </Collapse>
              <Divider sx={{ borderColor }} />
            </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}


