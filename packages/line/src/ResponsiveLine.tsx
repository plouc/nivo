import { ResponsiveWrapper } from '@nivo/core'
import { Line } from './Line'
import { LineSvgProps, LineSeries } from './types'

export const ResponsiveLine = <Series extends LineSeries>(
    props: Omit<LineSvgProps<Series>, 'width' | 'height'>
) => {
    return (
        <ResponsiveWrapper>
            {({ width, height }: { width: number; height: number }) => (
                <Line<Series> width={width} height={height} {...props} />
            )}
        </ResponsiveWrapper>
    )
}
