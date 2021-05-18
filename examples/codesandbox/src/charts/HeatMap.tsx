import {
  HeatMapDatum,
  ResponsiveHeatMap,
  ResponsiveHeatMapCanvas,
} from '@nivo/heatmap'
import { generateCountriesData } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const keys = [
  'hot dogs',
  'burgers',
  'sandwich',
  'kebab',
  'fries',
  'donut',
  'junk',
  'sushi',
  'ramen',
  'curry',
  'udon',
  'bagel',
]

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
  indexBy: 'country',
  keys,
}

export function HeatMap() {
  const [key, flavor] = useChart()
  const [data] = useMemo(
    () => [
      generateCountriesData(keys, {
        size: 9,
        min: 0,
        max: 100,
      }) as HeatMapDatum[],
      key,
    ],
    [key]
  )

  if (flavor === 'canvas') {
    return <ResponsiveHeatMapCanvas data={data} {...props} />
  }

  return <ResponsiveHeatMap data={data} {...props} />
}
