import { ObjectControlConfig } from './ObjectControl'
import { OpacityControlConfig } from './OpacityControl'
import { RangeControlConfig } from './RangeControl'
import { SwitchControlConfig } from './SwitchControl'
import { TextControlConfig } from './TextControl'

/**
 * Implementations that nivo charts might support.
 */
export type ChartFlavor = 'svg' | 'html' | 'canvas' | 'api'

/**
 * This can be used to dynamically change an attribute of a control
 * based on the current chart flavor.
 */
export type ChartFlavorAwareAttribute<T> = T | Partial<Record<ChartFlavor, T>>

/**
 * A context passed down to nested controls.
 */
export interface ControlContext {
    // Indicates the flavors available in the top-most control.
    flavors?: ChartFlavor[]
    // Indicates the current flavor.
    currentFlavor?: ChartFlavor
    path: string[]
}

export type ControlConfig =
    | ObjectControlConfig
    | OpacityControlConfig
    | RangeControlConfig
    | SwitchControlConfig
    | TextControlConfig

export interface ChartProperty<C extends ControlConfig, P = Record<string, unknown>> {
    name: string
    group?: string
    // type of the property, preferably expressed with TypeScript notation
    type: ChartFlavorAwareAttribute<string>
    // will be parsed in Markdown and supports links
    help?: string
    // will be parsed in Markdown and supports links
    description?: ChartFlavorAwareAttribute<string>
    // assumed to be optional by default
    required?: boolean
    // default property value as defined for the component,
    // default props should be exported by nivo packages
    defaultValue?: any
    flavors?: ChartFlavor[]
    // disable the control when the current chart flavor doesn't match
    enableControlForFlavors?: ChartFlavor[]
    control: C
    when?: (props: P) => boolean
}
