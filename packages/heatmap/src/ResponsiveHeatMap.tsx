import { ResponsiveWrapper } from '@nivo/core'
import { DefaultHeatMapDatum, HeatMapDatum, HeatMapSvgProps } from './types'
import { HeatMap } from './HeatMap'

export const ResponsiveHeatMap = <
    Datum extends HeatMapDatum = DefaultHeatMapDatum,
    ExtraProps extends object = Record<string, never>
>(
    props: Omit<HeatMapSvgProps<Datum, ExtraProps>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <HeatMap<Datum, ExtraProps> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
