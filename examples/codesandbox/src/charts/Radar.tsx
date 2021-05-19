import { ResponsiveRadar } from '@nivo/radar'
import { generateWinesTastes } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  indexBy: 'taste',
  margin: { top: 60, right: 80, bottom: 20, left: 80 },
}

export function Radar() {
  const [key] = useChart()
  const [data] = useMemo(() => [generateWinesTastes(), key], [key])

  return <ResponsiveRadar {...data} {...props} />
}
