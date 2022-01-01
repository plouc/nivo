import { ResponsiveWrapper } from '@nivo/core'
import { DefaultTreeMapDatum, TreeMapDatum, TreeMapSvgProps } from './types'
import { TreeMap } from './TreeMap'

export const ResponsiveTreeMap = <Datum extends TreeMapDatum = DefaultTreeMapDatum>(
    props: Omit<TreeMapSvgProps<Datum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <TreeMap<Datum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
