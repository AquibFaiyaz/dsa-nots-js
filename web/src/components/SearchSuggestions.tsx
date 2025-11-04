import { Paper, List, ListItemButton, ListItemText } from '@mui/material'
import type { Problem } from '../hooks/useProblems'

type Props = {
  open: boolean
  items: Problem[]
  onSelect: (problem: Problem) => void
}

export default function SearchSuggestions({ open, items, onSelect }: Props) {
  if (!open || items.length === 0) return null
  return (
    <Paper elevation={6} sx={{ position: 'absolute', left: 0, right: 0, mt: 1, borderRadius: 2, overflow: 'hidden', zIndex: 1300 }}>
      <List dense>
        {items.map((p) => (
          <ListItemButton key={p.id} onMouseDown={(e) => e.preventDefault()} onClick={() => onSelect(p)}>
            <ListItemText primary={p.title} secondary={p.category} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}


