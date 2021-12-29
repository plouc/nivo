import { ResponsiveWrapper } from '@nivo/core'
import { NetworkCanvasProps, InputNode } from './types'
import { NetworkCanvas } from './NetworkCanvas'

export const ResponsiveNetworkCanvas = <Node extends InputNode = InputNode>(
    props: Omit<NetworkCanvasProps<Node>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <NetworkCanvas<Node> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
