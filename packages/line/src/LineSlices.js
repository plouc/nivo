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
import LineSlicesItem from './LineSlicesItem'

const LineSlices = memo(({ slices, height, tooltip, tooltipFormat }) => (
    <>
        {slices.map(slice => (
            <LineSlicesItem
                key={slice.id}
                slice={slice}
                height={height}
                tooltipFormat={tooltipFormat}
                tooltip={tooltip}
            />
        ))}
    </>
))

LineSlices.displayName = 'LineSlices'
LineSlices.propTypes = {
    slices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.instanceOf(Date),
            ]).isRequired,
            x: PropTypes.number.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    data: PropTypes.shape({
                        x: PropTypes.oneOfType([
                            PropTypes.number,
                            PropTypes.string,
                            PropTypes.instanceOf(Date),
                        ]),
                        y: PropTypes.oneOfType([
                            PropTypes.number,
                            PropTypes.string,
                            PropTypes.instanceOf(Date),
                        ]),
                    }),
                    position: PropTypes.shape({
                        x: PropTypes.number,
                        y: PropTypes.number,
                    }).isRequired,
                    serie: PropTypes.shape({
                        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                        color: PropTypes.string.isRequired,
                    }).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    height: PropTypes.number.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export default LineSlices
