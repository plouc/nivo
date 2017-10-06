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
import BarSlicesItem from './BarSlicesItem'

const BarSlices = ({ slices, height, showTooltip, hideTooltip, theme }) => (
    <g>
        {slices.map(slice => (
            <BarSlicesItem
                key={slice.id}
                slice={slice}
                height={height}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                theme={theme}
            />
        ))}
    </g>
)

BarSlices.propTypes = {
    slices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            x: PropTypes.number.isRequired,
            bars: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    color: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    height: PropTypes.number.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
}

export default pure(BarSlices)
