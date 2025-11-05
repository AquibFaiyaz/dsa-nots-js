import React, { useMemo } from 'react'
import { Box, Divider, Paper, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export type Section = { title: string; body: string }

export function slugifyTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 80)
}

export function splitSections(markdown: string): Section[] {
  const lines = markdown.split(/\r?\n/)
  const sections: Section[] = []
  let current: Section | null = null

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)$/)
    if (h2) {
      if (current) sections.push(current)
      current = { title: h2[1].trim(), body: '' }
    } else if (current) {
      current.body += (current.body ? '\n' : '') + line
    }
  }
  if (current) sections.push(current)
  return sections
}

export default function MarkdownSections({ markdown }: { markdown: string }) {
  const sections = useMemo(() =>
    splitSections(markdown).filter((s) => s.title.trim().toLowerCase() !== 'code')
  , [markdown])

  const boxBg = '#0F172A'
  const text = '#E2E8F0'
  const border = '1px solid rgba(255,255,255,0.06)'
  const inlineCodeBg = 'rgba(255,255,255,0.08)'
  const codeBg = '#0B1220'

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {sections.map((s, idx) => (
        <Paper
          key={idx}
          variant="outlined"
          id={`sec-${slugifyTitle(s.title)}`}
          sx={{ p: 3, bgcolor: boxBg, color: text, border, borderRadius: 2, scrollMarginTop: 80 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{s.title}</Typography>
          <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.08)' }} />
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h3: ({ children }) => (
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
                  {children}
                </Typography>
              ),
              h4: ({ children }) => (
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1.5, mb: 0.75 }}>
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <Typography variant="body1" sx={{ my: 1.2, lineHeight: 1.8 }}>{children}</Typography>
              ),
              ul: (props) => (
                <Box component="ul" sx={{ pl: 3, my: 1.2, '& li': { mb: 0.5 } }} {...props} />
              ),
              ol: (props) => (
                <Box component="ol" sx={{ pl: 3, my: 1.2, '& li': { mb: 0.5 } }} {...props} />
              ),
              li: (props) => <li {...props} style={{ margin: '4px 0' }} />,
              code: ({ inline, children }) => (
                inline ? (
                  <code
                    style={{
                      background: inlineCodeBg,
                      padding: '2px 6px',
                      borderRadius: 6,
                      fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
                      fontSize: '0.85em',
                    }}
                  >
                    {children}
                  </code>
                ) : (
                  <pre
                    style={{
                      background: codeBg,
                      padding: 14,
                      borderRadius: 10,
                      overflow: 'auto',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <code>{children}</code>
                  </pre>
                )
              ),
              a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
              table: (props) => (
                <table
                  {...props}
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    display: 'block',
                  }}
                />
              ),
              thead: (props) => <thead {...props} style={{ background: 'rgba(255,255,255,0.04)' }} />,
              th: (props) => (
                <th
                  {...props}
                  style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.12)', padding: '10px 12px' }}
                />
              ),
              td: (props) => (
                <td
                  {...props}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '10px 12px' }}
                />
              ),
            }}
          >
            {s.body}
          </ReactMarkdown>
        </Paper>
      ))}
    </Box>
  )
}


