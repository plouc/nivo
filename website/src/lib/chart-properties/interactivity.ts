import { ChartProperty, Flavor } from '../../types'

export const isInteractive = ({
    flavors,
    defaultValue,
}: {
    flavors: Flavor[]
    defaultValue: boolean
}): ChartProperty => ({
    key: 'isInteractive',
    group: 'Interactivity',
    type: 'boolean',
    help: 'Enable/disable interactivity.',
    required: false,
    defaultValue,
    flavors,
    control: { type: 'switch' },
})
