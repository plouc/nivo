import { ResponsiveWrapper } from '@nivo/core'
import { InputNode, NetworkSvgProps } from './types'
import { Network } from './Network'

export const ResponsiveNetwork = <Node extends InputNode = InputNode>(
    props: Omit<NetworkSvgProps<Node>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Network<Node> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
