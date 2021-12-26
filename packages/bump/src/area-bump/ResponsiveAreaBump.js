import { ResponsiveWrapper } from '@nivo/core'
import AreaBump from './AreaBump'

const ResponsiveAreaBump = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <AreaBump width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveAreaBump
