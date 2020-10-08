import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import { Pie } from './Pie'
import { PieSvgProps, MayHaveLabel } from './types'

export const ResponsivePie = <RawDatum extends MayHaveLabel>(
    props: Omit<PieSvgProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <Pie<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
