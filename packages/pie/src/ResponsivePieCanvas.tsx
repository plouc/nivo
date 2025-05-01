import { ResponsiveWrapper } from '@nivo/core'
import { PieCanvas } from './PieCanvas'
import { PieCanvasProps, MayHaveLabel } from './types'

export const ResponsivePieCanvas = <RawDatum extends MayHaveLabel>(
    props: Omit<PieCanvasProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <PieCanvas<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
