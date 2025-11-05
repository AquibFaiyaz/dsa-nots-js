import { Box, Paper, Typography, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useProblems } from '../hooks/useProblems'

export default function Home() {
  const navigate = useNavigate()
  const { problems } = useProblems()

  // Build simple category counts for a quick overview
  const categoryToCount = new Map<string, number>()
  if (problems) {
    for (const p of problems) {
      categoryToCount.set(p.category, (categoryToCount.get(p.category) || 0) + 1)
    }
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Welcome to DSA Notes</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Browse curated DSA problems with concise explanations, pseudocode, and runnable JS solutions.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
        {[...categoryToCount.entries()].map(([cat, count]) => (
          <Paper key={cat} variant="outlined" sx={{ p: 2, minWidth: 240 }}>
            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>{cat}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{count} problems</Typography>
            <Button sx={{ mt: 1 }} size="small" onClick={() => navigate(`/`) }>
              View in sidebar
            </Button>
          </Paper>
        ))}
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Get started</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>• Use the left navigation to pick a category and a problem.</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>• Use the header search to quickly jump to any problem.</Typography>
        <Typography variant="body2">• Toggle dark/light mode from the header.</Typography>
      </Paper>
    </Box>
  )
}


