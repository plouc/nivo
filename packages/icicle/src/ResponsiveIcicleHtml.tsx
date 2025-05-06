import { ResponsiveWrapper } from '@nivo/core'
import { IcicleHtml } from './IcicleHtml'
import { IcicleHtmlProps } from './types'

export const ResponsiveIcicleHtml = <Datum,>(
    props: Omit<IcicleHtmlProps<Datum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { height: number; width: number }) => (
            <IcicleHtml<Datum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
