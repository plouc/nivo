import React, { useMemo } from 'react'
import {
    // @ts-ignore
    midAngle,
    // @ts-ignore
    positionFromAngle,
    // @ts-ignore
    getLabelGenerator,
    radiansToDegrees,
    useTheme,
    useMotionConfig,
} from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { animated, useTransition } from 'react-spring'
import { SunburstLabelProps } from './types'

const sliceStyle = {
    pointerEvents: 'none',
} as const

export const SunburstLabels = <RawDatum,>({
    label,
    nodes,
    skipAngle = 0,
    textColor,
}: SunburstLabelProps<RawDatum>) => {
    const theme = useTheme()
    const getTextColor = useInheritedColor(textColor, theme)
    const { animate, config: springConfig } = useMotionConfig()

    const getLabel = useMemo(() => getLabelGenerator(label), [label])

    const labelNodes = useMemo(() => {
        const filteredNodes = nodes.filter(node => node.depth === 1)
        const [node] = filteredNodes
        const innerRadius = Math.sqrt(node.y0)
        const outerRadius = Math.sqrt(node.y1)
        const centerRadius = innerRadius + (outerRadius - innerRadius) / 2

        return filteredNodes
            .map(node => {
                const startAngle = node.x0
                const endAngle = node.x1
                const angle = Math.abs(endAngle - startAngle)
                const angleDeg = radiansToDegrees(angle)

                const middleAngle = midAngle({ startAngle, endAngle }) - Math.PI / 2
                const position = positionFromAngle(middleAngle, centerRadius)

                return { angle, angleDeg, data: node.data, endAngle, middleAngle, position }
            })
            .filter(node => node.angleDeg > skipAngle)
    }, [nodes, skipAngle])

    const transition = useTransition(labelNodes, {
        key: node => node.data.id,
        initial: node => ({
            opacity: 1,
            transform: `translate(${node.position.x},${node.position.y})`,
        }),
        from: node => ({
            opacity: 0,
            transform: `translate(${node.position.x},${node.position.y})`,
        }),
        enter: node => ({
            opacity: 1,
            transform: `translate(${node.position.x},${node.position.y})`,
        }),
        update: node => ({
            opacity: 1,
            transform: `translate(${node.position.x},${node.position.y})`,
        }),
        leave: {
            opacity: 0,
        },
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition(({ opacity, transform }, node) => (
                <animated.g
                    key={node.data.id}
                    transform={transform}
                    style={{ ...sliceStyle, opacity }}
                >
                    <text
                        textAnchor="middle"
                        style={{
                            ...theme.labels.text,
                            fill: getTextColor(node.data),
                        }}
                    >
                        {getLabel(node.data)}
                    </text>
                </animated.g>
            ))}
        </>
    )
}
