import { ChartContext } from './contexts'
import { useContext, useMemo } from 'react'

export function useChart<T>(generator?: () => T) {
  const context = useContext(ChartContext)

  if (context === undefined) {
    throw new Error('useChart must be used within a ChartContextProvider')
  }

  const [key, flavor] = context
  const [data] = useMemo(() => [generator?.(), key], [generator, key])

  return [data, flavor] as [T, typeof flavor]
}
