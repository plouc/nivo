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
import { useMotionConfig } from '@nivo/core'
import { SmartMotion } from '@nivo/core'

const LinesItem = ({ lineGenerator, id, points, color, thickness }) => {
    const { animate, springConfig } = useMotionConfig()

    if (animate !== true) {
        return (
            <path
                key={id}
                d={lineGenerator(points)}
                fill="none"
                strokeWidth={thickness}
                stroke={color}
            />
        )
    }

    return (
        <SmartMotion
            key={id}
            style={spring => ({
                d: spring(lineGenerator(points), springConfig),
                stroke: spring(color, springConfig),
            })}
        >
            {style => (
                <path
                    key={id}
                    d={style.d}
                    fill="none"
                    strokeWidth={thickness}
                    stroke={style.stroke}
                />
            )}
        </SmartMotion>
    )
}

LinesItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    points: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
    lineGenerator: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    thickness: PropTypes.number.isRequired,
}

export default memo(LinesItem)
