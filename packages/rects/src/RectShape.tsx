import { SpringValue, animated, Interpolation } from '@react-spring/web'
import { MouseEvent, useCallback, WheelEvent } from 'react'
import { DatumWithRectAndColor } from './types'

export type RectMouseHandler<TDatum extends DatumWithRectAndColor> = (
    datum: TDatum,
    event: MouseEvent<SVGRectElement>
) => void

export type RectWheelHandler<TDatum extends DatumWithRectAndColor> = (
    datum: TDatum,
    event: WheelEvent<SVGRectElement>
) => void

export interface RectShapeProps<TDatum extends DatumWithRectAndColor> {
    datum: TDatum
    onClick?: RectMouseHandler<TDatum>
    onMouseEnter?: RectMouseHandler<TDatum>
    onMouseLeave?: RectMouseHandler<TDatum>
    onMouseMove?: RectMouseHandler<TDatum>
    onWheel?: RectWheelHandler<TDatum>
    onContextMenu?: RectMouseHandler<TDatum>
    style: {
        borderColor: SpringValue<string>
        borderWidth: number
        color: SpringValue<string>
        height: number
        opacity: SpringValue<number>
        transform: Interpolation<string>
        width: number
    }
}

/**
 * A simple rect component to be used typically with an `RectsLayer`.
 *
 * Please note that the component accepts `SpringValue`s instead of
 * regular values to support animations.
 */
export const RectShape = <TDatum extends DatumWithRectAndColor>({
    datum,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onWheel,
    onContextMenu,
}: RectShapeProps<TDatum>) => {
    const handleClick = useCallback(event => onClick?.(datum, event), [onClick, datum])

    const handleMouseEnter = useCallback(
        event => onMouseEnter?.(datum, event),
        [onMouseEnter, datum]
    )

    const handleMouseMove = useCallback(event => onMouseMove?.(datum, event), [onMouseMove, datum])

    const handleMouseLeave = useCallback(
        event => onMouseLeave?.(datum, event),
        [onMouseLeave, datum]
    )

    const handleWheel = useCallback(event => onWheel?.(datum, event), [onWheel, datum])

    const handleContextMenu = useCallback(
        event => onContextMenu?.(datum, event),
        [onContextMenu, datum]
    )

    return (
        <animated.rect
            data-id={datum.id}
            opacity={style.opacity}
            fill={datum.fill || style.color}
            transform={style.transform}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
            onClick={onClick ? handleClick : undefined}
            onMouseEnter={onMouseEnter ? handleMouseEnter : undefined}
            onMouseMove={onMouseMove ? handleMouseMove : undefined}
            onMouseLeave={onMouseLeave ? handleMouseLeave : undefined}
            onWheel={onWheel ? handleWheel : undefined}
            onContextMenu={onContextMenu ? handleContextMenu : undefined}
            width={style.width}
            height={style.height}
        />
    )
}
