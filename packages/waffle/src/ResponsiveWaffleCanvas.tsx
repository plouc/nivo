// @ts-ignore
import { ResponsiveWrapper } from '@nivo/core'
import { CanvasProps, Datum, DefaultRawDatum } from './types'
import WaffleCanvas from './WaffleCanvas'

export const ResponsiveWaffleCanvas = <RawDatum extends Datum = DefaultRawDatum>(
    props: Omit<CanvasProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <WaffleCanvas width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
