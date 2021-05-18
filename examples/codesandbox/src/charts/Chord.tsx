import { ResponsiveChord, ResponsiveChordCanvas } from '@nivo/chord'
import { generateChordData } from '@nivo/generators'
import { useMemo } from 'react'
import { useChart } from '../hooks'

const props = {
  margin: { top: 60, right: 80, bottom: 60, left: 80 },
  xPadding: 0.2,
} as const

export function Chord() {
  const [key, isCanvas] = useChart()
  const [data] = useMemo(() => [generateChordData({ size: 7 }), key], [key])

  if (isCanvas) {
    return <ResponsiveChordCanvas {...data} {...props} />
  }

  return <ResponsiveChord {...data} {...props} />
}
