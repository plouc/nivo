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
import SlicesItem from './SlicesItem'

const Slices = ({ slices, axis, debug, height, tooltip, current, setCurrent }) => {
    return slices.map(slice => (
        <SlicesItem
            key={slice.id}
            slice={slice}
            axis={axis}
            debug={debug}
            height={height}
            tooltip={tooltip}
            setCurrent={setCurrent}
            isCurrent={current !== null && current.id === slice.id}
        />
    ))
}

Slices.propTypes = {
    slices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.instanceOf(Date),
            ]).isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            points: PropTypes.arrayOf(PropTypes.object).isRequired,
        })
    ).isRequired,
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    debug: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    current: PropTypes.object,
    setCurrent: PropTypes.func.isRequired,
}

export default memo(Slices)
