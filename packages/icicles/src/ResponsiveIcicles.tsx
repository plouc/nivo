import { ResponsiveWrapper } from '@nivo/core'
import { Icicles } from './Icicles'
import { IciclesSvgProps } from './types'

type ResponsiveIciclesProps<RawDatum> = Partial<
    Omit<IciclesSvgProps<RawDatum>, 'data' | 'width' | 'height'>
> &
    Pick<IciclesSvgProps<RawDatum>, 'data'>

export const ResponsiveIcicles = <RawDatum,>(props: ResponsiveIciclesProps<RawDatum>) => (
    <ResponsiveWrapper>
        {({ width, height }: { height: number; width: number }) => (
            <Icicles<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
