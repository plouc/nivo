import { ResponsiveWrapper } from '@nivo/core'
import { Icicle } from './Icicle'
import { IcicleSvgProps } from './types'

export const ResponsiveIcicle = <Datum,>(
    props: Omit<IcicleSvgProps<Datum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { height: number; width: number }) => (
            <Icicle<Datum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
