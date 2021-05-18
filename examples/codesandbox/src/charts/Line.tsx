import { ResponsiveLine, ResponsiveLineCanvas } from '@nivo/line'
import { generateDrinkStats } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  enableSlices: 'x',
  margin: { top: 20, right: 20, bottom: 60, left: 80 },
} as const

export function Line() {
  const [key, flavor] = useChart()
  const [data] = useMemo(() => [generateDrinkStats(9), []], [key])

  if (flavor === 'canvas') {
    return <ResponsiveLineCanvas data={data} {...props} />
  }

  return <ResponsiveLine data={data} {...props} />
}
