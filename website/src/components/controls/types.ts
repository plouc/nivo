import { AnnotationMatcher } from '@nivo/annotations'
import { ChartProperty } from '../../types'

export interface SwitchControlAttrs {
    type: 'switch'
}

export interface RangeControlConfig {
    type: 'range'
    min: number
    max: number
    step?: number
    unit?: 'px' | '°' | 'ms'
}

export interface MotionConfigControlConfig {
    type: 'motionConfig'
}

export interface BoxAnchorControlConfig {
    type: 'boxAnchor'
}

export interface ChoicesControlConfig {
    type: 'choices'
    disabled?: boolean
    choices: {
        label: string
        value: string | boolean
    }[]
}

export interface RadioControlConfig {
    type: 'radio'
    choices: {
        label: string
        value: string
    }[]
}

export interface ValueFormatControlConfig {
    type: 'valueFormat'
}

export interface MarginControlConfig {
    type: 'margin'
}

export interface OpacityControlConfig {
    type: 'opacity'
}

export interface LineWidthControlConfig {
    type: 'lineWidth'
    step?: number
}

export interface BlendModeControlConfig {
    type: 'blendMode'
}

export interface InheritedColorControlConfig {
    type: 'inheritedColor'
    inheritableProperties?: string[]
    defaultCustomColor?: string
    defaultThemeProperty?: string
    defaultFrom?: string
}

export interface OrdinalColorsControlConfig {
    type: 'ordinalColors'
}

export interface NumberArrayControlConfig {
    type: 'numberArray'
    unit?: 'px' | '°' | 'ms'
    items: {
        label: string
        min?: number
        max?: number
        step?: number
    }[]
}

export interface ColorPickerControlConfig {
    type: 'colorPicker'
}

export interface QuantizeColorsControlConfig {
    type: 'quantizeColors'
}

export interface SwitchableRangeControlConfig {
    type: 'switchableRange'
    unit?: 'px' | '°' | 'ms'
    disabledValue: string
    defaultValue: number
    min: number
    max: number
    step?: number
}

export interface AngleControlConfig {
    type: 'angle'
    start?: number
    min?: number
    max?: number
    step?: number
}

export interface ObjectControlConfig {
    type: 'object'
    props: Omit<ChartProperty, 'group'>[]
    isOpenedByDefault?: boolean
}

export interface ArrayControlConfig<Item = object> {
    type: 'array'
    props: Omit<ChartProperty, 'group'>[]
    shouldCreate: boolean
    addLabel?: string
    shouldRemove: boolean
    removeLabel?: string
    defaults?: Item
    getItemTitle?: (index: number, item: Item) => string
}

export interface TextControlConfig {
    type: 'text'
    disabled?: boolean
}

export interface ColorsControlConfig {
    type: 'colors'
    includeSequential?: boolean
}

export interface AnnotationsControlConfig {
    type: 'annotations'
    createDefaults: AnnotationMatcher<any>
}

export type ControlConfig =
    | SwitchControlAttrs
    | RangeControlConfig
    | MotionConfigControlConfig
    | BoxAnchorControlConfig
    | ChoicesControlConfig
    | RadioControlConfig
    | ValueFormatControlConfig
    | MarginControlConfig
    | OpacityControlConfig
    | LineWidthControlConfig
    | BlendModeControlConfig
    | InheritedColorControlConfig
    | OrdinalColorsControlConfig
    | NumberArrayControlConfig
    | ColorPickerControlConfig
    | QuantizeColorsControlConfig
    | SwitchableRangeControlConfig
    | AngleControlConfig
    | ObjectControlConfig
    | ArrayControlConfig
    | TextControlConfig
    | ColorsControlConfig
    | AnnotationsControlConfig
