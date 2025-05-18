import { ChartProperty, Flavor } from '../../types'

const DIMENSIONS_GROUP = 'Dimensions'

export const chartWidth = (flavors: Flavor[], group = DIMENSIONS_GROUP): ChartProperty => ({
    key: 'width',
    group,
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

export const chartDefaultWidth = (flavors: Flavor[], group = DIMENSIONS_GROUP): ChartProperty => ({
    key: 'defaultWidth',
    group,
    type: 'number',
    required: false,
    help: 'Chart default width for responsive component.',
    description: `
        This can be used for SSR to set a default width for the chart.

        It's going to be adjusted once mounted in the DOM.
    `,
    flavors,
})

export const chartHeight = (flavors: Flavor[], group = DIMENSIONS_GROUP): ChartProperty => ({
    key: 'height',
    group,
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

export const chartDefaultHeight = (flavors: Flavor[], group = DIMENSIONS_GROUP): ChartProperty => ({
    key: 'defaultHeight',
    group,
    type: 'number',
    required: false,
    help: 'Chart default height for responsive component.',
    description: `
        This can be used for SSR to set a default height for the chart.

        It's going to be adjusted once mounted in the DOM.
    `,
    flavors,
})

export const chartDebounceResize = (
    flavors: Flavor[],
    group = DIMENSIONS_GROUP
): ChartProperty => ({
    key: 'debounceResize',
    group,
    type: 'number (ms)',
    required: false,
    help: 'Debounce `width`/`height` updates for responsive component.',
    description: `
        Chart dimensions updates requires to recompute the layout,
        which can be pretty expensive.
    `,
    flavors,
})

export const chartOnResize = (flavors: Flavor[], group = DIMENSIONS_GROUP): ChartProperty => ({
    key: 'onResize',
    group,
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

export const chartMargin = (flavors: Flavor[], group = DIMENSIONS_GROUP): ChartProperty => ({
    key: 'margin',
    group,
    help: 'Chart margin.',
    type: 'object',
    required: false,
    flavors,
    control: { type: 'margin' },
})

export const pixelRatio = (group = DIMENSIONS_GROUP): ChartProperty => ({
    key: 'pixelRatio',
    flavors: ['canvas'],
    help: `Adjust pixel ratio, useful for HiDPI screens.`,
    required: false,
    defaultValue: 'Depends on device',
    type: `number`,
    group,
    control: {
        type: 'range',
        min: 1,
        max: 2,
    },
})

export const chartDimensions = (
    flavors: Flavor[],
    {
        responsive = true,
        group = DIMENSIONS_GROUP,
    }: {
        responsive?: boolean
        group?: string
    } = {}
): ChartProperty[] => {
    const properties: ChartProperty[] = [chartWidth(flavors)]
    if (responsive) {
        properties.push(chartDefaultWidth(flavors, group))
    }

    properties.push(chartHeight(flavors, group))
    if (responsive) {
        properties.push(chartDefaultHeight(flavors, group))
        properties.push(chartDebounceResize(flavors, group))
        properties.push(chartOnResize(flavors, group))
    }

    if (flavors.includes('canvas')) {
        properties.push(pixelRatio(group))
    }

    properties.push(chartMargin(flavors, group))

    return properties
}
