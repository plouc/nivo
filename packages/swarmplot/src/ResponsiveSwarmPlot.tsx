import { ResponsiveWrapper } from '@nivo/core'
import { SwarmPlotSvgProps } from './types'
import { SwarmPlot } from './SwarmPlot'

type ResponsiveSwarmPlotProps<RawDatum> = Partial<
    Omit<SwarmPlotSvgProps<RawDatum>, 'data' | 'groups' | 'width' | 'height'>
> &
    Pick<SwarmPlotSvgProps<RawDatum>, 'data' | 'groups'>

export const ResponsiveSwarmPlot = <RawDatum,>(props: ResponsiveSwarmPlotProps<RawDatum>) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <SwarmPlot<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
