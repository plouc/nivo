import { Flavor, SwitchProperty } from '../../types'

export const booleanProp = ({
    key,
    group,
    flavors,
    required,
    defaultValue,
    help,
    description,
}: {
    key: string
    group: string
    flavors: Flavor[]
    required: boolean
    defaultValue?: boolean
    help: string
    description?: string
}): SwitchProperty => ({
    key,
    group,
    type: 'boolean',
    required,
    help,
    description,
    flavors,
    defaultValue,
    controlType: 'switch',
})
