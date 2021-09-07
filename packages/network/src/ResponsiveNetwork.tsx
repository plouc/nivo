import { ResponsiveWrapper } from '@nivo/core'
import { NetworkSvgProps } from './types'
import { Network } from './Network'

export const ResponsiveNetwork = (props: Omit<NetworkSvgProps, 'height' | 'width'>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Network width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
