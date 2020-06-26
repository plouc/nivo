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
import { useTransition } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { useInteractiveTreeMapNodes } from './hooks'

const TreeMapNodes = ({
    nodes,
    nodeComponent,
    borderWidth,
    enableLabel,
    labelSkipSize,
    enableParentLabel,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}) => {
    const interactiveNodes = useInteractiveTreeMapNodes(nodes, {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    })

    const { animate, config: springConfig } = useMotionConfig()
    const transitions = useTransition(interactiveNodes, node => node.path, {
        initial: node => {
            return {
                transform: `translate(${node.x},${node.y})`,
                labelTransform: `translate(${node.width / 2},${node.height / 2}) rotate(${
                    node.labelRotation
                })`,
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                color: node.color,
                labelRotation: node.labelRotation,
            }
        },
        from: node => {
            const x = node.x + node.width / 2
            const y = node.y + node.height / 2

            return {
                transform: `translate(${x},${y})`,
                labelTransform: `translate(0,0) rotate(${node.labelRotation})`,
                x,
                y,
                width: 0,
                height: 0,
                color: node.color,
                labelRotation: node.labelRotation,
            }
        },
        enter: node => {
            return {
                transform: `translate(${node.x},${node.y})`,
                labelTransform: `translate(${node.width / 2},${node.height / 2}) rotate(${
                    node.labelRotation
                })`,
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                color: node.color,
                labelRotation: node.labelRotation,
            }
        },
        update: node => {
            return {
                transform: `translate(${node.x},${node.y})`,
                labelTransform: `translate(${node.width / 2},${node.height / 2}) rotate(${
                    node.labelRotation
                })`,
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                color: node.color,
                labelRotation: node.labelRotation,
            }
        },
        leave: node => {
            const x = node.x + node.width / 2
            const y = node.y + node.height / 2

            return {
                transform: `translate(${x},${y})`,
                labelTransform: `translate(0,0) rotate(${node.labelRotation})`,
                x,
                y,
                width: 0,
                height: 0,
                color: node.color,
                labelRotation: node.labelRotation,
            }
        },
        config: springConfig,
        immediate: !animate,
    })

    return transitions.map(({ item: node, props: animatedProps, key }) => {
        return React.createElement(nodeComponent, {
            key,
            node,
            animatedProps,
            borderWidth,
            enableLabel,
            labelSkipSize,
            enableParentLabel,
        })
    })
}

TreeMapNodes.propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    nodeComponent: PropTypes.elementType.isRequired,
    borderWidth: PropTypes.number.isRequired,
    enableLabel: PropTypes.bool.isRequired,
    labelSkipSize: PropTypes.number.isRequired,
    enableParentLabel: PropTypes.bool.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.elementType,
}

export default memo(TreeMapNodes)
