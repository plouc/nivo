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
import { useTransition } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import GridLine from './GridLine'

const GridLines = ({ lines }) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transitions = useTransition(lines, line => line.key, {
        initial: line => ({
            opacity: 1,
            x1: line.x1,
            x2: line.x2,
            y1: line.y1,
            y2: line.y2,
        }),
        from: line => ({
            opacity: 0,
            x1: line.x1,
            x2: line.x2,
            y1: line.y1,
            y2: line.y2,
        }),
        enter: line => ({
            opacity: 1,
            x1: line.x1,
            x2: line.x2,
            y1: line.y1,
            y2: line.y2,
        }),
        update: line => ({
            opacity: 1,
            x1: line.x1,
            x2: line.x2,
            y1: line.y1,
            y2: line.y2,
        }),
        leave: {
            opacity: 0,
        },
        config: springConfig,
        immediate: !animate,
    })

    return (
        <g>
            {transitions.map(({ item: line, props: animatedProps, key }) => (
                <GridLine {...line} key={key} animatedProps={animatedProps} />
            ))}
        </g>
    )
}

GridLines.propTypes = {
    type: PropTypes.oneOf(['x', 'y']).isRequired,
    lines: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            x1: PropTypes.number,
            x2: PropTypes.number,
            y1: PropTypes.number,
            y2: PropTypes.number,
        })
    ).isRequired,
}

export default memo(GridLines)
