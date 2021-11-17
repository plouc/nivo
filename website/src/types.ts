export type Flavor = 'svg' | 'html' | 'canvas' | 'api'

export interface ChartMeta {
    package: string
    tags: string[]
    description: string
    stories: {
        label: string
        link: string
    }[]
}

export interface SwitchControlAttrs {
    controlType: 'switch'
}
export type SwitchProperty = BaseChartProperty & SwitchControlAttrs

export interface RangeControlAttrs {
    controlType: 'range'
    controlOptions: {
        min: number
        max: number
        step?: number
        unit?: 'px' | '°'
    }
}
export type RangeProperty = BaseChartProperty & RangeControlAttrs

export interface MotionConfigControlAttrs {
    controlType: 'motionConfig'
}
export type MotionConfigProperty = BaseChartProperty & MotionConfigControlAttrs

export interface BoxAnchorControlAttrs {
    controlType: 'boxAnchor'
}
export type BoxAnchorProperty = BaseChartProperty & BoxAnchorControlAttrs

export interface ChoicesControlAttrs {
    controlType: 'choices'
    controlOptions: {
        choices: {
            label: string
            value: string
        }[]
    }
}
export type ChoicesProperty = BaseChartProperty & ChoicesControlAttrs

export interface RadioControlAttrs {
    controlType: 'radio'
    controlOptions: {
        choices: {
            label: string
            value: string
        }[]
    }
}
export type RadioProperty = BaseChartProperty & RadioControlAttrs

export interface ValueFormatControlAttrs {
    controlType: 'valueFormat'
}
export type ValueFormatProperty = BaseChartProperty & ValueFormatControlAttrs

export interface MarginControlAttrs {
    controlType: 'margin'
}
export type MarginProperty = BaseChartProperty & MarginControlAttrs

export interface OpacityControlAttrs {
    controlType: 'opacity'
}
export type OpacityChartProperty = BaseChartProperty & OpacityControlAttrs

export interface LineWidthControlAttrs {
    controlType: 'lineWidth'
    controlOptions?: {
        step?: number
    }
}
export type LineWidthProperty = BaseChartProperty & LineWidthControlAttrs

export interface BlendModeControlAttrs {
    controlType: 'blendMode'
}
export type BlendModeProperty = BaseChartProperty & BlendModeControlAttrs

export interface InheritedColorControlAttrs {
    controlType: 'inheritedColor'
    controlOptions?: {
        inheritableProperties?: string[]
    }
}
export type InheritedColorProperty = BaseChartProperty & InheritedColorControlAttrs

export interface OrdinalColorsControlAttrs {
    controlType: 'ordinalColors'
}
export type OrdinalColorsProperty = BaseChartProperty & OrdinalColorsControlAttrs

export interface NumberArrayControlAttrs {
    controlType: 'numberArray'
    controlOptions: {
        unit?: 'px' | '°'
        items: {
            label: string
            min?: number
            max?: number
            step?: number
        }[]
    }
}
export type NumberArrayProperty = BaseChartProperty & NumberArrayControlAttrs

export interface ColorPickerControlAttrs {
    controlType: 'colorPicker'
}
export type ColorPickerProperty = BaseChartProperty & ColorPickerControlAttrs

export interface QuantizeColorsControlAttrs {
    controlType: 'quantizeColors'
}
export type QuantizeColorsProperty = BaseChartProperty & QuantizeColorsControlAttrs

export interface SwitchableRangeControlAttrs {
    controlType: 'switchableRange'
    controlOptions: {
        disabledValue: string
        defaultValue: number
        min: number
        max: number
    }
}
export type SwitchableRangeProperty = BaseChartProperty & SwitchableRangeControlAttrs

export interface AngleControlAttrs {
    controlType: 'angle'
    controlOptions: {
        start?: number
        min?: number
        max?: number
        step?: number
    }
}
export type AngleChartProperty = BaseChartProperty & AngleControlAttrs

export interface ObjectControlAttrs {
    controlType: 'object'
    controlOptions: {
        props: (
            | Omit<BaseChartProperty, 'group'>
            | Omit<SwitchProperty, 'group'>
            | Omit<RangeProperty, 'group'>
            | Omit<AngleChartProperty, 'group'>
        )[]
    }
}
export type ObjectChartProperty = BaseChartProperty & ObjectControlAttrs

export interface BaseChartProperty {
    key: string
    group: string
    // type of the property, preferably expressed with TypeScript notation
    type: string
    // will be parsed in Markdown and supports links
    help: string
    // will be parsed in Markdown and supports links
    description?: string
    // assumed to be optional by default
    required: boolean
    // default property value as defined for the component,
    // default props should be exported by nivo packages
    defaultValue?: any
    flavors: Flavor[]
    // disable the control when the current chart flavor doesn't match
    enableControlForFlavors?: Flavor[]
    // not used at the moment, indicate that a property is just used
    // for the demo and not part of the component props.
    excludeFromDoc?: boolean
}

export type ChartProperty =
    | BaseChartProperty
    | SwitchProperty
    | RangeProperty
    | MotionConfigProperty
    | BoxAnchorProperty
    | ChoicesProperty
    | RadioProperty
    | ValueFormatProperty
    | MarginProperty
    | OpacityChartProperty
    | LineWidthProperty
    | BlendModeProperty
    | InheritedColorProperty
    | OrdinalColorsProperty
    | NumberArrayProperty
    | ColorPickerProperty
    | QuantizeColorsProperty
    | SwitchableRangeProperty
    | ObjectChartProperty
    | AngleChartProperty
