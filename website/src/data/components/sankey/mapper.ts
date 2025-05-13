import { DefaultLink, DefaultNode, SankeySvgProps } from '@nivo/sankey'
import { settingsMapper, UnmappedSettings } from '../../../lib/settings'
import { mapFormat, mapLegends } from '../../../lib/property-mappers'

export type MappedSankeyProps = Omit<
    SankeySvgProps<DefaultNode, DefaultLink>,
    'data' | 'width' | 'height'
>
export type UnmappedSankeyProps = UnmappedSettings<
    MappedSankeyProps,
    {
        valueFormat: {
            format: string
            enabled: boolean
        }
    }
>

export default settingsMapper<UnmappedSankeyProps, MappedSankeyProps>({
    valueFormat: mapFormat,
    legends: mapLegends,
})
