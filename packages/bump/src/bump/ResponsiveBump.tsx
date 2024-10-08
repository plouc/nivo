import { ResponsiveWrapper } from '@nivo/core'
import { BumpDatum, BumpResponsiveProps, BumpSerieExtraProps, DefaultBumpDatum } from './types'
import { Bump } from './Bump'

export const ResponsiveBump = <
    Datum extends BumpDatum = DefaultBumpDatum,
    ExtraProps extends BumpSerieExtraProps = Record<string, never>
>(
    props: BumpResponsiveProps<Datum, ExtraProps>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <Bump<Datum, ExtraProps> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
