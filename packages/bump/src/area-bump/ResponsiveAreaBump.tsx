import { ResponsiveWrapper } from '@nivo/core'
import {
    AreaBumpDatum,
    AreaBumpSerieExtraProps,
    AreaBumpSvgProps,
    DefaultAreaBumpDatum,
} from './types'
import { AreaBump } from './AreaBump'

export const ResponsiveAreaBump = <
    Datum extends AreaBumpDatum = DefaultAreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps = Record<string, unknown>
>(
    props: Omit<AreaBumpSvgProps<Datum, ExtraProps>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <AreaBump<Datum, ExtraProps> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
