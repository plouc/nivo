import {
  ComputedNode,
  ResponsiveNetwork,
  ResponsiveNetworkCanvas,
} from '@bitbloom/nivo-network'
import { generateNetworkData } from '@bitbloom/nivo-generators'
import { useChart } from '../hooks'

const props = {
  iterations: 60,
  margin: { bottom: 30, top: 30, left: 30, right: 30 },
  nodeColor: (node: ComputedNode<any>) => node.color,
  repulsivity: 6,
}

export function Network() {
  const [data, flavor] = useChart(generateNetworkData)

  if (flavor === 'canvas') {
    return <ResponsiveNetworkCanvas data={data} {...props} />
  }

  return <ResponsiveNetwork data={data} {...props} />
}
