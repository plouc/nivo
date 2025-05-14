import { forwardRef, ReactElement, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { DefaultHeatMapDatum, HeatMapCanvasProps, HeatMapDatum } from './types'
import { HeatMapCanvas } from './HeatMapCanvas'

export const ResponsiveHeatMapCanvas = forwardRef(
    <
        Datum extends HeatMapDatum = DefaultHeatMapDatum,
        ExtraProps extends object = Record<string, never>,
    >(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<HeatMapCanvasProps<Datum, ExtraProps>>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <HeatMapCanvas<Datum, ExtraProps>
                    width={width}
                    height={height}
                    {...props}
                    ref={ref}
                />
            )}
        </ResponsiveWrapper>
    )
) as <
    Datum extends HeatMapDatum = DefaultHeatMapDatum,
    ExtraProps extends object = Record<string, never>,
>(
    props: WithChartRef<ResponsiveProps<HeatMapCanvasProps<Datum, ExtraProps>>, HTMLCanvasElement>
) => ReactElement
