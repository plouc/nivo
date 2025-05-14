import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { DefaultLink, DefaultNode, SankeySvgProps } from './types'
import { Sankey } from './Sankey'

export const ResponsiveSankey = forwardRef(
    <N extends DefaultNode = DefaultNode, L extends DefaultLink = DefaultLink>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<SankeySvgProps<N, L>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Sankey<N, L> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <N extends DefaultNode = DefaultNode, L extends DefaultLink = DefaultLink>(
    props: WithChartRef<ResponsiveProps<SankeySvgProps<N, L>>, SVGSVGElement>
) => ReactElement
