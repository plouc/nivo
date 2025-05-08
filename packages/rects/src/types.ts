import {
    FunctionComponent,
    MouseEvent,
    MouseEventHandler,
    FocusEvent,
    FocusEventHandler,
    KeyboardEvent,
    KeyboardEventHandler,
    WheelEvent,
    WheelEventHandler,
    AriaAttributes,
    Ref,
    RefObject,
} from 'react'
import { Interpolation, SpringValue } from '@react-spring/web'

export interface Rect {
    x: number
    y: number
    width: number
    height: number
}

export type RectNodeHandle = {
    focus: () => void
}

export type NodeRefMap = Record<string, RefObject<RectNodeHandle>>

export interface DatumA11yProps {
    isFocusable?: boolean
    role?: string
    label?: AriaAttributes['aria-label']
    labelledBy?: AriaAttributes['aria-labelledby']
    describedBy?: AriaAttributes['aria-describedby']
    level?: AriaAttributes['aria-level']
    hidden?: AriaAttributes['aria-hidden']
    disabled?: AriaAttributes['aria-disabled']
}

export interface DatumWithRect {
    id: string | number
    rect: Rect
    a11y?: DatumA11yProps
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

export type RectFocusHandler<Datum extends DatumWithRectAndColor> = (
    datum: Datum,
    event: FocusEvent
) => void

export type RectKeyboardHandler<Datum extends DatumWithRectAndColor> = (
    datum: Datum,
    event: KeyboardEvent
) => void

export type RectWheelHandler<Datum extends DatumWithRectAndColor> = (
    datum: Datum,
    event: WheelEvent
) => void

export interface RectNodeProps<Datum extends DatumWithRectAndColor> {
    ref?: Ref<RectNodeHandle>
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
    onFocus?: FocusEventHandler
    onBlur?: FocusEventHandler
    onKeyDown?: KeyboardEventHandler
    onContextMenu?: MouseEventHandler
    onWheel?: WheelEventHandler
    testId?: string
}
export type RectNodeComponent<Datum extends DatumWithRectAndColor> = FunctionComponent<
    RectNodeProps<Datum>
>
