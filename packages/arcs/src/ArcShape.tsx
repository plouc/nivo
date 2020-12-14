import React, { useCallback } from 'react'
import { SpringValue, Interpolation, animated } from 'react-spring'
import { DatumWithArcAndColor } from './types'

export type ArcMouseHandler<Datum extends DatumWithArcAndColor> = (
    datum: Datum,
    event: React.MouseEvent<SVGPathElement>
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
    onMouseEnter?: ArcMouseHandler<Datum>
    onMouseMove?: ArcMouseHandler<Datum>
    onMouseLeave?: ArcMouseHandler<Datum>
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
}: ArcShapeProps<Datum>) => {
    const handleClick = useCallback(event => onClick?.(datum, event), [onClick, datum])

    const handleMouseEnter = useCallback(event => onMouseEnter?.(datum, event), [
        onMouseEnter,
        datum,
    ])

    const handleMouseMove = useCallback(event => onMouseMove?.(datum, event), [onMouseMove, datum])

    const handleMouseLeave = useCallback(event => onMouseLeave?.(datum, event), [
        onMouseLeave,
        datum,
    ])

    return (
        <animated.path
            d={style.path}
            opacity={style.opacity}
            fill={datum.fill || style.color}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
            onClick={onClick ? handleClick : undefined}
            onMouseEnter={onMouseEnter ? handleMouseEnter : undefined}
            onMouseMove={onMouseMove ? handleMouseMove : undefined}
            onMouseLeave={onMouseLeave ? handleMouseLeave : undefined}
        />
    )
}
