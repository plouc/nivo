import { useCallback, MouseEvent, AriaAttributes } from 'react'
import { SpringValue, Interpolation, animated } from '@react-spring/web'
import { DatumWithArcAndColor } from './types'

export type ArcMouseHandler<Datum extends DatumWithArcAndColor> = (
    datum: Datum,
    event: MouseEvent<SVGPathElement>
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
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
    ariaHidden?: AriaAttributes['aria-hidden']
    ariaDisabled?: AriaAttributes['aria-disabled']
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
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaHidden,
    ariaDisabled,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
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

    return (
        <animated.path
            d={style.path}
            opacity={style.opacity}
            fill={datum.fill || style.color}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-hidden={ariaHidden}
            aria-disabled={ariaDisabled}
            onClick={onClick ? handleClick : undefined}
            onMouseEnter={onMouseEnter ? handleMouseEnter : undefined}
            onMouseMove={onMouseMove ? handleMouseMove : undefined}
            onMouseLeave={onMouseLeave ? handleMouseLeave : undefined}
            data-testid={`arc.${datum.id}`}
        />
    )
}
