import { memo, useMemo } from 'react'
import { useTransition, animated, to } from '@react-spring/web'
import { midAngle, getPolarLabelProps, useTheme } from '@nivo/core'
import { useMotionConfig } from '@nivo/core'
import { ArcDatum, ChordCommonProps } from './types'
import { useInheritedColor } from '@nivo/colors'

interface ChordLabelsProps {
    arcs: ArcDatum[]
    radius: number
    rotation: number
    color: ChordCommonProps['labelTextColor']
}

export const ChordLabels = memo(({ arcs, radius, rotation, color }: ChordLabelsProps) => {
    const { animate, config: springConfig } = useMotionConfig()

    const theme = useTheme()
    const getColor = useInheritedColor(color, theme)

    const labels = useMemo(
        () =>
            arcs.map(arc => {
                const angle = midAngle(arc)
                const textProps = getPolarLabelProps(radius, angle, rotation, 'svg')

                return {
                    id: arc.id,
                    label: arc.label,
                    x: textProps.x,
                    y: textProps.y,
                    rotation: textProps.rotate,
                    color: getColor(arc),
                    textAnchor: textProps.align,
                    dominantBaseline: textProps.baseline,
                }
            }),
        [arcs, radius, rotation, getColor]
    )

    const transition = useTransition<
        typeof labels[number],
        {
            x: number
            y: number
            rotation: number
            color: string
        }
    >(labels, {
        keys: label => label.id,
        initial: label => {
            return {
                x: label.x,
                y: label.y,
                rotation: label.rotation,
                color: label.color,
            }
        },
        from: label => {
            return {
                x: label.x,
                y: label.y,
                rotation: label.rotation,
                color: label.color,
            }
        },
        enter: label => {
            return {
                x: label.x,
                y: label.y,
                rotation: label.rotation,
                color: label.color,
            }
        },
        update: label => {
            return {
                x: label.x,
                y: label.y,
                rotation: label.rotation,
                color: label.color,
            }
        },
        expires: true,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((transitionProps, label) => (
                <animated.text
                    key={label.id}
                    data-testid={`label.${label.id}`}
                    style={{
                        ...theme.labels.text,
                        pointerEvents: 'none',
                        fill: transitionProps.color,
                    }}
                    transform={to(
                        [transitionProps.x, transitionProps.y, transitionProps.rotation],
                        (x, y, rotation) => `translate(${x}, ${y}) rotate(${rotation})`
                    )}
                    textAnchor={label.textAnchor}
                    dominantBaseline={label.dominantBaseline}
                >
                    {label.label}
                </animated.text>
            ))}
        </>
    )
})
