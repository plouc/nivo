import { animated } from '@react-spring/web'
import { CircleProps } from './types'

export const CircleSvg = <RawDatum,>({
    node,
    style,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
}: CircleProps<RawDatum>) => {
    return (
        <animated.circle
            key={node.id}
            cx={style.x}
            cy={style.y}
            r={style.radius}
            fill={style.color}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
            opacity={style.opacity}
            onMouseEnter={event => onMouseEnter?.(node, event)}
            onMouseMove={event => onMouseMove?.(node, event)}
            onMouseLeave={event => onMouseLeave?.(node, event)}
            onMouseDown={event => onMouseDown?.(node, event)}
            onMouseUp={event => onMouseUp?.(node, event)}
            onClick={event => onClick?.(node, event)}
            onDoubleClick={event => onDoubleClick?.(node, event)}
        />
    )
}
