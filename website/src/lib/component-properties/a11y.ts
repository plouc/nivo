import { BaseChartProperty, Flavor } from '../../types'

const group = 'Accessibility'

export const role = (flavors: Flavor[]): BaseChartProperty => ({
    key: 'role',
    group,
    type: 'string',
    required: false,
    help: 'Main element role attribute.',
    flavors,
})

export const ariaLabel = (flavors: Flavor[]): BaseChartProperty => ({
    key: 'ariaLabel',
    group,
    type: 'string',
    required: false,
    help: 'Main element [aria-label](https://www.w3.org/TR/wai-aria/#aria-label).',
    flavors,
})

export const ariaLabelledBy = (flavors: Flavor[]): BaseChartProperty => ({
    key: 'ariaLabelledBy',
    group,
    type: 'string',
    required: false,
    help: 'Main element [aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby).',
    flavors,
})

export const ariaDescribedBy = (flavors: Flavor[]): BaseChartProperty => ({
    key: 'ariaDescribedBy',
    group,
    type: 'string',
    required: false,
    help: 'Main element [aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby).',
    flavors,
})

export const a11yCommonProps = (flavors: Flavor[]): BaseChartProperty[] => [
    role(flavors),
    ariaLabel(flavors),
    ariaLabelledBy(flavors),
    ariaDescribedBy(flavors),
]
