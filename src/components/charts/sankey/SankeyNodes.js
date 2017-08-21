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
import { cloneDeep } from 'lodash'
import pure from 'recompose/pure'
import { TransitionMotion, spring } from 'react-motion'
import { extractRGB } from '../../../lib/colorUtils'
import { motionPropTypes } from '../../../props'

const SankeyNodes = ({
    nodes,

    // nodes
    getColor,
    nodeOpacity,
    nodeBorderWidth,
    getNodeBorderColor,

    // motion
    animate,
    motionDamping,
    motionStiffness,
}) => {
    if (!animate) {
        return (
            <g>
                {nodes.map(node => {
                    const color = getColor(node)

                    return (
                        <rect
                            key={node.id}
                            x={node.x0}
                            y={node.y0}
                            height={node.y1 - node.y0}
                            width={node.x1 - node.x0}
                            fill={color}
                            fillOpacity={nodeOpacity}
                            strokeWidth={nodeBorderWidth}
                            stroke={getNodeBorderColor({ ...node, color })}
                        />
                    )
                })}
            </g>
        )
    }

    const springProps = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    return (
        <TransitionMotion
            styles={nodes.map(node => {
                const color = getColor(node)

                return {
                    key: node.id,
                    data: node,
                    style: {
                        x: spring(node.x0, springProps),
                        y: spring(node.y0, springProps),
                        width: spring(node.x1 - node.x0, springProps),
                        height: spring(node.y1 - node.y0, springProps),
                        ...extractRGB(color, springProps),
                    },
                }
            })}
        >
            {interpolatedStyles =>
                <g>
                    {interpolatedStyles.map(({ key, style, data }) => {
                        const { colorR, colorG, colorB } = style
                        const color = `rgb(${Math.round(colorR)},${Math.round(colorG)},${Math.round(
                            colorB
                        )})`

                        return (
                            <rect
                                key={key}
                                x={style.x}
                                y={style.y}
                                width={Math.max(style.width, 0)}
                                height={Math.max(style.height, 0)}
                                fill={color}
                                fillOpacity={nodeOpacity}
                                strokeWidth={nodeBorderWidth}
                                stroke={getNodeBorderColor({ ...data, color })}
                            />
                        )
                    })}
                </g>}
        </TransitionMotion>
    )
}

SankeyNodes.propTypes = {
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x0: PropTypes.number.isRequired,
            x1: PropTypes.number.isRequired,
            y0: PropTypes.number.isRequired,
            x1: PropTypes.number.isRequired,
        })
    ).isRequired,

    getColor: PropTypes.func.isRequired,
    nodeOpacity: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    getNodeBorderColor: PropTypes.func.isRequired,

    ...motionPropTypes,
}

export default pure(SankeyNodes)
