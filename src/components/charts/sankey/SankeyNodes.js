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
                    return (
                        <rect
                            key={node.id}
                            x={node.x}
                            y={node.y}
                            height={node.height}
                            width={node.width}
                            fill={node.color}
                            fillOpacity={nodeOpacity}
                            strokeWidth={nodeBorderWidth}
                            stroke={getNodeBorderColor(node)}
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
                return {
                    key: node.id,
                    data: node,
                    style: {
                        x: spring(node.x, springProps),
                        y: spring(node.y, springProps),
                        width: spring(node.width, springProps),
                        height: spring(node.height, springProps),
                        ...extractRGB(node.color, springProps),
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
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        })
    ).isRequired,

    nodeOpacity: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    getNodeBorderColor: PropTypes.func.isRequired,

    ...motionPropTypes,
}

export default pure(SankeyNodes)
