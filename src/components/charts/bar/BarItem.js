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
import BasicTooltip from '../../tooltip/BasicTooltip'

const BarItem = ({ data, x, y, width, height, color, showTooltip, hideTooltip }) => {
    const handleTooltip = e =>
        showTooltip(
            <BasicTooltip
                id={`${data.id} - ${data.indexValue}`}
                value={data.value}
                enableChip={true}
                color={color}
            />,
            e
        )

    return (
        <rect
            className="nivo_bar_rect"
            x={x}
            y={y}
            width={width}
            height={height}
            style={{
                fill: color,
            }}
            onMouseEnter={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={hideTooltip}
        />
    )
}

BarItem.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        indexValue: PropTypes.string.isRequired,
    }).isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

export default pure(BarItem)
