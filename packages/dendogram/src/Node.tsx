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
    setCurrentNode,
    tooltip,
    animatedProps,
}: NodeComponentProps<Datum>) => {
    const eventHandlers = useNodeMouseEventHandlers<Datum>(node, {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        setCurrentNode,
        tooltip,
    })

    return (
        <animated.circle
            r={animatedProps.size.to(size => size / 2)}
            fill={animatedProps.color}
            cx={animatedProps.x}
            cy={animatedProps.y}
            {...eventHandlers}
        />
    )
}
