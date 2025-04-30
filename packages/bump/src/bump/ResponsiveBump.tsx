import { ResponsiveWrapper } from '@nivo/core'
import {
    BumpDatum,
    BumpSvgPropsWithSeriesMouseHandlers,
    BumpSvgPropsWithPointMouseHandlers,
    BumpSerieExtraProps,
    DefaultBumpDatum,
} from './types'
import { Bump } from './Bump'

export const ResponsiveBump = <
    Datum extends BumpDatum = DefaultBumpDatum,
    ExtraProps extends BumpSerieExtraProps = Record<string, unknown>
>(
    props:
        | Omit<BumpSvgPropsWithSeriesMouseHandlers<Datum, ExtraProps>, 'width' | 'height'>
        | Omit<BumpSvgPropsWithPointMouseHandlers<Datum, ExtraProps>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <Bump<Datum, ExtraProps> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
