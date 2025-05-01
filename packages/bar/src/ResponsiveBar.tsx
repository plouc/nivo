import { Bar } from './Bar'
import { BarDatum, BarSvgProps } from './types'
import { ResponsiveWrapper } from '@nivo/core'

export type ResponsiveBarSvgProps<RawDatum extends BarDatum> = Omit<
    BarSvgProps<RawDatum>,
    'height' | 'width'
>

export const ResponsiveBar = <RawDatum extends BarDatum>(
    props: ResponsiveBarSvgProps<RawDatum>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Bar<RawDatum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
