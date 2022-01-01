import { ResponsiveWrapper } from '@nivo/core'
import { DefaultTreeMapDatum, TreeMapDatum, TreeMapHtmlProps } from './types'
import { TreeMapHtml } from './TreeMapHtml'

export const ResponsiveTreeMapHtml = <Datum extends TreeMapDatum = DefaultTreeMapDatum>(
    props: Omit<TreeMapHtmlProps<Datum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <TreeMapHtml<Datum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
