import { Flavor, RangeProperty, MarginProperty } from '../../types'

const group = 'Base'

const dimension = (key: string, flavors: Flavor[]): RangeProperty => ({
    key,
    group,
    type: 'number',
    required: true,
    help: `Chart ${key}, not required if using the responsive version \`<Responsive* />\`.`,
    flavors: flavors,
    enableControlForFlavors: ['api'],
    controlType: 'range',
    controlOptions: {
        unit: 'px',
        min: 100,
        max: 1000,
        step: 5,
    },
})

export const width = (flavors: Flavor[]) => dimension('width', flavors)
export const height = (flavors: Flavor[]) => dimension('height', flavors)

export const dimensionsProps = (flavors: Flavor[]): RangeProperty[] => [
    width(flavors),
    height(flavors),
]

export const marginProp = (flavors: Flavor[]): MarginProperty => ({
    key: 'margin',
    group,
    help: 'Chart margin.',
    type: '{ top?: number; right?: number; bottom?: number; left?: number }',
    required: false,
    flavors,
    controlType: 'margin',
})
