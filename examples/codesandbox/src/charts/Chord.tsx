import { ResponsiveChord, ResponsiveChordCanvas } from '@nivo/chord'
import { generateChordData } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  margin: { top: 60, right: 80, bottom: 60, left: 80 },
  xPadding: 0.2,
} as const

export function Chord() {
  const [key, flavor] = useChart()
  const [data] = useMemo(() => [generateChordData({ size: 7 }), key], [key])

  if (flavor === 'canvas') {
    return <ResponsiveChordCanvas {...data} {...props} />
  }

  return <ResponsiveChord {...data} {...props} />
}
