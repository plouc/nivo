import {
    FunctionComponent,
    MouseEventHandler,
    FocusEventHandler,
    KeyboardEventHandler,
    WheelEventHandler,
    AriaAttributes,
    Ref,
    RefObject,
} from 'react'
import { Interpolation, SpringValue } from '@react-spring/web'
import { EventMap, InteractionHandlers } from '@nivo/core'
import { BorderRadiusCorners } from '@nivo/theming'

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

export interface NodeA11yProps {
    isFocusable?: boolean
    role?: string
    label?: AriaAttributes['aria-label']
    labelledBy?: AriaAttributes['aria-labelledby']
    describedBy?: AriaAttributes['aria-describedby']
    level?: AriaAttributes['aria-level']
    hidden?: AriaAttributes['aria-hidden']
}

export interface NodeWithRect {
    id: string | number
    rect: Rect
    a11y?: NodeA11yProps
}

export interface NodeWithRectAndColor extends NodeWithRect {
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

type NodeEventMap = Pick<
    EventMap,
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'onDoubleClick'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyDown'
    | 'onWheel'
    | 'onContextMenu'
>

export type NodeInteractionHandlers<Node extends NodeWithRectAndColor> = InteractionHandlers<
    Node,
    NodeEventMap
>

export interface RectNodeComponentProps<Node extends NodeWithRectAndColor> {
    ref?: Ref<RectNodeHandle>
    node: Node
    style: {
        progress: SpringValue<number>
        x: SpringValue<number>
        y: SpringValue<number>
        transform: Interpolation<string, string>
        width: Interpolation<number, number>
        height: Interpolation<number, number>
        color: SpringValue<string>
        opacity: SpringValue<number>
        borderRadius: BorderRadiusCorners
        borderWidth: number
        borderColor: SpringValue<string>
    }
    isInteractive: boolean
    onMouseEnter?: MouseEventHandler
    onMouseMove?: MouseEventHandler
    onMouseLeave?: MouseEventHandler
    onClick?: MouseEventHandler
    onDoubleClick?: MouseEventHandler
    onFocus?: FocusEventHandler
    onBlur?: FocusEventHandler
    onKeyDown?: KeyboardEventHandler
    onContextMenu?: MouseEventHandler
    onWheel?: WheelEventHandler
    testId?: string
}
export type RectNodeComponent<Node extends NodeWithRectAndColor> = FunctionComponent<
    RectNodeComponentProps<Node>
>
