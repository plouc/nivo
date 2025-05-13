import { ChartProperty, Flavor } from '../../types'

export const chartWidth = (flavors: Flavor[]): ChartProperty => ({
    key: 'width',
    group: 'Base',
    type: 'number',
    required: true,
    help: 'Chart width for non-responsive component.',
    description: `
        Please note that this does not include labels/axes,
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

export const chartDefaultWidth = (flavors: Flavor[]): ChartProperty => ({
    key: 'defaultWidth',
    group: 'Base',
    type: 'number',
    required: false,
    help: 'Chart default width for responsive component.',
    description: `
        This can be used for SSR to set a default width for the chart.

        It's going to be adjusted once mounted in the DOM.
    `,
    flavors,
})

export const chartHeight = (flavors: Flavor[]): ChartProperty => ({
    key: 'height',
    group: 'Base',
    type: 'number',
    required: true,
    help: 'Chart height for non-responsive component.',
    description: `
        Please note that this does not include labels/axes,
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

export const chartDefaultHeight = (flavors: Flavor[]): ChartProperty => ({
    key: 'defaultHeight',
    group: 'Base',
    type: 'number',
    required: false,
    help: 'Chart default height for responsive component.',
    description: `
        This can be used for SSR to set a default height for the chart.

        It's going to be adjusted once mounted in the DOM.
    `,
    flavors,
})

export const chartDebounceResize = (flavors: Flavor[]): ChartProperty => ({
    key: 'debounceResize',
    group: 'Base',
    type: 'number (ms)',
    required: false,
    help: 'Debounce `width`/`height` updates for responsive component.',
    description: `
        Chart dimensions updates requires to recompute the layout,
        which can be pretty expensive.
    `,
    flavors,
})

export const chartOnResize = (flavors: Flavor[]): ChartProperty => ({
    key: 'onResize',
    group: 'Base',
    type: '(dimensions: { width: number; height: number }) => void',
    required: false,
    help: 'A callback for when responsive component is resized.',
    description: `
    When using a responsive component, you might need to adjust
    some elements of the chart to accommodate the new size,
    such as axes, labels, or legends.

    You could use this callback to adjust some properties,
    but memoization should be used when the updated properties
    aren't scalar values, otherwise this might lead to needless updates.
    `,
    flavors,
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

export const chartDimensions = (
    flavors: Flavor[],
    withResponsiveProps = false
): ChartProperty[] => {
    const properties: ChartProperty[] = [chartWidth(flavors)]
    if (withResponsiveProps) {
        properties.push(chartDefaultWidth(flavors))
    }

    properties.push(chartHeight(flavors))
    if (withResponsiveProps) {
        properties.push(chartDefaultHeight(flavors))
        properties.push(chartDebounceResize(flavors))
        properties.push(chartOnResize(flavors))
    }

    if (flavors.includes('canvas')) {
        properties.push(pixelRatio())
    }

    properties.push(chartMargin(flavors))

    return properties
}
