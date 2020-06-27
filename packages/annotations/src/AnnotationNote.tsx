/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, ReactNode } from 'react'
import { useSpring, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@nivo/core'
import { AnnotationDatum, AnnotationNoteFn, Position } from './types'

interface AnnotationNoteProps extends Position {
    datum: AnnotationDatum
    note: AnnotationNoteFn | ReactNode
}

const AnnotationNote = memo(({ datum, x, y, note }: AnnotationNoteProps) => {
    const theme = useTheme()
    const { animate, config: springConfiig } = useMotionConfig()

    const animatedProps = useSpring({
        x,
        y,
        config: springConfiig,
        immediate: !animate,
    })

    if (typeof note === 'function') {
        return note({ x, y, datum })
    }

    const { outlineWidth = 0, outlineColor, ...text } = theme.annotations.text

    return (
        <>
            {outlineWidth > 0 && (
                <animated.text
                    x={animatedProps.x}
                    y={animatedProps.y}
                    style={{
                        ...text,
                        strokeLinejoin: 'round',
                        strokeWidth: Number(outlineWidth) * 2,
                        stroke: outlineColor,
                    }}
                >
                    {note}
                </animated.text>
            )}
            <animated.text x={animatedProps.x} y={animatedProps.y} style={text}>
                {note}
            </animated.text>
        </>
    )
})

export default AnnotationNote
