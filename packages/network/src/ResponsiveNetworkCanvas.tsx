import { ResponsiveWrapper } from '@nivo/core'
import { ForwardedRef, forwardRef } from 'react'
import { NetworkCanvasProps, InputNode, InputLink } from './types'
import { NetworkCanvas } from './NetworkCanvas'

export const ResponsiveNetworkCanvas = forwardRef(function ResponsiveBarCanvas<
    Node extends InputNode = InputNode,
    Link extends InputLink = InputLink
>(
    props: Omit<NetworkCanvasProps<Node, Link>, 'height' | 'width'>,
    ref: ForwardedRef<HTMLCanvasElement>
) {
    return (
        <ResponsiveWrapper>
            {({ width, height }) => (
                <NetworkCanvas
                    width={width}
                    height={height}
                    {...(props as Omit<
                        NetworkCanvasProps<InputNode, InputLink>,
                        'height' | 'width'
                    >)}
                    ref={ref}
                />
            )}
        </ResponsiveWrapper>
    )
})
