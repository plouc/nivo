import { ResponsiveWrapper } from '@nivo/core'
import { ResponsiveTreeSvgProps, DefaultDatum } from './types'
import { Tree } from './Tree'

export const ResponsiveTree = <Datum = DefaultDatum,>(props: ResponsiveTreeSvgProps<Datum>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Tree<Datum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
