import { AreaBumpSvgProps } from '@nivo/bump'
import { settingsMapper, mapAxis, UnmappedSettings } from '../../../lib/settings'

export type MappedAreaBumpProps = Omit<AreaBumpSvgProps<any, {}>, 'data' | 'width' | 'height'>
export type UnmappedAreaBumpProps = UnmappedSettings<
    MappedAreaBumpProps,
    {
        axisTop: { enable: boolean } & MappedAreaBumpProps['axisTop']
        axisBottom: { enable: boolean } & MappedAreaBumpProps['axisBottom']
    }
>

export default settingsMapper<UnmappedAreaBumpProps, MappedAreaBumpProps>({
    axisTop: mapAxis('top'),
    axisBottom: mapAxis('bottom'),
})
