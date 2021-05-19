import {
  ComputedNode,
  ResponsiveNetwork,
  ResponsiveNetworkCanvas,
} from '@nivo/network'
import { generateNetworkData } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  iterations: 60,
  nodeColor: (node: ComputedNode) => node.color,
  repulsivity: 6,
}

export function Network() {
  const [key, flavor] = useChart()
  const [data] = useMemo(() => [generateNetworkData(), key], [key])

  if (flavor === 'canvas') {
    return <ResponsiveNetworkCanvas {...data} {...props} />
  }

  return <ResponsiveNetwork {...data} {...props} />
}
