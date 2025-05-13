import omit from 'lodash/omit'
import { PolarBarSvgProps } from '@nivo/polar-bar'
import { settingsMapper, UnmappedSettings } from '../../../lib/settings'
import { mapFormat, mapLegends } from '../../../lib/property-mappers'

export type MappedPolarBarProps = Omit<PolarBarSvgProps<any>, 'data' | 'width' | 'height'>
export type UnmappedPolarBarProps = UnmappedSettings<
    MappedPolarBarProps,
    {
        valueFormat: {
            format: string
            enabled: boolean
        }
        radialAxis: { enable: boolean } & MappedPolarBarProps['radialAxis']
        circularAxisInner: { enable: boolean } & MappedPolarBarProps['circularAxisInner']
        circularAxisOuter: { enable: boolean } & MappedPolarBarProps['circularAxisOuter']
    }
>

export const mapAxis =
    <T extends Record<string, any>>() =>
    (value: T) => {
        return value.enable ? omit(value, ['enable']) : null
    }

export default settingsMapper<UnmappedPolarBarProps, MappedPolarBarProps>({
    valueFormat: mapFormat,
    radialAxis: mapAxis<UnmappedPolarBarProps['radialAxis']>(),
    circularAxisInner: mapAxis<UnmappedPolarBarProps['circularAxisInner']>(),
    circularAxisOuter: mapAxis<UnmappedPolarBarProps['circularAxisOuter']>(),
    legends: mapLegends,
})
