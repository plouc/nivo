import { useSprings, animated } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
import { DefaultLink, DefaultNode, SankeyCommonProps, SankeyNodeDatum } from './types'

interface SankeyLabelsProps<N extends DefaultNode, L extends DefaultLink> {
    nodes: SankeyNodeDatum<N, L>[]
    layout: SankeyCommonProps<N, L>['layout']
    width: number
    height: number
    labelPosition: SankeyCommonProps<N, L>['labelPosition']
    labelPadding: SankeyCommonProps<N, L>['labelPadding']
    labelOrientation: SankeyCommonProps<N, L>['labelOrientation']
    getLabelTextColor: (node: SankeyNodeDatum<N, L>) => string
}

export const SankeyLabels = <N extends DefaultNode, L extends DefaultLink>({
    nodes,
    layout,
    width,
    height,
    labelPosition,
    labelPadding,
    labelOrientation,
    getLabelTextColor,
}: SankeyLabelsProps<N, L>) => {
    const theme = useTheme()

    const labelRotation = labelOrientation === 'vertical' ? -90 : 0
    const labels = nodes.map(node => {
        let x
        let y
        let textAnchor
        if (layout === 'horizontal') {
            y = node.y + node.height / 2
            if (node.x < width / 2) {
                if (labelPosition === 'inside') {
                    x = node.x1 + labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'middle' : 'start'
                } else {
                    x = node.x - labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'middle' : 'end'
                }
            } else {
                if (labelPosition === 'inside') {
                    x = node.x - labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'middle' : 'end'
                } else {
                    x = node.x1 + labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'middle' : 'start'
                }
            }
        } else if (layout === 'vertical') {
            x = node.x + node.width / 2
            if (node.y < height / 2) {
                if (labelPosition === 'inside') {
                    y = node.y1 + labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'end' : 'middle'
                } else {
                    y = node.y - labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'start' : 'middle'
                }
            } else {
                if (labelPosition === 'inside') {
                    y = node.y - labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'start' : 'middle'
                } else {
                    y = node.y1 + labelPadding
                    textAnchor = labelOrientation === 'vertical' ? 'end' : 'middle'
                }
            }
        }

        return {
            id: node.id,
            label: node.label,
            x,
            y,
            textAnchor,
            color: getLabelTextColor(node),
        }
    })

    const { animate, config: springConfig } = useMotionConfig()
    const springs = useSprings(
        labels.length,
        labels.map(label => ({
            transform: `translate(${label.x}, ${label.y}) rotate(${labelRotation})`,
            color: label.color,
            config: springConfig,
            immediate: !animate,
        }))
    )

    return (
        <>
            {springs.map((animatedProps, index) => {
                const label = labels[index]

                return (
                    <animated.text
                        key={label.id}
                        dominantBaseline="central"
                        textAnchor={label.textAnchor}
                        transform={animatedProps.transform}
                        style={{
                            ...theme.labels.text,
                            fill: animatedProps.color,
                            pointerEvents: 'none',
                        }}
                    >
                        {label.label}
                    </animated.text>
                )
            })}
        </>
    )
}
