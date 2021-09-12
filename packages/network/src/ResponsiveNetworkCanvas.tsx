import { ResponsiveWrapper } from '@nivo/core'
import { NetworkCanvasProps, NetworkInputNode } from './types'
import { NetworkCanvas } from './NetworkCanvas'

export const ResponsiveNetworkCanvas = <N extends NetworkInputNode = NetworkInputNode>(
    props: Omit<NetworkCanvasProps<N>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <NetworkCanvas<N> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
