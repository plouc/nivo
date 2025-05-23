import {
    useMemo,
    MouseEvent,
    FocusEvent,
    WheelEvent,
    KeyboardEvent,
    Ref,
    forwardRef,
    ReactElement,
} from 'react'
import { SpringValue, Interpolation } from '@react-spring/web'
import { BorderRadiusCorners } from '@nivo/theming'
import {
    NodeWithRectAndColor,
    RectNodeComponent,
    NodeInteractionHandlers,
    RectNodeComponentProps,
    RectNodeHandle,
} from './types'

export interface RectNodeWrapperProps<Node extends NodeWithRectAndColor>
    extends NodeInteractionHandlers<Node> {
    nodeComponent: RectNodeComponent<Node>
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
    testId?: string
}

/**
 * This component acts as a wrapper for a `Rect` component.
 *
 * It is used to bind mouse events to ease the process of
 * creating custom rectangles without having to re-implement
 * the same logic in the custom component.
 *
 * This is used to create both SVG and HTML implementations
 * of some charts.
 */
const InnerRectNodeWrapper = <Node extends NodeWithRectAndColor>(
    {
        nodeComponent: Node,
        node,
        style,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        onDoubleClick,
        onFocus,
        onBlur,
        onKeyDown,
        onWheel,
        onContextMenu,
        testId,
    }: RectNodeWrapperProps<Node>,
    ref: Ref<RectNodeHandle>
) => {
    const eventHandlers = useMemo(() => {
        const handlers: Pick<RectNodeComponentProps<Node>, keyof NodeInteractionHandlers<Node>> = {}
        if (!isInteractive) return handlers

        if (onMouseEnter) {
            handlers.onMouseEnter = (event: MouseEvent) => {
                onMouseEnter(node, event)
            }
        }
        if (onMouseMove) {
            handlers.onMouseMove = (event: MouseEvent) => {
                onMouseMove(node, event)
            }
        }
        if (onMouseLeave) {
            handlers.onMouseLeave = (event: MouseEvent) => {
                onMouseLeave(node, event)
            }
        }
        if (onClick) {
            handlers.onClick = (event: MouseEvent) => {
                onClick(node, event)
            }
        }
        if (onDoubleClick) {
            handlers.onDoubleClick = (event: MouseEvent) => {
                onDoubleClick(node, event)
            }
        }
        if (onFocus) {
            handlers.onFocus = (event: FocusEvent) => {
                onFocus(node, event)
            }
        }
        if (onBlur) {
            handlers.onBlur = (event: FocusEvent) => {
                onBlur(node, event)
            }
        }
        if (onKeyDown) {
            handlers.onKeyDown = (event: KeyboardEvent) => {
                onKeyDown(node, event)
            }
        }
        if (onContextMenu) {
            handlers.onContextMenu = (event: MouseEvent) => {
                onContextMenu(node, event)
            }
        }
        if (onWheel) {
            handlers.onWheel = (event: WheelEvent) => {
                onWheel(node, event)
            }
        }

        return handlers
    }, [
        isInteractive,
        node,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        onDoubleClick,
        onFocus,
        onBlur,
        onKeyDown,
        onContextMenu,
        onWheel,
    ])

    return (
        <Node
            ref={ref}
            node={node}
            style={style}
            isInteractive={isInteractive}
            {...eventHandlers}
            testId={testId}
        />
    )
}

export const RectNodeWrapper = forwardRef(InnerRectNodeWrapper) as <
    Node extends NodeWithRectAndColor,
>(
    props: RectNodeWrapperProps<Node> & { ref?: Ref<RectNodeHandle> }
) => ReactElement
