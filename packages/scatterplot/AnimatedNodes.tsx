import { memo } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { useMotionConfig, blendModePropType } from '@nivo/core'
import { NodeWrapper } from './NodeWrapper'

interface AnimatedNodesProps {
    // nodes: PropTypes.arrayOf(NodePropType).isRequired,
    // renderNode: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    // isInteractive: PropTypes.bool.isRequired,
    // onMouseEnter: PropTypes.func,
    // onMouseMove: PropTypes.func,
    // onMouseLeave: PropTypes.func,
    // onClick: PropTypes.func,
    // tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    // blendMode: blendModePropType.isRequired,
}

export const AnimatedNodes = memo(
    ({
        nodes,
        renderNode,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
        blendMode,
    }: AnimatedNodesProps) => {
        const { springConfig } = useMotionConfig()

        return (
            <TransitionMotion
                styles={nodes.map(node => ({
                    key: node.id,
                    data: node,
                    style: {
                        x: spring(node.x, springConfig),
                        y: spring(node.y, springConfig),
                        size: spring(node.size, springConfig),
                    },
                }))}
            >
                {interpolatedStyles => (
                    <>
                        {interpolatedStyles.map(({ key, style, data: node }) => (
                            <NodeWrapper
                                key={key}
                                node={node}
                                renderNode={renderNode}
                                x={style.x}
                                y={style.y}
                                size={style.size}
                                color={node.style.color}
                                isInteractive={isInteractive}
                                onMouseEnter={onMouseEnter}
                                onMouseMove={onMouseMove}
                                onMouseLeave={onMouseLeave}
                                onClick={onClick}
                                tooltip={tooltip}
                                blendMode={blendMode}
                            />
                        ))}
                    </>
                )}
            </TransitionMotion>
        )
    }
)
