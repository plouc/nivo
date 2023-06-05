import { Bar } from './Bar'
import { BarDatum, BarSvgProps } from './types'
import { ResponsiveWrapper } from '@bitbloom/nivo-core'

export const ResponsiveBar = <RawDatum extends BarDatum>(
    props: Omit<BarSvgProps<RawDatum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Bar<RawDatum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
