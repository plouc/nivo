import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import { DefaultTreeMapDatum, TreeMapHtmlProps } from './types'
import { TreeMapHtml } from './TreeMapHtml'

export const ResponsiveTreeMapHtml = <Datum extends object = DefaultTreeMapDatum>(
    props: Omit<TreeMapHtmlProps<Datum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <TreeMapHtml<Datum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
