import { Box, ListItemButton, ListItemText, Paper, Typography } from '@mui/material'
import Scrollspy from 'react-scrollspy'

export type TocItem = { id: string; title: string }

export default function SectionNav({ items }: { items: TocItem[] }) {
  return (
    <Box sx={{ position: 'sticky', top: (theme) => theme.spacing(10), minWidth: 220,
      '& .is-active .MuiListItemButton-root': { bgcolor: 'action.selected', borderLeft: '3px solid', borderColor: 'primary.main' }
    }}>
      <Paper variant="outlined" sx={{ p: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, opacity: 0.85 }}>On this page</Typography>
        <Scrollspy items={items.map(i => i.id)} currentClassName="is-active" componentTag="div" offset={-100}>
          {items.map((it) => (
            <Box key={it.id} className="toc-item" sx={{ mb: 0.5, borderRadius: 1 }}>
              <ListItemButton component="a" href={`#${it.id}`} className="MuiListItemButton-root">
                <ListItemText primary={it.title} primaryTypographyProps={{ fontSize: 13 }} />
              </ListItemButton>
            </Box>
          ))}
        </Scrollspy>
      </Paper>
    </Box>
  )
}


