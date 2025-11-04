import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import type { Language } from 'prism-react-renderer'

export default function CodeBlock({ code, language = 'javascript' as Language }: { code: string; language?: Language }) {
  return (
    <Highlight code={code} language={language} theme={themes.duotoneDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const background = (style as any)?.backgroundColor || '#1e1e1e'
        const fontFamily = 'SFMono-Regular, Consolas, Menlo, Monaco, Liberation Mono, monospace'
        return (
          <div style={{ background, borderRadius: 8, overflow: 'auto' }}>
            <div style={{ display: 'flex', minWidth: '100%' }}>
              <pre
                style={{
                  margin: 0,
                  padding: '16px 12px',
                  textAlign: 'right',
                  color: 'rgba(255,255,255,0.5)',
                  userSelect: 'none',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                  background: 'transparent',
                  lineHeight: 1.6,
                  fontFamily,
                }}
              >
                {tokens.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </pre>
              <pre
                className={className}
                style={{
                  ...style,
                  margin: 0,
                  padding: 16,
                  background: 'transparent',
                  lineHeight: 1.6,
                  fontFamily,
                }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        )
      }}
    </Highlight>
  )
}


