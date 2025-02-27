import { animated } from '@react-spring/web'
import { NodeComponentProps } from './types'
import { useNodeMouseEventHandlers } from './hooks'

export const Node = <Datum,>({
    node,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    setCurrentNode,
    tooltip,
    tooltipPosition,
    tooltipAnchor,
    margin,
    animatedProps,
}: NodeComponentProps<Datum>) => {
    const eventHandlers = useNodeMouseEventHandlers<Datum>(node, {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onMouseDown,
        onMouseUp,
        onClick,
        onDoubleClick,
        setCurrentNode,
        tooltip,
        tooltipPosition,
        tooltipAnchor,
        margin,
    })

    return (
        <animated.circle
            data-testid={`node.${node.uid}`}
            r={animatedProps.size.to(size => size / 2)}
            fill={animatedProps.color}
            cx={animatedProps.x}
            cy={animatedProps.y}
            {...eventHandlers}
        />
    )
}
