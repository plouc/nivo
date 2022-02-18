import { ResponsiveWrapper } from '@nivo/core'
import Line from './Line'

const ResponsiveLine = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <Line width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveLine
