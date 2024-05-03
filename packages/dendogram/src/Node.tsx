import { animated } from '@react-spring/web'
import { NodeComponentProps } from './types'
import { useNodeMouseEventHandlers } from './hooks'

export const Node = <Datum extends object>({
    node,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    animatedProps,
}: NodeComponentProps<Datum>) => {
    const eventHandlers = useNodeMouseEventHandlers<Datum>(node, {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    })

    return (
        <animated.circle
            r={6}
            fill={node.color}
            cx={animatedProps.x}
            cy={animatedProps.y}
            {...eventHandlers}
        />
    )
}
