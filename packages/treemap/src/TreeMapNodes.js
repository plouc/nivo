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

const getAnimatedNodeProps = node => {
    return {
        transform: `translate(${node.x},${node.y})`,
        htmlTransform: `translate(${node.x}px,${node.y}px)`,
        labelOpacity: 1,
        labelTransform: `translate(${node.width / 2},${node.height / 2}) rotate(${
            node.labelRotation
        })`,
        labelHtmlTransform: `translate(${node.width / 2}px,${node.height / 2}px) rotate(${
            node.labelRotation
        }deg)`,
        parentLabelOpacity: 1,
        parentLabelTransform: `translate(${node.parentLabelX},${node.parentLabelY}) rotate(${node.parentLabelRotation})`,
        parentLabelHtmlTransform: `translate(${
            node.parentLabelX - (node.parentLabelRotation === 0 ? 0 : 5)
        }px,${node.parentLabelY - (node.parentLabelRotation === 0 ? 5 : 0)}px) rotate(${
            node.parentLabelRotation
        }deg)`,
        width: node.width,
        height: node.height,
        color: node.color,
    }
}

const getEndingAnimatedNodeProps = node => {
    const x = node.x + node.width / 2
    const y = node.y + node.height / 2

    return {
        transform: `translate(${x},${y})`,
        transformPixels: `translate(${x}px,${y}px)`,
        labelOpacity: 0,
        labelTransform: `translate(0,0) rotate(${node.labelRotation})`,
        parentLabelOpacity: 0,
        parentLabelTransform: `translate(0,0) rotate(${node.parentLabelRotation})`,
        parentLabelHtmlTransform: `translate(0px,0px) rotate(${node.parentLabelRotation}deg)`,
        width: 0,
        height: 0,
        color: node.color,
    }
}

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
        initial: node => getAnimatedNodeProps(node),
        from: node => getEndingAnimatedNodeProps(node),
        enter: node => getAnimatedNodeProps(node),
        update: node => getAnimatedNodeProps(node),
        leave: node => getEndingAnimatedNodeProps(node),
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
