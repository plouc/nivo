import { ResponsiveWrapper } from '@nivo/core'
import Bump from './Bump'

const ResponsiveBump = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <Bump width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveBump
