import { memo } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { useMotionConfig } from '@nivo/core'
import Node from './Node'

const willEnter = ({ style }) => ({
    x: style.x.val,
    y: style.y.val,
    radius: style.radius.val,
    scale: 0,
})

const willLeave =
    springConfig =>
    ({ style }) => ({
        x: style.x,
        y: style.y,
        radius: style.radius,
        scale: spring(0, springConfig),
    })

interface AnimatedNodesProps {
    // nodes: PropTypes.array.isRequired,
    nodes: any[]
    // color: PropTypes.func.isRequired,
    color: Function
    borderWidth: number
    // borderColor: PropTypes.func.isRequired,
    borderColor: Function
    // handleNodeHover: PropTypes.func.isRequired,
    handleNodeHover: Function
    // handleNodeLeave: PropTypes.func.isRequired,
    handleNodeLeave: Function
}

const AnimatedNodes = ({ nodes, color, borderColor, ...props }: AnimatedNodesProps) => {
    const { springConfig } = useMotionConfig()

    return (
        <TransitionMotion
            willEnter={willEnter}
            willLeave={willLeave(springConfig)}
            styles={nodes.map(node => ({
                key: node.id,
                data: node,
                style: {
                    x: spring(node.x, springConfig),
                    y: spring(node.y, springConfig),
                    radius: spring(node.radius, springConfig),
                    scale: spring(1, springConfig),
                },
            }))}
        >
            {interpolatedStyles => (
                <>
                    {interpolatedStyles.map(({ key, style, data: node }) => {
                        return (
                            <Node
                                key={key}
                                node={node}
                                x={style.x}
                                y={style.y}
                                radius={Math.max(style.radius, 0)}
                                color={color(node)}
                                borderColor={borderColor(node)}
                                scale={Math.max(style.scale, 0)}
                                {...props}
                            />
                        )
                    })}
                </>
            )}
        </TransitionMotion>
    )
}

export default memo(AnimatedNodes)
