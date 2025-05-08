import { forwardRef, Ref, useImperativeHandle, useRef, ReactElement } from 'react'
import { animated } from '@react-spring/web'
import { DatumWithRectAndColor, RectNodeProps, RectNodeHandle } from './types'

const InnerRectNodeSvg = <Datum extends DatumWithRectAndColor>(
    {
        datum,
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
    }: RectNodeProps<Datum>,
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
            fill={datum.fill || style.color}
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
            tabIndex={datum.a11y?.isFocusable ? 0 : undefined}
            role={datum.a11y?.role}
            aria-label={datum.a11y?.label}
            aria-labelledby={datum.a11y?.labelledBy}
            aria-describedby={datum.a11y?.describedBy}
            aria-level={datum.a11y?.level}
            data-testid={testId}
        />
    )
}

export const RectNodeSvg = forwardRef(InnerRectNodeSvg) as <Datum extends DatumWithRectAndColor>(
    props: RectNodeProps<Datum> & { ref?: Ref<RectNodeHandle> }
) => ReactElement
