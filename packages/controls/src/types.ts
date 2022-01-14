export type Unit = 'px' | '°' | 'ms'

export type ControlContext = {
    path: string[]
}

export type CommonControlProps<Value> = {
    name: string
    help?: string
    description?: string
    context?: ControlContext
    value: Value
    onChange?: (value: Value) => void
}

export type RadioControlProps<Value extends string | number = string> =
    CommonControlProps<Value> & {
        type: 'radio'
        columns?: number
        choices: {
            label: string
            value: Value
        }[]
    }

export type RangeControlProps = CommonControlProps<number> & {
    type: 'range'
    min: number
    max: number
    step?: number
    unit?: Unit
}

export type SwitchControlProps = CommonControlProps<boolean> & {
    type: 'switch'
}

export type TextControlProps = CommonControlProps<string> & {
    type: 'text'
    disabled?: boolean
}

export type AngleControlProps = CommonControlProps<number> & {
    type: 'angle'
    start?: number
    min?: number
    max?: number
}

export type ObjectControlProps<Obj extends Record<string, any> = Record<string, any>> =
    CommonControlProps<Obj> & {
        type: 'object'
        props: ObjectControlPropsCollection<Obj>
    }

export type OpacityControlProps = CommonControlProps<number> & {
    type: 'opacity'
}

export type LineWidthControlProps = CommonControlProps<number> & {
    type: 'line_width'
    step?: number
}

export type BoxAnchor =
    | 'center'
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'

export type BoxAnchorControlProps = CommonControlProps<BoxAnchor> & {
    type: 'box_anchor'
}

export type ColorControlProps = CommonControlProps<number> & {
    type: 'color'
}

export type ControlProps<Value = any> =
    | AngleControlProps
    | BoxAnchorControlProps
    | ColorControlProps
    | LineWidthControlProps
    | ObjectControlProps<Extract<Value, Record<string, any>>>
    | OpacityControlProps
    | RadioControlProps<Extract<Value, string | number>>
    | RangeControlProps
    | SwitchControlProps
    | TextControlProps

type NestObjectControlProps<Prop extends ControlProps, Obj extends Record<string, any>> = Omit<
    Prop,
    'name' | 'value' | 'onChange'
> & { name: Extract<keyof Obj, string> }
export type ObjectNestedControlProps<Obj extends Record<string, any>, Value = any> =
    | NestObjectControlProps<AngleControlProps, Obj>
    | NestObjectControlProps<BoxAnchorControlProps, Obj>
    | NestObjectControlProps<ColorControlProps, Obj>
    | NestObjectControlProps<LineWidthControlProps, Obj>
    | NestObjectControlProps<ObjectControlProps<Extract<Value, Record<string, any>>>, Obj>
    | NestObjectControlProps<OpacityControlProps, Obj>
    | NestObjectControlProps<RadioControlProps<Extract<Value, string | number>>, Obj>
    | NestObjectControlProps<RangeControlProps, Obj>
    | NestObjectControlProps<SwitchControlProps, Obj>
    | NestObjectControlProps<TextControlProps, Obj>

export type ObjectControlPropsCollection<
    Obj extends Record<string, any>,
    Value = any
> = ObjectNestedControlProps<Obj, Value>[]
