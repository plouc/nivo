import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import { WaffleSvgProps, Datum } from './types'
import { Waffle } from './Waffle'

export const ResponsiveWaffle = <RawDatum extends Datum>(
    props: Omit<WaffleSvgProps<RawDatum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Waffle<RawDatum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
