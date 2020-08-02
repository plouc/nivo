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
import { animated } from 'react-spring'
import { useTheme } from '@nivo/core'

const TreeMapNode = ({
    node,
    animatedProps,
    borderWidth,
    enableLabel,
    enableParentLabel,
    labelSkipSize,
}) => {
    const theme = useTheme()

    const showLabel =
        enableLabel &&
        node.isLeaf &&
        (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize)

    const showParentLabel = enableParentLabel && node.isParent

    return (
        <animated.g transform={animatedProps.transform}>
            <animated.rect
                width={animatedProps.width.interpolate(v => Math.max(v, 0))}
                height={animatedProps.height.interpolate(v => Math.max(v, 0))}
                fill={node.fill ? node.fill : animatedProps.color}
                strokeWidth={borderWidth}
                stroke={node.borderColor}
                fillOpacity={node.opacity}
                onMouseEnter={node.onMouseEnter}
                onMouseMove={node.onMouseMove}
                onMouseLeave={node.onMouseLeave}
                onClick={node.onClick}
            />
            {showLabel && (
                <animated.text
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        ...theme.labels.text,
                        fill: node.labelTextColor,
                        pointerEvents: 'none',
                    }}
                    fillOpacity={animatedProps.labelOpacity}
                    transform={animatedProps.labelTransform}
                >
                    {node.label}
                </animated.text>
            )}
            {showParentLabel && (
                <animated.text
                    dominantBaseline="central"
                    style={{
                        ...theme.labels.text,
                        fill: node.parentLabelTextColor,
                        pointerEvents: 'none',
                    }}
                    fillOpacity={animatedProps.parentLabelOpacity}
                    transform={animatedProps.parentLabelTransform}
                >
                    {node.parentLabel}
                </animated.text>
            )}
        </animated.g>
    )
}

TreeMapNode.propTypes = {
    node: PropTypes.object.isRequired,
    animatedProps: PropTypes.object.isRequired,
    borderWidth: PropTypes.number.isRequired,
    enableLabel: PropTypes.bool.isRequired,
    enableParentLabel: PropTypes.bool.isRequired,
    labelSkipSize: PropTypes.number.isRequired,
}

export default memo(TreeMapNode)
