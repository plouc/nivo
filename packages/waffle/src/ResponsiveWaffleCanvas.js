import { ResponsiveWrapper } from '@nivo/core'
import WaffleCanvas from './WaffleCanvas'

const ResponsiveWaffleCanvas = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <WaffleCanvas width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveWaffleCanvas
