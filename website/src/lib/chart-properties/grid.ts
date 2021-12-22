import { ChartProperty, Flavor } from '../../types'

const defaultGroup = 'Grid & Axes'

export const enableGridAxis = ({
    axis,
    group = defaultGroup,
    flavors,
    defaultValue,
}: {
    axis: 'x' | 'y'
    group?: string
    flavors: Flavor[]
    defaultValue?: boolean
}): ChartProperty => ({
    key: `enableGrid${axis.toUpperCase()}`,
    group,
    flavors,
    type: 'boolean',
    required: false,
    defaultValue,
    help: `Enable/disable ${axis} grid.`,
    control: { type: 'switch' },
})

export const gridAxisValues = ({
    axis,
    group = defaultGroup,
    flavors,
}: {
    axis: 'x' | 'y'
    group?: string
    flavors: Flavor[]
}): ChartProperty => ({
    key: `grid${axis.toUpperCase()}Values`,
    group,
    help: `Specify values to use for ${axis === 'x' ? 'vertical' : 'horizontal'} grid lines.`,
    type: '(number | string)[]',
    flavors,
    required: false,
})

export const chartGrid = ({
    x = true,
    xDefault,
    y = true,
    yDefault,
    values = false,
    group = defaultGroup,
    flavors,
}: {
    group?: string
    x?: boolean
    xDefault?: boolean
    y?: boolean
    yDefault?: boolean
    values?: boolean
    flavors: Flavor[]
}): ChartProperty[] => {
    const properties: ChartProperty[] = []

    if (x) {
        properties.push(enableGridAxis({ axis: 'x', group, flavors, defaultValue: xDefault }))
        if (values) {
            properties.push(gridAxisValues({ axis: 'x', group, flavors }))
        }
    }

    if (y) {
        properties.push(enableGridAxis({ axis: 'y', group, flavors, defaultValue: yDefault }))
        if (values) {
            properties.push(gridAxisValues({ axis: 'y', group, flavors }))
        }
    }

    return properties
}
