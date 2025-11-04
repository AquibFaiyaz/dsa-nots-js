import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Paper, Link } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import CodeEditor from './CodeEditor'
import MarkdownSections from './MarkdownSections'
import { useProblems } from '../hooks/useProblems'

export default function ProblemDetail() {
  const { id } = useParams()
  const { problems } = useProblems()
  const problem = problems?.find((p) => p.id === id)
  const [readme, setReadme] = useState<string>('')
  const [code, setCode] = useState<string>('')

  useEffect(() => {
    if (!problem) return
    fetch(problem.assets.readmeUrl).then((r) => r.text()).then(setReadme)
    fetch(problem.assets.codeUrl).then((r) => r.text()).then(setCode)
  }, [problem])

  if (!problem) return <Typography sx={{ p: 3 }}>Loading…</Typography>

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>{problem.title}</Typography>
      <Typography sx={{ mb: 2 }}>
        <Link href={problem.source} target="_blank" rel="noreferrer">View Source</Link>
      </Typography>
      <Typography variant="h6" gutterBottom>README</Typography>
      <MarkdownSections markdown={readme} />
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Code Solution</Typography>
      <Paper variant="outlined" sx={{ p: 0, borderRadius: 1, overflow: 'hidden' }}>
        <CodeEditor language="javascript" code={code} />
      </Paper>
    </Box>
  )
}


