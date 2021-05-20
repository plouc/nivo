import { ResponsiveSunburst } from '@nivo/sunburst'
import { generateLibTree } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  id: 'name',
  value: 'loc',
}

export function Sunburst() {
  const [key] = useChart()
  const [data] = useMemo(() => [generateLibTree(), key], [key])

  return <ResponsiveSunburst data={data} {...props} />
}
