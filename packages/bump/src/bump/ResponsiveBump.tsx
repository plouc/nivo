import { ResponsiveWrapper } from '@nivo/core'
import { BumpDatum, BumpSerieExtraProps, BumpSvgProps, DefaultBumpDatum } from './types'
import { Bump } from './Bump'

export const ResponsiveBump = <
    Datum extends BumpDatum = DefaultBumpDatum,
    ExtraProps extends BumpSerieExtraProps = Record<string, never>
>(
    props: Omit<BumpSvgProps<Datum, ExtraProps>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <Bump<Datum, ExtraProps> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
