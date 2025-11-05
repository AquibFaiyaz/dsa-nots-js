import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopyToClipboard(options?: { timeoutMs?: number }) {
  const timeoutMs = options?.timeoutMs ?? 2000
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => () => clearTimer(), [])

  const copy = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      clearTimer()
      timerRef.current = window.setTimeout(() => setCopied(false), timeoutMs)
      return true
    } catch {
      return false
    }
  }, [timeoutMs])

  return { copied, copy }
}


