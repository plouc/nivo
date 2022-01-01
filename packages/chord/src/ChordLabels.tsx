import { memo } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { midAngle, getPolarLabelProps, useTheme } from '@nivo/core'
import { useMotionConfig } from '@nivo/core'
import { ArcDatum } from './types'

interface ChordLabelsProps {
    arcs: ArcDatum[]
    radius: number
    rotation: number
    getColor: (arc: ArcDatum) => string
}

export const ChordLabels = memo(({ arcs, radius, rotation, getColor }: ChordLabelsProps) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()

    if (animate) {
        return (
            <>
                {arcs.map(arc => {
                    const color = getColor(arc, theme)
                    const angle = midAngle(arc)
                    const textProps = getPolarLabelProps(radius, angle, rotation)

                    return (
                        <text
                            key={arc.id}
                            transform={`translate(${textProps.x}, ${textProps.y}) rotate(${textProps.rotate})`}
                            style={{
                                ...theme.labels.text,
                                pointerEvents: 'none',
                                fill: color,
                            }}
                            textAnchor={textProps.align}
                            dominantBaseline={textProps.baseline}
                        >
                            {arc.label}
                        </text>
                    )
                })}
            </>
        )
    }

    return (
        <TransitionMotion
            styles={arcs.map(arc => {
                const angle = midAngle(arc)

                return {
                    key: arc.id,
                    data: arc,
                    style: {
                        angle: spring(angle, springConfig),
                    },
                }
            })}
        >
            {interpolatedStyles => (
                <>
                    {interpolatedStyles.map(({ key, style, data: arc }) => {
                        const color = getColor(arc, theme)
                        const textProps = getPolarLabelProps(radius, style.angle, rotation)

                        return (
                            <text
                                key={key}
                                transform={`translate(${textProps.x}, ${textProps.y}) rotate(${textProps.rotate})`}
                                style={{
                                    ...theme.labels.text,
                                    pointerEvents: 'none',
                                    fill: color,
                                }}
                                textAnchor={textProps.align}
                                dominantBaseline={textProps.baseline}
                            >
                                {arc.label}
                            </text>
                        )
                    })}
                </>
            )}
        </TransitionMotion>
    )
})
