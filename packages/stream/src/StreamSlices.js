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
import StreamSlicesItem from './StreamSlicesItem'

const StreamSlices = ({ slices, height, getTooltipLabel, getTooltipValue }) => (
    <g>
        {slices.map(slice => (
            <StreamSlicesItem
                key={slice.index}
                slice={slice}
                height={height}
                getTooltipLabel={getTooltipLabel}
                getTooltipValue={getTooltipValue}
            />
        ))}
    </g>
)

StreamSlices.propTypes = {
    slices: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            x: PropTypes.number.isRequired,
            stack: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    color: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    height: PropTypes.number.isRequired,
    getTooltipLabel: PropTypes.func.isRequired,
    getTooltipValue: PropTypes.func.isRequired,
}

export default memo(StreamSlices)
