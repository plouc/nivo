import omit from 'lodash/omit'
import upperFirst from 'lodash/upperFirst'

export const settingsMapper = (mapping: any, { exclude = [] } = {}) => (
    settings: any,
    options: any = {}
) => {
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

export const mapAxis = (type: string) => (value: any, settings: any) =>
    settings[`axis${upperFirst(type)}`].enable ? omit(value, ['enable']) : null

export const mapFormat = ({ format, enabled }: { format: any; enabled: boolean }) =>
    enabled ? format : undefined
