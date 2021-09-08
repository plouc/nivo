import { ResponsiveWrapper } from '@nivo/core'
import { RadialBarSvgProps } from './types'
import { RadialBar } from './RadialBar'

export const ResponsiveRadialBar = (props: Omit<RadialBarSvgProps, 'height' | 'width'>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <RadialBar width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
