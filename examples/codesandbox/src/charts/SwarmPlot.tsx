import { ResponsiveSwarmPlot, ResponsiveSwarmPlotCanvas } from '@nivo/swarmplot'
import { generateSwarmPlotData } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  groupBy: 'group',
  identity: 'id',
  margin: { top: 40, right: 40, bottom: 40, left: 40 },
  size: 10,
  value: 'price',
  valueScale: {
    type: 'linear',
    min: 0,
    max: 500,
  },
}

export function SwarmPlot() {
  const [key, flavor] = useChart()
  const [data] = useMemo(
    () => [
      generateSwarmPlotData(['group A', 'group B', 'group C'], {
        min: 40,
        max: 60,
      }),
      key,
    ],
    [key]
  )

  if (flavor === 'canvas') {
    return <ResponsiveSwarmPlotCanvas {...data} {...props} />
  }

  return <ResponsiveSwarmPlot {...data} {...props} />
}
