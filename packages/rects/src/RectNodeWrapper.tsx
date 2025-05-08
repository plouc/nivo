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
import {
    DatumWithRectAndColor,
    RectNodeComponent,
    RectMouseHandler,
    RectKeyboardHandler,
    RectWheelHandler,
    RectFocusHandler,
    RectNodeProps,
    RectNodeHandle,
} from './types'

export interface RectNodeWrapperProps<Datum extends DatumWithRectAndColor> {
    nodeComponent: RectNodeComponent<Datum>
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
    onClick?: RectMouseHandler<Datum>
    onMouseEnter?: RectMouseHandler<Datum>
    onMouseLeave?: RectMouseHandler<Datum>
    onMouseMove?: RectMouseHandler<Datum>
    onFocus?: RectFocusHandler<Datum>
    onBlur?: RectFocusHandler<Datum>
    onKeyDown?: RectKeyboardHandler<Datum>
    onContextMenu?: RectMouseHandler<Datum>
    onWheel?: RectWheelHandler<Datum>
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
const InnerRectNodeWrapper = <Datum extends DatumWithRectAndColor>(
    {
        nodeComponent: Node,
        datum,
        style,
        isInteractive,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        onFocus,
        onBlur,
        onKeyDown,
        onWheel,
        onContextMenu,
        testId,
    }: RectNodeWrapperProps<Datum>,
    ref: Ref<RectNodeHandle>
) => {
    const eventHandlers = useMemo(() => {
        const handlers: Pick<
            RectNodeProps<Datum>,
            | 'onMouseEnter'
            | 'onMouseMove'
            | 'onMouseLeave'
            | 'onClick'
            | 'onFocus'
            | 'onBlur'
            | 'onKeyDown'
            | 'onContextMenu'
            | 'onWheel'
        > = {}
        if (!isInteractive) return handlers

        if (onMouseEnter) {
            handlers.onMouseEnter = (event: MouseEvent) => {
                onMouseEnter(datum, event)
            }
        }
        if (onMouseMove) {
            handlers.onMouseMove = (event: MouseEvent) => {
                onMouseMove(datum, event)
            }
        }
        if (onMouseLeave) {
            handlers.onMouseLeave = (event: MouseEvent) => {
                onMouseLeave(datum, event)
            }
        }
        if (onClick) {
            handlers.onClick = (event: MouseEvent) => {
                onClick(datum, event)
            }
        }
        if (onFocus) {
            handlers.onFocus = (event: FocusEvent) => {
                onFocus(datum, event)
            }
        }
        if (onBlur) {
            handlers.onBlur = (event: FocusEvent) => {
                onBlur(datum, event)
            }
        }
        if (onKeyDown) {
            handlers.onKeyDown = (event: KeyboardEvent) => {
                onKeyDown(datum, event)
            }
        }
        if (onContextMenu) {
            handlers.onContextMenu = (event: MouseEvent) => {
                onContextMenu(datum, event)
            }
        }
        if (onWheel) {
            handlers.onWheel = (event: WheelEvent) => {
                onWheel(datum, event)
            }
        }

        return handlers
    }, [
        isInteractive,
        datum,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        onFocus,
        onBlur,
        onKeyDown,
        onContextMenu,
        onWheel,
    ])

    return (
        <Node
            ref={ref}
            datum={datum}
            style={style}
            isInteractive={isInteractive}
            {...eventHandlers}
            testId={testId}
        />
    )
}

export const RectNodeWrapper = forwardRef(InnerRectNodeWrapper) as <
    Datum extends DatumWithRectAndColor,
>(
    props: RectNodeWrapperProps<Datum> & { ref?: Ref<RectNodeHandle> }
) => ReactElement
