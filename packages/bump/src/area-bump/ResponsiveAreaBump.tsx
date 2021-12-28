import { ResponsiveWrapper } from '@nivo/core'
import { AreaBumpDatum, AreaBumpSvgProps, DefaultAreaBumpDatum } from './types'
import { AreaBump } from './AreaBump'

export const ResponsiveAreaBump = <D extends AreaBumpDatum = DefaultAreaBumpDatum>(
    props: Omit<AreaBumpSvgProps<D>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <AreaBump<D> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
