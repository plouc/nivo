import { DefaultLink, DefaultNode, SankeySvgProps } from '@nivo/sankey'
import { settingsMapper, mapFormat, UnmappedSettings } from '../../../lib/settings'

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
})
