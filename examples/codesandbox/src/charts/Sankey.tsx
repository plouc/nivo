import { ResponsiveSankey } from '@nivo/sankey'
import { generateSankeyData } from '@nivo/generators'
import { useChart } from '../hooks'

const props = {
  colors: { scheme: 'category10' },
  margin: { top: 40, right: 40, bottom: 40, left: 40 },
} as const

export function Sankey() {
  const [data] = useChart(() =>
    generateSankeyData({ nodeCount: 11, maxIterations: 2 })
  )

  return <ResponsiveSankey data={data} {...props} />
}
