import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import { CirclePackingHtmlProps } from './types'
import { CirclePackingHtml } from './CirclePackingHtml'

type ResponsiveCirclePackingHtmlProps<RawDatum> = Partial<
    Omit<CirclePackingHtmlProps<RawDatum>, 'data' | 'width' | 'height'>
> &
    Pick<CirclePackingHtmlProps<RawDatum>, 'data'>

export const ResponsiveCirclePackingHtml = <RawDatum,>(
    props: ResponsiveCirclePackingHtmlProps<RawDatum>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <CirclePackingHtml<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
