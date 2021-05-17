import { ChartContext } from './contexts'
import { useContext } from 'react'

export function useChart() {
  const context = useContext(ChartContext)

  if (context === undefined) {
    throw new Error('useChart must be used within a ChartContextProvider')
  }

  return context
}
