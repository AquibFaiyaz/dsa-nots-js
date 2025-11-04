import { useEffect, useState } from 'react'

export type Problem = {
  id: string
  category: string
  title: string
  source: string
  assets: { readmeUrl: string; codeUrl: string }
}

export function useProblems() {
  const [problems, setProblems] = useState<Problem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/src/data/problems.json')
      .then((r) => r.json())
      .then(setProblems)
      .catch((e) => setError(String(e)))
  }, [])

  return { problems, error }
}


