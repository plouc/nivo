import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import { DefaultHeatMapDatum, HeatMapCanvasProps, HeatMapDatum } from './types'
import { HeatMapCanvas } from './HeatMapCanvas'

export const ResponsiveHeatMapCanvas = <
    Datum extends HeatMapDatum = DefaultHeatMapDatum,
    ExtraProps extends object = Record<string, never>
>(
    props: Omit<HeatMapCanvasProps<Datum, ExtraProps>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <HeatMapCanvas<Datum, ExtraProps> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
