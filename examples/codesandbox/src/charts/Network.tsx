import {
  ComputedNode,
  ResponsiveNetwork,
  ResponsiveNetworkCanvas,
} from '@nivo/network'
import { generateNetworkData } from '@nivo/generators'
import { useChart } from '../hooks'

const props = {
  iterations: 60,
  margin: { bottom: 30, top: 30, left: 30, right: 30 },
  nodeColor: (node: ComputedNode) => node.color,
  repulsivity: 6,
}

export function Network() {
  const [data, flavor] = useChart(generateNetworkData)

  if (flavor === 'canvas') {
    return <ResponsiveNetworkCanvas {...data} {...props} />
  }

  return <ResponsiveNetwork {...data} {...props} />
}
