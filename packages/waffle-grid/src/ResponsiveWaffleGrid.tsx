import { ResponsiveWrapper } from '@nivo/core'
import { WaffleGridSvgProps } from './types'
import { WaffleGrid } from './WaffleGrid'

export const ResponsiveWaffleGrid = (props: Omit<WaffleGridSvgProps, 'height' | 'width'>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <WaffleGrid width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
