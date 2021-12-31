import { ResponsiveWrapper } from '@nivo/core'
import { NetworkCanvasProps, InputNode, InputLink } from './types'
import { NetworkCanvas } from './NetworkCanvas'

export const ResponsiveNetworkCanvas = <
    Node extends InputNode = InputNode,
    Link extends InputLink = InputLink
>(
    props: Omit<NetworkCanvasProps<Node, Link>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <NetworkCanvas<Node, Link> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
