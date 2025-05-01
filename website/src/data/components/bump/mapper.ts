import { BumpSvgProps } from '@nivo/bump'
import { AxisProps } from '@nivo/axes'
import { settingsMapper, mapAxis, UnmappedSettings } from '../../../lib/settings'

export type MappedBumpProps = Omit<BumpSvgProps<any>, 'data' | 'width' | 'height'>
export type UnmappedBumpProps = UnmappedSettings<
    MappedBumpProps,
    {
        axisTop: AxisProps & { enable: boolean }
        axisRight: AxisProps & { enable: boolean }
        axisBottom: AxisProps & { enable: boolean }
        axisLeft: AxisProps & { enable: boolean }
    }
>

export default settingsMapper<UnmappedBumpProps, MappedBumpProps>({
    axisTop: mapAxis('top'),
    axisRight: mapAxis('right'),
    axisBottom: mapAxis('bottom'),
    axisLeft: mapAxis('left'),
})
