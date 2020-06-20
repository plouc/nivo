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

const getDotY = (datum, position) => {
    let y = datum.y2
    if (position === 'center') {
        y = datum.y1 + (datum.y2 - datum.y1) / 2
    } else if (position === 'start') {
        y = datum.y1
    }

    return y
}

const StreamDots = ({
    id,
    color,
    data,
    dotComponent,
    position,
    getSize,
    getColor,
    getBorderWidth,
    getBorderColor,
}) => {
    return data.map((d, i) => {
        const datum = { ...d, key: id, color }

        return React.createElement(dotComponent, {
            key: i,
            datum,
            x: datum.x,
            y: getDotY(datum, position),
            size: getSize(datum),
            color: getColor(datum),
            borderWidth: getBorderWidth(datum),
            borderColor: getBorderColor(datum),
        })
    })
}

StreamDots.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y1: PropTypes.number.isRequired,
            y2: PropTypes.number.isRequired,
        })
    ).isRequired,
    dotComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    position: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
    getSize: PropTypes.func.isRequired,
    getColor: PropTypes.func.isRequired,
    getBorderWidth: PropTypes.func.isRequired,
    getBorderColor: PropTypes.func.isRequired,
}

export default memo(StreamDots)
