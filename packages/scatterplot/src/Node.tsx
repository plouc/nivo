import { animated } from '@react-spring/web'
import { ScatterPlotDatum, ScatterPlotNodeProps } from './types'
import { useCallback, MouseEvent } from 'react'

const interpolateRadius = (size: number) => size / 2

export const Node = <RawDatum extends ScatterPlotDatum>({
    node,
    style,
    blendMode,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: ScatterPlotNodeProps<RawDatum>) => {
    const handleMouseEnter = useCallback(
        (event: MouseEvent) => onMouseEnter?.(node, event),
        [node, onMouseEnter]
    )
    const handleMouseMove = useCallback(
        (event: MouseEvent) => onMouseMove?.(node, event),
        [node, onMouseMove]
    )
    const handleMouseLeave = useCallback(
        (event: MouseEvent) => onMouseLeave?.(node, event),
        [node, onMouseLeave]
    )
    const handleClick = useCallback((event: MouseEvent) => onClick?.(node, event), [node, onClick])

    return (
        <animated.circle
            cx={style.x}
            cy={style.y}
            r={style.size.to(interpolateRadius)}
            fill={style.color}
            style={{ mixBlendMode: blendMode }}
            onMouseEnter={isInteractive ? handleMouseEnter : undefined}
            onMouseMove={isInteractive ? handleMouseMove : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}
