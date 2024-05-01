import { forwardRef } from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import LineCanvas from './LineCanvas'

const ResponsiveLineCanvas = (props, ref) => (
    <ResponsiveWrapper>
        {({ width, height }) => <LineCanvas width={width} height={height} {...props} ref={ref} />}
    </ResponsiveWrapper>
)

export default forwardRef(ResponsiveLineCanvas)
