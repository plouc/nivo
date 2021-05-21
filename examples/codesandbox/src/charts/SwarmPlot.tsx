import { ResponsiveSwarmPlot, ResponsiveSwarmPlotCanvas } from '@nivo/swarmplot'
import { generateSwarmPlotData } from '@nivo/generators'
import { useChart } from '../hooks'

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
  const [data, flavor] = useChart(() =>
    generateSwarmPlotData(['group A', 'group B', 'group C'], {
      min: 40,
      max: 60,
    })
  )

  if (flavor === 'canvas') {
    return <ResponsiveSwarmPlotCanvas {...data} {...props} />
  }

  return <ResponsiveSwarmPlot {...data} {...props} />
}
