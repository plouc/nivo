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

function getSliceDimensions(slice, height, width, layout) {
    if (layout === 'horizontal') {
        return {
            height: slice.height,
            width,
        }
    }

    return {
        height,
        width: slice.width,
    }
}

const BarSlices = ({ slices, height, showTooltip, hideTooltip, theme, width, layout }) => (
    <g>
        {slices.map(slice => {
            const dimensions = getSliceDimensions(slice, height, width, layout)

            return (
                <BarSlicesItem
                    key={slice.id}
                    slice={slice}
                    showTooltip={showTooltip}
                    hideTooltip={hideTooltip}
                    theme={theme}
                    {...dimensions}
                />
            )
        })}
    </g>
)

BarSlices.propTypes = {
    slices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
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
    width: PropTypes.number.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
}

export default pure(BarSlices)
