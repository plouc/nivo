import { memo } from 'react'
import { animated, to } from '@react-spring/web'
import { useTheme } from '@nivo/core'
import { NodeProps, TreeMapDatum } from './types'
import { svgNodeTransform, svgLabelTransform } from './transitions'

const NonMemoizedTreeMapNode = <Datum extends TreeMapDatum>({
    node,
    animatedProps,
    borderWidth,
    enableLabel,
    enableParentLabel,
    labelSkipSize,
}: NodeProps<Datum>) => {
    const theme = useTheme()

    const showLabel =
        enableLabel &&
        node.isLeaf &&
        (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize)

    const showParentLabel = enableParentLabel && node.isParent

    return (
        <animated.g transform={svgNodeTransform(animatedProps.x, animatedProps.y)}>
            <animated.rect
                width={to(animatedProps.width, v => Math.max(v, 0))}
                height={to(animatedProps.height, v => Math.max(v, 0))}
                fill={node.fill ? node.fill : animatedProps.color}
                strokeWidth={borderWidth}
                stroke={node.borderColor}
                fillOpacity={node.opacity}
                onMouseEnter={node.onMouseEnter}
                onMouseMove={node.onMouseMove}
                onMouseLeave={node.onMouseLeave}
                onClick={node.onClick}
            />
            {showLabel && (
                <animated.text
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        ...theme.labels.text,
                        fill: node.labelTextColor,
                        pointerEvents: 'none',
                    }}
                    fillOpacity={animatedProps.labelOpacity}
                    transform={svgLabelTransform(
                        animatedProps.labelX,
                        animatedProps.labelY,
                        animatedProps.labelRotation
                    )}
                >
                    {node.label}
                </animated.text>
            )}
            {showParentLabel && (
                <animated.text
                    dominantBaseline="central"
                    style={{
                        ...theme.labels.text,
                        fill: node.parentLabelTextColor,
                        pointerEvents: 'none',
                    }}
                    fillOpacity={animatedProps.parentLabelOpacity}
                    transform={svgLabelTransform(
                        animatedProps.parentLabelX,
                        animatedProps.parentLabelY,
                        animatedProps.parentLabelRotation
                    )}
                >
                    {node.parentLabel}
                </animated.text>
            )}
        </animated.g>
    )
}

export const TreeMapNode = memo(NonMemoizedTreeMapNode) as typeof NonMemoizedTreeMapNode
