import { ResponsiveWrapper } from '@nivo/core'
import { DefaultLineDatum, LineDatum, LineSvgProps } from './types'
import { Line } from './Line'

export const ResponsiveLine = <
    Datum extends LineDatum = DefaultLineDatum,
    ExtraProps extends object = Record<string, never>
>(
    props: Omit<LineSvgProps<Datum, ExtraProps>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <Line<Datum, ExtraProps> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
