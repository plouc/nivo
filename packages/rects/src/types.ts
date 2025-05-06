import {
    FunctionComponent,
    MouseEvent,
    MouseEventHandler,
    WheelEvent,
    WheelEventHandler,
} from 'react'
import { Interpolation, SpringValue } from '@react-spring/web'

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

export type RectMouseHandler<Datum extends DatumWithRectAndColor> = (
    datum: Datum,
    event: MouseEvent
) => void

export type RectWheelHandler<Datum extends DatumWithRectAndColor> = (
    datum: Datum,
    event: WheelEvent
) => void

export interface RectNodeProps<Datum extends DatumWithRectAndColor> {
    datum: Datum
    style: {
        progress: SpringValue<number>
        x: SpringValue<number>
        y: SpringValue<number>
        transform: Interpolation<string, string>
        width: Interpolation<number, number>
        height: Interpolation<number, number>
        color: SpringValue<string>
        opacity: SpringValue<number>
        borderRadius: number
        borderWidth: number
        borderColor: SpringValue<string>
    }
    isInteractive: boolean
    onMouseEnter?: MouseEventHandler
    onMouseMove?: MouseEventHandler
    onMouseLeave?: MouseEventHandler
    onClick?: MouseEventHandler
    onContextMenu?: MouseEventHandler
    onWheel?: WheelEventHandler
    testId?: string
}
export type RectNodeComponent<Datum extends DatumWithRectAndColor> = FunctionComponent<
    RectNodeProps<Datum>
>
