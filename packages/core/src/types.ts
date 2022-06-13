export type DatumValue = string | number | Date

export interface Dimensions {
    height: number
    width: number
}

export type Margin = {
    bottom: number
    left: number
    right: number
    top: number
}

export type Bounds = {
    left: number
    top: number
    width: number
    height: number
}

export type Box = Partial<Margin>

export type BoxAlign =
    | 'center'
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'
