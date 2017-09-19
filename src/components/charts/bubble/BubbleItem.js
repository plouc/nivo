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

const BubbleItem = ({ node, style, handlers }) => {
    if (style.r <= 0) return null

    return (
        <g transform={`translate(${style.x},${style.y})`}>
            <circle
                r={style.r}
                {...handlers}
                fill={style.fill ? style.fill : style.color}
                stroke={style.borderColor}
                strokeWidth={style.borderWidth}
            />
            {node.label !== false && (
                <text
                    textAnchor="middle"
                    alignmentBaseline="central"
                    style={{
                        fill: style.labelTextColor,
                        pointerEvents: 'none',
                    }}
                >
                    {node.label}
                </text>
            )}
        </g>
    )
}

BubbleItem.propTypes = {
    node: PropTypes.object.isRequired,
    style: PropTypes.shape({
        r: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        fill: PropTypes.string,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        labelTextColor: PropTypes.string.isRequired,
    }).isRequired,
    handlers: PropTypes.object.isRequired,
}

export default BubbleItem
