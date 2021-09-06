import { createElement } from 'react'
import { useSprings } from '@react-spring/web'
import { useMotionConfig, positionFromAngle, radiansToDegrees } from '@nivo/core'
import { GridLabelComponent } from './types'

const textAnchorFromAngle = (_angle: number) => {
    const angle = radiansToDegrees(_angle) + 90

    if (angle <= 10 || angle >= 350 || (angle >= 170 && angle <= 190)) return 'middle' as const
    if (angle > 180) return 'end' as const
    return 'start' as const
}

interface RadarGridLabelsProps {
    radius: number
    angles: number[]
    indices: string[]
    label: GridLabelComponent
    labelOffset: number
}

export const RadarGridLabels = ({
    radius,
    angles,
    indices,
    label: labelComponent,
    labelOffset,
}: RadarGridLabelsProps) => {
    const { animate, config: springConfig } = useMotionConfig()

    const labels = indices.map((index, i) => {
        const position = positionFromAngle(angles[i], radius + labelOffset)
        const textAnchor = textAnchorFromAngle(angles[i])

        return {
            id: index,
            angle: radiansToDegrees(angles[i]),
            anchor: textAnchor,
            ...position,
        }
    })

    const springs = useSprings(
        labels.length,
        labels.map(label => ({
            transform: `translate(${label.x}, ${label.y})`,
            config: springConfig,
            immediate: !animate,
        }))
    )

    return (
        <>
            {springs.map((animatedProps, index) => {
                const label = labels[index]

                return createElement(labelComponent, {
                    key: label.id,
                    id: label.id,
                    anchor: label.anchor,
                    angle: label.angle,
                    x: label.x,
                    y: label.y,
                    animated: animatedProps,
                })
            })}
        </>
    )
}
