import { ResponsiveWrapper } from '@nivo/core'
import { BumpDatum, BumpSvgProps, DefaultBumpDatum } from './types'
import { Bump } from './Bump'

export const ResponsiveBump = <D extends BumpDatum = DefaultBumpDatum>(
    props: Omit<BumpSvgProps<D>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Bump<D> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
