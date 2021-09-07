import { ResponsiveWrapper } from '@nivo/core'
import { NetworkCanvasProps } from './types'
import { NetworkCanvas } from './NetworkCanvas'

export const ResponsiveNetworkCanvas = (props: Omit<NetworkCanvasProps, 'height' | 'width'>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <NetworkCanvas width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
