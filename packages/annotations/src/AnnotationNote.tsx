import React from 'react'
import omit from 'lodash/omit'
import { useSpring, animated } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'

export const AnnotationNote = <Datum,>({
    datum,
    x,
    y,
    note,
}: {
    datum: Datum
    x: number
    y: number
    // PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
    note: any
}) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        x,
        y,
        config: springConfig,
        immediate: !animate,
    })

    if (typeof note === 'function') {
        return note({ x, y, datum })
    }

    return (
        <>
            {theme.annotations.text.outlineWidth > 0 && (
                <animated.text
                    x={animatedProps.x}
                    y={animatedProps.y}
                    style={{
                        ...theme.annotations.text,
                        strokeLinejoin: 'round',
                        strokeWidth: theme.annotations.text.outlineWidth * 2,
                        stroke: theme.annotations.text.outlineColor,
                    }}
                >
                    {note}
                </animated.text>
            )}
            <animated.text
                x={animatedProps.x}
                y={animatedProps.y}
                style={omit(theme.annotations.text, ['outlineWidth', 'outlineColor'])}
            >
                {note}
            </animated.text>
        </>
    )
}
