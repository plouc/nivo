import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import { DefaultTreeMapDatum, TreeMapSvgProps } from './types'
import { TreeMap } from './TreeMap'

export const ResponsiveTreeMap = <Datum extends object = DefaultTreeMapDatum>(
    props: Omit<TreeMapSvgProps<Datum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <TreeMap<Datum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
