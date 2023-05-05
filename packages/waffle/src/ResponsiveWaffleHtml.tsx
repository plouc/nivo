import { ResponsiveWrapper } from '@nivo/core'
import { WaffleHtmlProps, Datum } from './types'
import { WaffleHtml } from './WaffleHtml'

export const ResponsiveWaffleHtml = <RawDatum extends Datum>(
    props: Omit<WaffleHtmlProps<RawDatum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <WaffleHtml<RawDatum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
