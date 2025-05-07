import { ResponsiveWrapper, DefaultChartContext } from '@nivo/core'
import { IcicleHtml } from './IcicleHtml'
import { IcicleHtmlProps } from './types'

export const ResponsiveIcicleHtml = <Datum, Context = DefaultChartContext>(
    props: Omit<IcicleHtmlProps<Datum, Context>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { height: number; width: number }) => (
            <IcicleHtml<Datum, Context> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
