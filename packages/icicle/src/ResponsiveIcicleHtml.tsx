import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, DefaultChartContext, ResponsiveProps, WithChartRef } from '@nivo/core'
import { IcicleHtml } from './IcicleHtml'
import { IcicleHtmlProps } from './types'

export const ResponsiveIcicleHtml = forwardRef(
    <Datum, Context = DefaultChartContext>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<IcicleHtmlProps<Datum, Context>>,
        ref: Ref<HTMLDivElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }: { height: number; width: number }) => (
                <IcicleHtml<Datum, Context> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum, Context = DefaultChartContext>(
    props: WithChartRef<ResponsiveProps<IcicleHtmlProps<Datum, Context>>, HTMLDivElement>
) => ReactElement
