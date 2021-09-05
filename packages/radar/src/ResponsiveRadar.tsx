import { ResponsiveWrapper } from '@nivo/core'
import { RadarSvgProps } from './types'
import { Radar } from './Radar'

export const ResponsiveRadar = <D extends Record<string, unknown>>(
    props: Omit<RadarSvgProps<D>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Radar<D> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
