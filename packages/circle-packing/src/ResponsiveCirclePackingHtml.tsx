import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { CirclePackingHtmlProps } from './types'
import { CirclePackingHtml } from './CirclePackingHtml'

export const ResponsiveCirclePackingHtml = forwardRef(
    <Datum,>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<CirclePackingHtmlProps<Datum>>,
        ref: Ref<HTMLDivElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }: { width: number; height: number }) => (
                <CirclePackingHtml<Datum> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum>(
    props: WithChartRef<ResponsiveProps<CirclePackingHtmlProps<Datum>>, HTMLDivElement>
) => ReactElement
