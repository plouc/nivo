type ScaleInput = number | string | Date

export interface CartesianMarkerProps {
    axis: 'x' | 'y'
    value: number | string | Date
    //lineStyle: PropTypes.object
    lineStyle: any
    //textStyle: PropTypes.object
    textStyle: any

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

export interface CartesianMarkersProps {
    width: number
    height: number
    xScale: (v: ScaleInput) => number
    yScale: (v: ScaleInput) => number
    markers: CartesianMarkerProps[]
}

export interface CartesianMarkersItemProps extends CartesianMarkerProps {
    width: number
    height: number
    scale: (v: ScaleInput) => number
}
