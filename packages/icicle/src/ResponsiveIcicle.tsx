import { ResponsiveWrapper, DefaultChartContext } from '@nivo/core'
import { Icicle } from './Icicle'
import { IcicleSvgProps } from './types'

export const ResponsiveIcicle = <Datum, Context = DefaultChartContext>(
    props: Omit<IcicleSvgProps<Datum, Context>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { height: number; width: number }) => (
            <Icicle<Datum, Context> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
