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
import Line from './LineLine'

const LineLines = memo(({ lines, lineGenerator, lineWidth }) => (
    <>
        {lines.map(({ id, data, color }) => (
            <Line
                key={id}
                id={id}
                points={data.map(d => d.position)}
                lineGenerator={lineGenerator}
                color={color}
                thickness={lineWidth}
            />
        ))}
    </>
))

LineLines.displayName = 'LineLines'
LineLines.propTypes = {
    lines: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            color: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    data: PropTypes.shape({
                        x: PropTypes.oneOfType([
                            PropTypes.string,
                            PropTypes.number,
                            PropTypes.instanceOf(Date),
                        ]),
                        y: PropTypes.oneOfType([
                            PropTypes.string,
                            PropTypes.number,
                            PropTypes.instanceOf(Date),
                        ]),
                    }).isRequired,
                    position: PropTypes.shape({
                        x: PropTypes.number,
                        y: PropTypes.number,
                    }).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    lineWidth: PropTypes.number.isRequired,
    lineGenerator: PropTypes.func.isRequired,
}

export default LineLines
