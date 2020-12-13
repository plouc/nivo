import React, { useCallback } from 'react'
import { SpringValue, Interpolation, animated } from 'react-spring'
import { DatumWithArcAndColor } from './types'

export type ArcMouseHandler<Datum extends DatumWithArcAndColor> = (
    datum: Datum,
    event: React.MouseEvent<SVGPathElement>
) => void

export interface ArcShapeProps<Datum extends DatumWithArcAndColor> {
    data: Datum
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
    data,
    style,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: ArcShapeProps<Datum>) => {
    const handleClick = useCallback(event => onClick?.(data, event), [onClick, data])

    const handleMouseEnter = useCallback(event => onMouseEnter?.(data, event), [onMouseEnter, data])

    const handleMouseMove = useCallback(event => onMouseMove?.(data, event), [onMouseMove, data])

    const handleMouseLeave = useCallback(event => onMouseLeave?.(data, event), [onMouseLeave, data])

    return (
        <animated.path
            d={style.path}
            opacity={style.opacity}
            // fill={datum.fill || color}
            fill={style.color}
            stroke={style.borderColor}
            onClick={onClick ? handleClick : undefined}
            onMouseEnter={onMouseEnter ? handleMouseEnter : undefined}
            onMouseMove={onMouseMove ? handleMouseMove : undefined}
            onMouseLeave={onMouseLeave ? handleMouseLeave : undefined}
        />
    )
}
