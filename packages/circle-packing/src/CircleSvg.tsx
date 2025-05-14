import { animated } from '@react-spring/web'
import { CircleProps } from './types'
import { useNodeMouseHandlers } from './hooks'

export const CircleSvg = <Datum,>({
    node,
    style,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: CircleProps<Datum>) => {
    const handlers = useNodeMouseHandlers<Datum>(node, {
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
    })

    return (
        <animated.circle
            key={node.id}
            cx={style.x}
            cy={style.y}
            r={style.radius}
            fill={node.fill || style.color}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
            opacity={style.opacity}
            onMouseEnter={handlers.onMouseEnter}
            onMouseMove={handlers.onMouseMove}
            onMouseLeave={handlers.onMouseLeave}
            onClick={handlers.onClick}
        />
    )
}
