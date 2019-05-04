/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import { useMotionConfig } from '@nivo/core'

const willEnter = ({ style, data }) => {
    const x0 = data.previousSource ? data.previousSource.x : style.x0.val
    const y0 = data.previousSource ? data.previousSource.y : style.y0.val

    return {
        x0,
        y0,
        x1: x0,
        y1: y0,
    }
}

const AnimatedLinks = ({ links, linkThickness, linkColor }) => {
    const { springConfig } = useMotionConfig()

    return (
        <TransitionMotion
            willEnter={willEnter}
            styles={links.map(link => ({
                key: link.id,
                data: link,
                style: {
                    x0: spring(link.source.x, springConfig),
                    y0: spring(link.source.y, springConfig),
                    x1: spring(link.target.x, springConfig),
                    y1: spring(link.target.y, springConfig),
                },
            }))}
        >
            {interpolatedStyles => (
                <>
                    {interpolatedStyles.map(({ key, style, data: link }) => {
                        return (
                            <line
                                key={key}
                                stroke={linkColor(link)}
                                strokeWidth={linkThickness(link)}
                                strokeLinecap="round"
                                x1={style.x0}
                                y1={style.y0}
                                x2={style.x1}
                                y2={style.y1}
                            />
                        )
                    })}
                </>
            )}
        </TransitionMotion>
    )
}

AnimatedLinks.propTypes = {
    links: PropTypes.array.isRequired,
    linkThickness: PropTypes.func.isRequired,
    linkColor: PropTypes.func.isRequired,
}

export default memo(AnimatedLinks)
