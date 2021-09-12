import { ResponsiveWrapper } from '@nivo/core'
import { NetworkInputNode, NetworkSvgProps } from './types'
import { Network } from './Network'

export const ResponsiveNetwork = <N extends NetworkInputNode = NetworkInputNode>(
    props: Omit<NetworkSvgProps<N>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Network<N> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
