import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { TreeSvgProps, DefaultDatum } from './types'
import { Tree } from './Tree'

export const ResponsiveTree = forwardRef(
    <Datum = DefaultDatum,>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<TreeSvgProps<Datum>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Tree<Datum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum = DefaultDatum>(
    props: WithChartRef<ResponsiveProps<TreeSvgProps<Datum>>, SVGSVGElement>
) => ReactElement
