import { ChartProperty, Flavor } from '../../types'

export const chartWidth = (flavors: Flavor[]): ChartProperty => ({
    key: 'width',
    group: 'Base',
    type: 'number',
    required: true,
    help: 'Chart width.',
    description: `
        Not required if using responsive component, \`<Responsive* />\`.

        Also note that width does not include labels/axes,
        so you should add enough margin to display them.
    `,
    flavors,
    enableControlForFlavors: ['api'],
    control: {
        type: 'range',
        unit: 'px',
        min: 100,
        max: 1000,
        step: 5,
    },
})

export const chartHeight = (flavors: Flavor[]): ChartProperty => ({
    key: 'height',
    group: 'Base',
    type: 'number',
    required: true,
    help: 'Chart height.',
    description: `
        Not required if using responsive component, \`<Responsive* />\`.

        Also note that height does not include labels/axes,
        so you should add enough margin to display them.
    `,
    flavors,
    enableControlForFlavors: ['api'],
    control: {
        type: 'range',
        unit: 'px',
        min: 100,
        max: 1000,
        step: 5,
    },
})

export const chartMargin = (flavors: Flavor[]): ChartProperty => ({
    key: 'margin',
    group: 'Base',
    help: 'Chart margin.',
    type: 'object',
    required: false,
    flavors,
    control: { type: 'margin' },
})

export const pixelRatio = (): ChartProperty => ({
    key: 'pixelRatio',
    flavors: ['canvas'],
    help: `Adjust pixel ratio, useful for HiDPI screens.`,
    required: false,
    defaultValue: 'Depends on device',
    type: `number`,
    group: 'Base',
    control: {
        type: 'range',
        min: 1,
        max: 2,
    },
})

export const chartDimensions = (flavors: Flavor[]): ChartProperty[] => {
    const properties: ChartProperty[] = [chartWidth(flavors), chartHeight(flavors)]

    if (flavors.includes('canvas')) {
        properties.push(pixelRatio())
    }

    properties.push(chartMargin(flavors))

    return properties
}
