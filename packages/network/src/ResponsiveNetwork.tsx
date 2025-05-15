import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { InputLink, InputNode, NetworkSvgProps } from './types'
import { Network } from './Network'

export const ResponsiveNetwork = forwardRef(
    <Node extends InputNode = InputNode, Link extends InputLink = InputLink>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<NetworkSvgProps<Node, Link>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Network<Node, Link> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Node extends InputNode = InputNode, Link extends InputLink = InputLink>(
    props: WithChartRef<ResponsiveProps<NetworkSvgProps<Node, Link>>, SVGSVGElement>
) => ReactElement
