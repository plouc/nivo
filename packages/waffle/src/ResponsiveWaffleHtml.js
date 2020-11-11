import { ResponsiveWrapper } from '@nivo/core'
import WaffleHtml from './WaffleHtml'

const ResponsiveWaffleHtml = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <WaffleHtml width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveWaffleHtml
