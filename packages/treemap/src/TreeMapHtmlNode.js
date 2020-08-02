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

const TreeMapHtmlNode = ({
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
        <animated.div
            id={node.path.replace(/[^\w]/gi, '-')}
            style={{
                boxSizing: 'border-box',
                position: 'absolute',
                top: 0,
                left: 0,
                transform: animatedProps.htmlTransform,
                width: animatedProps.width,
                height: animatedProps.height,
                borderWidth,
                borderStyle: 'solid',
                borderColor: node.borderColor,
                overflow: 'hidden',
            }}
        >
            <animated.div
                style={{
                    boxSizing: 'border-box',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: node.opacity,
                    width: animatedProps.width,
                    height: animatedProps.height,
                    background: animatedProps.color,
                }}
                onMouseEnter={node.onMouseEnter}
                onMouseMove={node.onMouseMove}
                onMouseLeave={node.onMouseLeave}
                onClick={node.onClick}
            />
            {showLabel && (
                <animated.span
                    style={{
                        ...theme.labels.text,
                        position: 'absolute',
                        display: 'flex',
                        top: -5,
                        left: -5,
                        width: 10,
                        height: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        color: node.labelTextColor,
                        transformOrigin: 'center center',
                        transform: animatedProps.labelHtmlTransform,
                        opacity: animatedProps.labelOpacity,
                        pointerEvents: 'none',
                    }}
                >
                    {node.label}
                </animated.span>
            )}
            {showParentLabel && (
                <animated.span
                    style={{
                        ...theme.labels.text,
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        width: 10,
                        height: 10,
                        color: node.parentLabelTextColor,
                        transformOrigin: 'top left',
                        transform: animatedProps.parentLabelHtmlTransform,
                        opacity: animatedProps.parentLabelOpacity,
                        pointerEvents: 'none',
                    }}
                >
                    {node.parentLabel}
                </animated.span>
            )}
        </animated.div>
    )
}

TreeMapHtmlNode.propTypes = {
    node: PropTypes.object.isRequired,
    animatedProps: PropTypes.object.isRequired,
    borderWidth: PropTypes.number.isRequired,
    enableLabel: PropTypes.bool.isRequired,
    enableParentLabel: PropTypes.bool.isRequired,
    labelSkipSize: PropTypes.number.isRequired,
}

export default memo(TreeMapHtmlNode)
