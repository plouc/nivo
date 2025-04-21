import { ResponsiveWrapper } from '@nivo/core'
import { PolarBar } from './PolarBar'
import { PolarBarSvgProps, PolarBarDatum } from './types'

export const ResponsivePolarBar = <RawDatum extends PolarBarDatum>(
    props: Omit<PolarBarSvgProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <PolarBar<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
