import { ResponsiveWrapper } from '@nivo/core'
import HeatMapCanvas from './HeatMapCanvas'

const ResponsiveHeatMapCanvas = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <HeatMapCanvas width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveHeatMapCanvas
