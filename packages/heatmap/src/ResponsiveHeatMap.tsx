import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, WithChartRef, ResponsiveProps } from '@nivo/core'
import { DefaultHeatMapDatum, HeatMapDatum, HeatMapSvgProps } from './types'
import { HeatMap } from './HeatMap'

export const ResponsiveHeatMap = forwardRef(
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
        }: ResponsiveProps<HeatMapSvgProps<Datum, ExtraProps>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <HeatMap<Datum, ExtraProps> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <
    Datum extends HeatMapDatum = DefaultHeatMapDatum,
    ExtraProps extends object = Record<string, never>,
>(
    props: WithChartRef<ResponsiveProps<HeatMapSvgProps<Datum, ExtraProps>>, SVGSVGElement>
) => ReactElement
