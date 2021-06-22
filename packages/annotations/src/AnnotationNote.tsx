import { createElement } from 'react'
import omit from 'lodash/omit'
import { useSpring, animated } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
import { NoteSvg } from './types'

export const AnnotationNote = <Datum,>({
    datum,
    x,
    y,
    note,
}: {
    datum: Datum
    x: number
    y: number
    note: NoteSvg<Datum>
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
        return createElement(note, { x, y, datum })
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
