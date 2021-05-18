import { ResponsiveChoropleth, ResponsiveChoroplethCanvas } from '@nivo/geo'
import { countries } from '../data'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  borderWidth: 0.5,
  colors: 'nivo',
  domain: [0, 1000000],
  features: countries.features,
}

export function Choropleth() {
  const [key, isCanvas] = useChart()
  const [data] = useMemo(
    () => [
      countries.features
        .filter(
          (feature) => !['BRA', 'AUS', 'SWE', 'GRL', 'COD'].includes(feature.id)
        )
        .map((feature) => ({
          id: feature.id,
          value: Math.round(Math.random() * 1000000),
        })),
      key,
    ],
    [key]
  )

  if (isCanvas) {
    return <ResponsiveChoroplethCanvas data={data} {...props} />
  }

  return <ResponsiveChoropleth data={data} {...props} />
}
