import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { DefaultTreeMapDatum, TreeMapHtmlProps } from './types'
import { TreeMapHtml } from './TreeMapHtml'

export const ResponsiveTreeMapHtml = forwardRef(
    <Datum extends object = DefaultTreeMapDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<TreeMapHtmlProps<Datum>>,
        ref: Ref<HTMLDivElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <TreeMapHtml<Datum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum extends object = DefaultTreeMapDatum>(
    props: WithChartRef<ResponsiveProps<TreeMapHtmlProps<Datum>>, HTMLDivElement>
) => ReactElement
