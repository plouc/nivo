import {
  ResponsiveHeatMap,
  ResponsiveHeatMapCanvas,
} from '@nivo/heatmap'
import { generateXYSeries } from '@nivo/generators'
import { useChart } from '../hooks'

const props = {
  axisTop: {
    orient: 'top',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: -55,
    legend: '',
    legendOffset: 36,
  },
  margin: { top: 60, right: 80, bottom: 60, left: 80 },
}

export function HeatMap() {
  const [data, flavor] = useChart(
    () =>
      generateXYSeries({
        serieIds: ['Japan', 'France', 'US', 'Germany', 'Norway', 'Iceland', 'UK', 'Vietnam'],
        x: {
          values: ['Train', 'Subway', 'Bus', 'Car', 'Boat', 'Moto', 'Moped', 'Bicycle', 'Others'],
        },
        y: {
          length: NaN,
          min: -100_000,
          max: 100_000,
          round: true,
        },
      }) as {
        id: string
        data: {
          x: string
          y: number
        }[]
      }[]
  )

  if (flavor === 'canvas') {
    return <ResponsiveHeatMapCanvas data={data} {...props} />
  }

  return <ResponsiveHeatMap data={data} {...props} />
}
