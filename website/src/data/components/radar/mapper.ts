import { RadarSvgProps } from '@nivo/radar'
import { settingsMapper, mapFormat, UnmappedSettings } from '../../../lib/settings'

export type MappedRadarProps = Omit<RadarSvgProps<any>, 'data' | 'keys' | 'width' | 'height'>
export type UnmappedRadarProps = UnmappedSettings<
    MappedRadarProps,
    {
        valueFormat: {
            format: string
            enabled: boolean
        }
        dotLabel: string
    }
>

export default settingsMapper<UnmappedRadarProps, MappedRadarProps>({
    valueFormat: mapFormat,
    dotLabel: (value: string) => {
        if (value === `p => \`\${p.key}: \${p.value}\``) return (p: any) => `${p.key}: ${p.value}`
        if (value === `p => \`\${p.index}: \${p.value}\``)
            return (p: any) => `${p.index}: ${p.value}`
        return value
    },
})
