import { AreaBumpSvgProps } from '@nivo/bump'
import { settingsMapper, UnmappedSettings } from '../../../lib/settings'
import { mapAxis } from '../../../lib/property-mappers'

export type MappedAreaBumpProps = Omit<AreaBumpSvgProps<any, {}>, 'data' | 'width' | 'height'>
export type UnmappedAreaBumpProps = UnmappedSettings<
    MappedAreaBumpProps,
    {
        axisTop: { enable: boolean } & MappedAreaBumpProps['axisTop']
        axisBottom: { enable: boolean } & MappedAreaBumpProps['axisBottom']
    }
>

export default settingsMapper<UnmappedAreaBumpProps, MappedAreaBumpProps>({
    axisTop: mapAxis,
    axisBottom: mapAxis,
})
