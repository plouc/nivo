/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import omit from 'lodash/omit'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@nivo/core'

const AnnotationNote = memo(({ datum, x, y, note }) => {
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
})

AnnotationNote.displayName = 'AnnotationNote'
AnnotationNote.propTypes = {
    datum: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    note: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
}
AnnotationNote.defaultProps = {}

export default AnnotationNote
