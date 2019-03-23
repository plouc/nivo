/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import { TransitionMotion, spring } from 'react-motion'
import { colorMotionSpring, getInterpolatedColor, motionPropTypes } from '@nivo/core'
import SankeyNodesItem from './SankeyNodesItem'

const SankeyNodes = ({
    nodes,

    nodeOpacity,
    nodeHoverOpacity,
    nodeHoverOthersOpacity,
    nodeBorderWidth,
    getNodeBorderColor,

    animate,
    motionDamping,
    motionStiffness,

    showTooltip,
    hideTooltip,
    setCurrentNode,
    currentNode,
    currentLink,
    isCurrentNode,
    onClick,

    tooltip,
    theme,
}) => {
    const getOpacity = node => {
        if (!currentNode && !currentLink) return nodeOpacity
        if (isCurrentNode(node)) return nodeHoverOpacity
        return nodeHoverOthersOpacity
    }

    if (!animate) {
        return (
            <Fragment>
                {nodes.map(node => {
                    return (
                        <SankeyNodesItem
                            key={node.id}
                            node={node}
                            x={node.x}
                            y={node.y}
                            width={node.width}
                            height={node.height}
                            color={node.color}
                            opacity={getOpacity(node)}
                            borderWidth={nodeBorderWidth}
                            borderColor={getNodeBorderColor(node)}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            setCurrent={setCurrentNode}
                            onClick={onClick}
                            tooltip={tooltip}
                            theme={theme}
                        />
                    )
                })}
            </Fragment>
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
                        opacity: spring(getOpacity(node), springProps),
                        ...colorMotionSpring(node.color, springProps),
                    },
                }
            })}
        >
            {interpolatedStyles => (
                <Fragment>
                    {interpolatedStyles.map(({ key, style, data: node }) => {
                        const color = getInterpolatedColor(style)

                        return (
                            <SankeyNodesItem
                                key={key}
                                node={node}
                                x={style.x}
                                y={style.y}
                                width={Math.max(style.width, 0)}
                                height={Math.max(style.height, 0)}
                                color={color}
                                opacity={style.opacity}
                                borderWidth={nodeBorderWidth}
                                borderColor={getNodeBorderColor({ ...node, color })}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                setCurrent={setCurrentNode}
                                onClick={onClick}
                                tooltip={tooltip}
                                theme={theme}
                            />
                        )
                    })}
                </Fragment>
            )}
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

    nodeOpacity: PropTypes.number.isRequired,
    nodeHoverOpacity: PropTypes.number.isRequired,
    nodeHoverOthersOpacity: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    getNodeBorderColor: PropTypes.func.isRequired,

    theme: PropTypes.object.isRequired,
    tooltip: PropTypes.func,

    ...motionPropTypes,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    setCurrentNode: PropTypes.func.isRequired,
    currentNode: PropTypes.object,
    currentLink: PropTypes.object,
    isCurrentNode: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default pure(SankeyNodes)
