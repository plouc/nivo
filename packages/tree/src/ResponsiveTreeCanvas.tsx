import { ResponsiveWrapper } from '@nivo/core'
import { ResponsiveTreeCanvasProps, DefaultDatum } from './types'
import { TreeCanvas } from './TreeCanvas'

export const ResponsiveTreeCanvas = <Datum = DefaultDatum,>(
    props: ResponsiveTreeCanvasProps<Datum>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <TreeCanvas<Datum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
