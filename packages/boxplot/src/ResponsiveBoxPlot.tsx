import { BoxPlot } from './BoxPlot'
import { BoxPlotDatum, BoxPlotSvgProps } from './types'
import { ResponsiveWrapper } from '@nivo/core'

export const ResponsiveBoxPlot = <RawDatum extends BoxPlotDatum>(
    props: Omit<BoxPlotSvgProps<RawDatum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <BoxPlot<RawDatum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
