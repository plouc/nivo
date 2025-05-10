import { forwardRef, Ref, useImperativeHandle, useRef, ReactElement } from 'react'
import { PropsWithChildren } from 'react'
import { animated } from '@react-spring/web'
import { NodeWithRectAndColor, RectNodeHandle, RectNodeComponentProps } from './types'

const InnerRectNodeHtml = <Node extends NodeWithRectAndColor>(
    {
        node,
        style,
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
        children,
    }: PropsWithChildren<RectNodeComponentProps<Node>>,
    ref: Ref<RectNodeHandle>
) => {
    // Expose the focus method to the parent component.
    const elementRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => ({
        focus: () => {
            elementRef.current?.focus()
        },
    }))

    const { x, y, color, transform, progress, ...extraStyle } = style

    return (
        <animated.div
            ref={elementRef}
            style={{
                position: 'absolute',
                borderStyle: 'solid',
                boxSizing: 'border-box',
                left: x,
                top: y,
                backgroundColor: style.color,
                ...extraStyle,
            }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onWheel={onWheel}
            onContextMenu={onContextMenu}
            tabIndex={node.a11y?.isFocusable ? 0 : undefined}
            role={node.a11y?.role}
            aria-label={node.a11y?.label}
            aria-labelledby={node.a11y?.labelledBy}
            aria-describedby={node.a11y?.describedBy}
            aria-hidden={node.a11y?.hidden}
            aria-level={node.a11y?.level}
            data-testid={testId}
        >
            {children}
        </animated.div>
    )
}

export const RectNodeHtml = forwardRef(InnerRectNodeHtml) as <Node extends NodeWithRectAndColor>(
    props: RectNodeComponentProps<Node> & { ref?: Ref<RectNodeHandle> }
) => ReactElement
