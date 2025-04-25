import { ChordSvgProps } from '@nivo/chord'
import { settingsMapper, UnmappedSettings } from '../../../lib/settings'

export type MappedChordProps = Omit<ChordSvgProps, 'data' | 'keys' | 'width' | 'height' | 'layers'>
export type UnmappedChordProps = UnmappedSettings<
    MappedChordProps,
    {
        label: string
    }
>

export default settingsMapper<UnmappedChordProps, MappedChordProps>({
    label: value => {
        if (value === `d => \`\${d.id} [\${d.value}]\``) return d => `${d.id} [${d.value}]`
        return value
    },
})
