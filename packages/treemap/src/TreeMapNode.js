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
import { themePropType } from '@nivo/core'

const TreeMapNode = ({ style, node, handlers, theme }) => {
    if (style.width <= 0 || style.height <= 0) return null

    const rotate = node.label && style.orientLabel && style.height > style.width

    return (
        <g transform={`translate(${style.x},${style.y})`}>
            <rect
                width={style.width}
                height={style.height}
                fill={style.fill ? style.fill : style.color}
                strokeWidth={style.borderWidth}
                stroke={style.borderColor}
                {...handlers}
            />
            {node.label && (
                <text
                    textAnchor="middle"
                    alignmentBaseline="central"
                    style={{
                        ...theme.labels.text,
                        fill: style.labelTextColor,
                        pointerEvents: 'none',
                    }}
                    transform={`translate(${style.width / 2},${style.height / 2}) rotate(${
                        rotate ? -90 : 0
                    })`}
                >
                    {node.label}
                </text>
            )}
        </g>
    )
}

TreeMapNode.propTypes = {
    node: PropTypes.object.isRequired,
    style: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        labelTextColor: PropTypes.string.isRequired,
        orientLabel: PropTypes.bool.isRequired,
    }).isRequired,
    handlers: PropTypes.object.isRequired,
    theme: themePropType.isRequired,
}

export default TreeMapNode
