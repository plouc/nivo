import { ResponsiveWrapper } from '@nivo/core'
import NetworkCanvas from './NetworkCanvas'

const ResponsiveNetworkCanvas = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <NetworkCanvas width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveNetworkCanvas
