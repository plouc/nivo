import { BumpSvgProps } from '@nivo/bump'
import { AxisProps } from '@nivo/axes'
import { settingsMapper, UnmappedSettings } from '../../../lib/settings'
import { mapAxis } from '../../../lib/property-mappers'

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
    axisTop: mapAxis,
    axisRight: mapAxis,
    axisBottom: mapAxis,
    axisLeft: mapAxis,
})
