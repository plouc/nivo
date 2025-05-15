import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { DefaultTreeMapDatum, TreeMapCanvasProps } from './types'
import { TreeMapCanvas } from './TreeMapCanvas'

export const ResponsiveTreeMapCanvas = forwardRef(
    <Datum extends object = DefaultTreeMapDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<TreeMapCanvasProps<Datum>>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <TreeMapCanvas<Datum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum extends object = DefaultTreeMapDatum>(
    props: WithChartRef<ResponsiveProps<TreeMapCanvasProps<Datum>>, HTMLCanvasElement>
) => ReactElement
