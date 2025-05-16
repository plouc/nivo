import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { WaffleHtmlProps, Datum } from './types'
import { WaffleHtml } from './WaffleHtml'

export const ResponsiveWaffleHtml = forwardRef(
    <RawDatum extends Datum = Datum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<WaffleHtmlProps<RawDatum>>,
        ref: Ref<HTMLDivElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <WaffleHtml<RawDatum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum extends Datum = Datum>(
    props: WithChartRef<ResponsiveProps<WaffleHtmlProps<RawDatum>>, HTMLDivElement>
) => ReactElement
