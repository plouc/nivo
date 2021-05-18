import { ResponsiveGeoMap, ResponsiveGeoMapCanvas } from '@nivo/geo'
import { countries } from '../data'
import { useChart } from '../hooks'

const props = {
  borderWidth: 0.5,
  features: countries.features,
}

export function GeoMap() {
  const [, flavor] = useChart()

  if (flavor === 'canvas') {
    return <ResponsiveGeoMapCanvas {...props} />
  }

  return <ResponsiveGeoMap {...props} />
}
