import { useCallback, MouseEvent, FocusEvent } from 'react'
import { SpringValue, Interpolation, animated } from '@react-spring/web'
import { DatumWithArcAndColor } from './types'

export type ArcMouseHandler<Datum extends DatumWithArcAndColor> = (
    datum: Datum,
    event: MouseEvent<SVGPathElement>
) => void

export type ArcKeyboardHandler<Datum extends DatumWithArcAndColor> = (
    datum: Datum,
    event: FocusEvent<SVGPathElement>
) => void

export interface ArcShapeProps<Datum extends DatumWithArcAndColor> {
    datum: Datum
    style: {
        opacity: SpringValue<number>
        color: SpringValue<string>
        borderWidth: number
        borderColor: SpringValue<string>
        path: Interpolation<string>
    }
    onClick?: ArcMouseHandler<Datum>
    onMouseDown?: ArcMouseHandler<Datum>
    onMouseUp?: ArcMouseHandler<Datum>
    onMouseEnter?: ArcMouseHandler<Datum>
    onMouseMove?: ArcMouseHandler<Datum>
    onMouseLeave?: ArcMouseHandler<Datum>
    onFocus?: ArcKeyboardHandler<Datum>
    onBlur?: ArcKeyboardHandler<Datum>
}

/**
 * A simple arc component to be used typically with an `ArcsLayer`.
 *
 * Please note that the component accepts `SpringValue`s instead of
 * regular values to support animations.
 */
export const ArcShape = <Datum extends DatumWithArcAndColor>({
    datum,
    style,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
}: ArcShapeProps<Datum>) => {
    const handleClick = useCallback(
        (event: MouseEvent<SVGPathElement>) => onClick?.(datum, event),
        [onClick, datum]
    )

    const handleMouseEnter = useCallback(
        (event: MouseEvent<SVGPathElement>) => onMouseEnter?.(datum, event),
        [onMouseEnter, datum]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent<SVGPathElement>) => onMouseMove?.(datum, event),
        [onMouseMove, datum]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent<SVGPathElement>) => onMouseLeave?.(datum, event),
        [onMouseLeave, datum]
    )

    const handleMouseDown = useCallback(
        (event: MouseEvent<SVGPathElement>) => onMouseDown?.(datum, event),
        [onMouseDown, datum]
    )
    const handleMouseUp = useCallback(
        (event: MouseEvent<SVGPathElement>) => onMouseUp?.(datum, event),
        [onMouseUp, datum]
    )
    const handleFocus = useCallback(
        (event: FocusEvent<SVGPathElement>) => onFocus?.(datum, event),
        [onFocus, datum]
    )
    const handleBlur = useCallback(
        (event: FocusEvent<SVGPathElement>) => onBlur?.(datum, event),
        [onBlur, datum]
    )

    return (
        <animated.path
            d={style.path}
            opacity={style.opacity}
            fill={datum.fill || style.color}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
            onClick={onClick ? handleClick : undefined}
            onMouseDown={onMouseDown ? handleMouseDown : undefined}
            onMouseUp={onMouseUp ? handleMouseUp : undefined}
            onMouseEnter={onMouseEnter ? handleMouseEnter : undefined}
            onMouseMove={onMouseMove ? handleMouseMove : undefined}
            onMouseLeave={onMouseLeave ? handleMouseLeave : undefined}
            onFocus={onFocus ? handleFocus : undefined}
            onBlur={onBlur ? handleBlur : undefined}
            focusable={onFocus || onBlur ? true : undefined}
            tabIndex={onFocus || onBlur ? 0 : undefined}
        />
    )
}
