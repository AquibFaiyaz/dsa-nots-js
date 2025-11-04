import { useMemo } from 'react'
import { useSearchContext } from '../search/SearchProvider'

export function useSearch() {
  const { query, setQuery } = useSearchContext()
  const normalized = useMemo(() => query.trim().toLowerCase(), [query])
  return { query, setQuery, normalized }
}


