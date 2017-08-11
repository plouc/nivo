/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import pure from 'recompose/pure'
import LineSlicesItem from './LineSlicesItem'

const LineSlices = ({ data, xScale, height, showTooltip, hideTooltip }) => {
    return (
        <g>
            {data[0].data.map(({ x }) =>
                <LineSlicesItem
                    key={x}
                    x={xScale(x)}
                    height={height}
                    showTooltip={showTooltip}
                    hideTooltip={hideTooltip}
                />
            )}
        </g>
    )
}

export default pure(LineSlices)
