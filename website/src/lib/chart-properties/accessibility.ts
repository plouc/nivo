import { ChartProperty, Flavor } from '../../types'

export const role = (flavors: Flavor[]): ChartProperty => ({
    key: 'role',
    group: 'Accessibility',
    type: 'string',
    required: false,
    help: 'Main element role attribute.',
    flavors,
})

export const ariaLabel = (flavors: Flavor[]): ChartProperty => ({
    key: 'ariaLabel',
    group: 'Accessibility',
    type: 'string',
    required: false,
    help: 'Main element [aria-label](https://www.w3.org/TR/wai-aria/#aria-label).',
    flavors,
})

export const ariaLabelledBy = (flavors: Flavor[]): ChartProperty => ({
    key: 'ariaLabelledBy',
    group: 'Accessibility',
    type: 'string',
    required: false,
    help: 'Main element [aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby).',
    flavors,
})

export const ariaDescribedBy = (flavors: Flavor[]): ChartProperty => ({
    key: 'ariaDescribedBy',
    group: 'Accessibility',
    type: 'string',
    required: false,
    help: 'Main element [aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby).',
    flavors,
})

export const commonAccessibilityProps = (flavors: Flavor[]): ChartProperty[] => [
    role(flavors),
    ariaLabel(flavors),
    ariaLabelledBy(flavors),
    ariaDescribedBy(flavors),
]
