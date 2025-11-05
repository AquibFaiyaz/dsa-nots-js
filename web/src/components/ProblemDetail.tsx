import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Paper, Link, IconButton, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import MarkdownSections from './MarkdownSections'
import { splitSections, slugifyTitle } from './MarkdownSections'
import { useProblems } from '../hooks/useProblems'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import SectionNav from './SectionNav'

export default function ProblemDetail() {
  const { id } = useParams()
  const { problems } = useProblems()
  const problem = problems?.find((p) => p.id === id)
  const [readme, setReadme] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const { copied, copy } = useCopyToClipboard({ timeoutMs: 2000 })

  useEffect(() => {
    if (!problem) return
    fetch(problem.assets.readmeUrl).then((r) => r.text()).then(setReadme)
    fetch(problem.assets.codeUrl).then((r) => r.text()).then(setCode)
  }, [problem])

  const sections = useMemo(() => {
    const list = splitSections(readme).filter((s) => s.title.trim().toLowerCase() !== 'code')
    return list.map((s) => ({ id: `sec-${slugifyTitle(s.title)}`, title: s.title }))
  }, [readme])
  const tocItems = useMemo(() => [...sections, { id: 'sec-code-solution', title: 'Code Solution' }], [sections])
  // Smooth scroll for anchor navigation
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => { document.documentElement.style.scrollBehavior = '' }
  }, [])

  if (!problem) return <Typography sx={{ p: 3 }}>Loading…</Typography>


  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 3 }}>
      <Box>
        <SectionNav items={tocItems} />
      </Box>
      <Box>
        <Typography variant="h4" gutterBottom>{problem.title}</Typography>
        <Typography sx={{ mb: 2 }}>
          <Link href={problem.source} target="_blank" rel="noreferrer">View Source</Link>
        </Typography>
        <Typography variant="h6" gutterBottom>Problem Overview</Typography>
        <MarkdownSections markdown={readme} />
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Code Solution</Typography>
        <Paper id="sec-code-solution" variant="outlined" sx={{ p: 0, borderRadius: 1, overflow: 'hidden', position: 'relative', scrollMarginTop: 80 }}>
          <Box sx={{ p: 0 }}>
            <CodeBlock language="javascript" code={code} />
          </Box>
          <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
            <IconButton
              size="small"
              onClick={() => copy(code)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: (theme) => theme.zIndex.modal + 1,
                bgcolor: 'rgba(0,0,0,0.45)',
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
              }}
            >
              {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Paper>
      </Box>
    </Box>
  )
}


