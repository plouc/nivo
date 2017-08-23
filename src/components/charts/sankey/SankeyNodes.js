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
import { TransitionMotion, spring } from 'react-motion'
import { extractRGB } from '../../../lib/colorUtils'
import { motionPropTypes } from '../../../props'
import SankeyNodesItem from './SankeyNodesItem'

const SankeyNodes = ({
    nodes,

    // nodes
    nodePaddingX,
    nodeOpacity,
    nodeHoverOpacity,
    nodeBorderWidth,
    getNodeBorderColor,

    // motion
    animate,
    motionDamping,
    motionStiffness,

    showTooltip,
    hideTooltip,

    theme,
}) => {
    if (!animate) {
        return (
            <g>
                {nodes.map(node =>
                    <SankeyNodesItem
                        key={node.id}
                        node={node}
                        x={node.x}
                        y={node.y}
                        width={node.width}
                        height={node.height}
                        color={node.color}
                        opacity={nodeOpacity}
                        hoverOpacity={nodeHoverOpacity}
                        borderWidth={nodeBorderWidth}
                        borderColor={getNodeBorderColor(node)}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        theme={theme}
                    />
                )}
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
                    {interpolatedStyles.map(({ key, style, data: node }) => {
                        const { colorR, colorG, colorB } = style
                        const color = `rgb(${Math.round(colorR)},${Math.round(colorG)},${Math.round(
                            colorB
                        )})`

                        return (
                            <SankeyNodesItem
                                key={key}
                                node={node}
                                x={style.x}
                                y={style.y}
                                width={Math.max(style.width, 0)}
                                height={Math.max(style.height, 0)}
                                color={color}
                                opacity={nodeOpacity}
                                hoverOpacity={nodeHoverOpacity}
                                borderWidth={nodeBorderWidth}
                                borderColor={getNodeBorderColor({ ...node, color })}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                theme={theme}
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
            color: PropTypes.string.isRequired,
        })
    ).isRequired,

    nodePaddingX: PropTypes.number.isRequired,
    nodeOpacity: PropTypes.number.isRequired,
    nodeHoverOpacity: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    getNodeBorderColor: PropTypes.func.isRequired,

    theme: PropTypes.object.isRequired,

    ...motionPropTypes,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

export default pure(SankeyNodes)
