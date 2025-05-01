export interface Rect {
    height: number
    /** size in percentage from the root node */
    percentage: number
    transformX: number
    transformY: number
    width: number
    x0: number
    x1: number
    y0: number
    y1: number
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
