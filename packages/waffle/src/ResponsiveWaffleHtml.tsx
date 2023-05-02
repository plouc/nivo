import { ResponsiveWrapper } from '@nivo/core'
import { HtmlProps, Datum } from './types'
import { WaffleHtml } from './WaffleHtml'

export const ResponsiveWaffleHtml = <RawDatum extends Datum>(
    props: Omit<HtmlProps<RawDatum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <WaffleHtml<RawDatum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
