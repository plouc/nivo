import { ResponsiveWrapper } from '@nivo/core'
import Waffle from './Waffle'

const ResponsiveWaffle = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <Waffle width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveWaffle
