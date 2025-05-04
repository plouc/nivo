import { MouseEvent, useCallback, WheelEvent } from 'react'
import { SpringValue, animated, Interpolation } from '@react-spring/web'
import { DatumWithRectAndColor } from './types'

export type RectMouseHandler<Datum extends DatumWithRectAndColor> = (
    datum: Datum,
    event: MouseEvent<SVGRectElement>
) => void

export type RectWheelHandler<Datum extends DatumWithRectAndColor> = (
    datum: Datum,
    event: WheelEvent<SVGRectElement>
) => void

export interface RectShapeProps<Datum extends DatumWithRectAndColor> {
    datum: Datum
    style: {
        progress: SpringValue<number>
        x: SpringValue<number>
        y: SpringValue<number>
        transform: Interpolation<string>
        width: SpringValue<number>
        height: SpringValue<number>
        color: SpringValue<string>
        borderRadius: number
        borderWidth: number
        borderColor: SpringValue<string>
    }
    onClick?: RectMouseHandler<Datum>
    onMouseEnter?: RectMouseHandler<Datum>
    onMouseLeave?: RectMouseHandler<Datum>
    onMouseMove?: RectMouseHandler<Datum>
    onWheel?: RectWheelHandler<Datum>
    onContextMenu?: RectMouseHandler<Datum>
    getTestId?: (datum: Datum) => string
}

/**
 * A simple rect component to be used typically with an `RectsLayer`.
 *
 * Please note that the component accepts `SpringValue`s instead of
 * regular values to support animations.
 */
export const RectShape = <Datum extends DatumWithRectAndColor>({
    datum,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onWheel,
    onContextMenu,
    getTestId,
}: RectShapeProps<Datum>) => {
    const handleClick = useCallback(
        (event: MouseEvent<SVGRectElement>) => onClick?.(datum, event),
        [onClick, datum]
    )

    const handleMouseEnter = useCallback(
        (event: MouseEvent<SVGRectElement>) => onMouseEnter?.(datum, event),
        [onMouseEnter, datum]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent<SVGRectElement>) => onMouseMove?.(datum, event),
        [onMouseMove, datum]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent<SVGRectElement>) => onMouseLeave?.(datum, event),
        [onMouseLeave, datum]
    )

    const handleWheel = useCallback(
        (event: WheelEvent<SVGRectElement>) => onWheel?.(datum, event),
        [onWheel, datum]
    )

    const handleContextMenu = useCallback(
        (event: MouseEvent<SVGRectElement>) => onContextMenu?.(datum, event),
        [onContextMenu, datum]
    )

    return (
        <animated.rect
            width={style.width.to(v => Math.max(v, 0))}
            height={style.height.to(v => Math.max(v, 0))}
            transform={style.transform}
            rx={style.borderRadius}
            ry={style.borderRadius}
            opacity={style.progress}
            fill={datum.fill || style.color}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
            onClick={onClick ? handleClick : undefined}
            onMouseEnter={onMouseEnter ? handleMouseEnter : undefined}
            onMouseMove={onMouseMove ? handleMouseMove : undefined}
            onMouseLeave={onMouseLeave ? handleMouseLeave : undefined}
            onWheel={onWheel ? handleWheel : undefined}
            onContextMenu={onContextMenu ? handleContextMenu : undefined}
            data-testid={getTestId?.(datum)}
        />
    )
}
