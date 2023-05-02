import { ResponsiveWrapper } from '@nivo/core'
import { SvgProps, Datum } from './types'
import { Waffle } from './Waffle'

export const ResponsiveWaffle = <RawDatum extends Datum>(
    props: Omit<SvgProps<RawDatum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Waffle<RawDatum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
