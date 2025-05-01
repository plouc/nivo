import { ChartProperty, Flavor } from '../../types'

export const role = (flavors: Flavor[], defaults?: any): ChartProperty => ({
    key: 'role',
    group: 'Accessibility',
    type: 'string',
    required: false,
    help: 'Main element role attribute.',
    flavors,
    defaultValue: defaults ? defaults.role : undefined,
})

export const ariaLabel = (flavors: Flavor[], defaults?: any): ChartProperty => ({
    key: 'ariaLabel',
    group: 'Accessibility',
    type: 'string',
    required: false,
    help: 'Main element [aria-label](https://www.w3.org/TR/wai-aria/#aria-label).',
    flavors,
    defaultValue: defaults ? defaults.ariaLabel : undefined,
})

export const ariaLabelledBy = (flavors: Flavor[], defaults?: any): ChartProperty => ({
    key: 'ariaLabelledBy',
    group: 'Accessibility',
    type: 'string',
    required: false,
    help: 'Main element [aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby).',
    flavors,
    defaultValue: defaults ? defaults.ariaLabelledBy : undefined,
})

export const ariaDescribedBy = (flavors: Flavor[], defaults?: any): ChartProperty => ({
    key: 'ariaDescribedBy',
    group: 'Accessibility',
    type: 'string',
    required: false,
    help: 'Main element [aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby).',
    flavors,
    defaultValue: defaults ? defaults.ariaDescribedBy : undefined,
})

export const commonAccessibilityProps = (flavors: Flavor[], defaults?: any): ChartProperty[] => [
    role(flavors, defaults),
    ariaLabel(flavors, defaults),
    ariaLabelledBy(flavors, defaults),
    ariaDescribedBy(flavors, defaults),
]
