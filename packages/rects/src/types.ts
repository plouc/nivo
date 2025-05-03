export interface Rect {
    x: number
    y: number
    width: number
    height: number
}

export interface DatumWithRect {
    id: string | number
    rect: Rect
}

export interface DatumWithRectAndColor extends DatumWithRect {
    color: string
    /** When using patterns/gradients */
    fill?: string
}
