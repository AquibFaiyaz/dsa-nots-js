import Editor from '@monaco-editor/react'
import { useTheme } from '@mui/material/styles'

export default function CodeEditor({ code, language = 'javascript' as const, height = '60vh' }: { code: string; language?: 'javascript' | 'typescript' | 'json'; height?: string | number }) {
  const theme = useTheme()
  const monacoTheme = theme.palette.mode === 'dark' ? 'vs-dark' : 'light'
  return (
    <Editor
      value={code}
      language={language}
      theme={monacoTheme}
      height={height}
      options={{
        readOnly: true,
        minimap: { enabled: true },
        wordWrap: 'off',
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        folding: true,
        renderIndentGuides: true,
        guides: { indentation: true, highlightActiveIndentation: true },
        smoothScrolling: true,
        fontSize: 14,
        fontFamily: 'JetBrains Mono, SFMono-Regular, Consolas, Menlo, Monaco, Liberation Mono, monospace',
        fontLigatures: true,
        padding: { top: 8, bottom: 8 },
      }}
    />
  )
}


