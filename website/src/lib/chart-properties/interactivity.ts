import { ChartProperty, Flavor } from '../../types'

export const isInteractive = ({
    flavors,
    defaultValue,
    help,
}: {
    flavors: Flavor[]
    defaultValue: boolean
    help?: string
}): ChartProperty => ({
    key: 'isInteractive',
    group: 'Interactivity',
    type: 'boolean',
    help: help ?? 'Enable/disable interactivity.',
    required: false,
    defaultValue,
    flavors,
    control: { type: 'switch' },
})
