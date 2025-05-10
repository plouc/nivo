import { forwardRef, Ref, useImperativeHandle, useRef, ReactElement } from 'react'
import { animated } from '@react-spring/web'
import { NodeWithRectAndColor, RectNodeComponentProps, RectNodeHandle } from './types'

const InnerRectNodeSvg = <Node extends NodeWithRectAndColor>(
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
    }: RectNodeComponentProps<Node>,
    ref: Ref<RectNodeHandle>
) => {
    // Expose the focus method to the parent component.
    const elementRef = useRef<SVGRectElement>(null)
    useImperativeHandle(ref, () => ({
        focus: () => {
            elementRef.current?.focus()
        },
    }))

    return (
        <animated.rect
            ref={elementRef}
            width={style.width}
            height={style.height}
            transform={style.transform}
            rx={style.borderRadius}
            ry={style.borderRadius}
            opacity={style.opacity}
            fill={node.fill || style.color}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
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
        />
    )
}

export const RectNodeSvg = forwardRef(InnerRectNodeSvg) as <Node extends NodeWithRectAndColor>(
    props: RectNodeComponentProps<Node> & { ref?: Ref<RectNodeHandle> }
) => ReactElement
