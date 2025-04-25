import omit from 'lodash/omit.js'
import { settingsMapper, mapFormat } from '../../../lib/settings'
import { RadialBarSvgProps } from '@nivo/radial-bar'

export type MappedRadarProps = Omit<RadialBarSvgProps, 'data' | 'width' | 'height'>
export type UnmappedRadarProps = Omit<
    MappedRadarProps,
    'valueFormat' | 'radialAxisStart' | 'radialAxisEnd' | 'circularAxisInner' | 'circularAxisOuter'
> & {
    valueFormat: {
        format: string
        enabled: boolean
    }
    radialAxisStart: { enable: boolean } & MappedRadarProps['radialAxisStart']
    radialAxisEnd: { enable: boolean } & MappedRadarProps['radialAxisEnd']
    circularAxisInner: { enable: boolean } & MappedRadarProps['circularAxisInner']
    circularAxisOuter: { enable: boolean } & MappedRadarProps['circularAxisOuter']
}

export const mapAxis = (key: string) => (value: any, settings: any) =>
    settings[key].enable ? omit(value, ['enable']) : null

export default settingsMapper<UnmappedRadarProps, MappedRadarProps>({
    valueFormat: mapFormat,
    radialAxisStart: mapAxis('radialAxisStart'),
    radialAxisEnd: mapAxis('radialAxisEnd'),
    circularAxisInner: mapAxis('circularAxisInner'),
    circularAxisOuter: mapAxis('circularAxisOuter'),
})
