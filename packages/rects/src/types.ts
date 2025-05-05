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

export interface Anchor {
    x: number
    y: number
}

export interface AnchorWithRect extends Anchor {
    id: string
    rect: Rect
}

export type RectTransitionMode =
    | 'reveal-up'
    | 'reveal-right'
    | 'reveal-down'
    | 'reveal-left'
    | 'center'
    | 'flow-up'
    | 'flow-right'
    | 'flow-down'
    | 'flow-left'
