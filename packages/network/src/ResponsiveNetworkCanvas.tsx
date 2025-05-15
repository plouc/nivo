import { Ref, forwardRef, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { NetworkCanvasProps, InputNode, InputLink } from './types'
import { NetworkCanvas } from './NetworkCanvas'

export const ResponsiveNetworkCanvas = forwardRef(
    <Node extends InputNode = InputNode, Link extends InputLink = InputLink>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<NetworkCanvasProps<Node, Link>>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <NetworkCanvas {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Node extends InputNode = InputNode, Link extends InputLink = InputLink>(
    props: WithChartRef<ResponsiveProps<NetworkCanvasProps<Node, Link>>, HTMLCanvasElement>
) => ReactElement
