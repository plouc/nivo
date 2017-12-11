/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

const Line = ({ data, generator, xScale, yScale, ...props }) => (
    <path
        d={generator(
            data.map(d => ({
                x: d.x !== null ? xScale(d.x) : null,
                y: d.y !== null ? yScale(d.y) : null,
            }))
        )}
        fill="none"
        strokeWidth={2}
        {...props}
    />
)

export default pure(Line)
