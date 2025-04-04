import { useCallback, MouseEvent } from 'react'
import { animated } from '@react-spring/web'
import { ScatterPlotDatum, ScatterPlotNodeProps } from './types'

const interpolateRadius = (size: number) => size / 2

export const Node = <RawDatum extends ScatterPlotDatum>({
    node,
    style,
    blendMode,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
}: ScatterPlotNodeProps<RawDatum>) => {
    const handleMouseEnter = useCallback(
        (event: MouseEvent<SVGCircleElement>) => onMouseEnter?.(node, event),
        [node, onMouseEnter]
    )
    const handleMouseMove = useCallback(
        (event: MouseEvent<SVGCircleElement>) => onMouseMove?.(node, event),
        [node, onMouseMove]
    )
    const handleMouseLeave = useCallback(
        (event: MouseEvent<SVGCircleElement>) => onMouseLeave?.(node, event),
        [node, onMouseLeave]
    )
    const handleMouseDown = useCallback(
        (event: MouseEvent<SVGCircleElement>) => onMouseDown?.(node, event),
        [node, onMouseDown]
    )
    const handleMouseUp = useCallback(
        (event: MouseEvent<SVGCircleElement>) => onMouseUp?.(node, event),
        [node, onMouseUp]
    )
    const handleClick = useCallback(
        (event: MouseEvent<SVGCircleElement>) => onClick?.(node, event),
        [node, onClick]
    )
    const handleDoubleClick = useCallback(
        (event: MouseEvent<SVGCircleElement>) => onDoubleClick?.(node, event),
        [node, onDoubleClick]
    )

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
            onMouseDown={isInteractive ? handleMouseDown : undefined}
            onMouseUp={isInteractive ? handleMouseUp : undefined}
            onClick={isInteractive ? handleClick : undefined}
            onDoubleClick={isInteractive ? handleDoubleClick : undefined}
        />
    )
}
