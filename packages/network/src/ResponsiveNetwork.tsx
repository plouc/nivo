import { ResponsiveWrapper } from '@nivo/core'
import Network from './Network'

const ResponsiveNetwork = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <Network width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveNetwork
