import { DatumValue } from '../../../types'

export interface CartesianMarkerProps<Value extends DatumValue = DatumValue> {
    axis: 'x' | 'y'
    value: Value
    lineStyle: Record<string, unknown>
    textStyle: Record<string, unknown>

    legend: string
    legendPosition:
        | 'top-left'
        | 'top'
        | 'top-right'
        | 'right'
        | 'bottom-right'
        | 'bottom'
        | 'bottom-left'
        | 'left'
    legendOffsetX: number
    legendOffsetY: number
    legendOrientation: 'horizontal' | 'vertical'
}

// Note the name here has 'Markers' with an 's'
export interface CartesianMarkersProps<
    X extends DatumValue = DatumValue,
    Y extends DatumValue = DatumValue
> {
    width: number
    height: number
    xScale: (v: X) => number
    yScale: (v: Y) => number
    markers: CartesianMarkerProps<X | Y>[]
}

export interface CartesianMarkersItemProps<
    X extends DatumValue = DatumValue,
    Y extends DatumValue = DatumValue
> extends CartesianMarkerProps<X | Y> {
    width: number
    height: number
    scale: (v: X | Y) => number
}
