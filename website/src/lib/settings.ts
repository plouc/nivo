import omit from 'lodash/omit'
import upperFirst from 'lodash/upperFirst'
import { AxisProps, CanvasAxisProps } from '@nivo/axes'

export const settingsMapper =
    (mapping: any, { exclude = [] }: { exclude?: string[] } = {}) =>
    (settings: any, options: any = {}) => {
        const overrides: any = {}

        Object.keys(settings).forEach(key => {
            if (mapping[key]) {
                overrides[key] = mapping[key](settings[key], settings, options)
            }
        })

        return {
            ...omit(settings, exclude),
            ...overrides,
        }
    }

export type AxisWithToggle<Axis extends AxisProps | CanvasAxisProps> = NonNullable<Axis> & {
    enable: boolean
}

export const mapAxis = (type: 'top' | 'right' | 'bottom' | 'left') => (value: any, settings: any) =>
    settings[`axis${upperFirst(type)}`].enable ? omit(value, ['enable']) : null

export const mapFormat = ({ format, enabled }: { format: string; enabled: boolean }) =>
    enabled ? format : undefined
