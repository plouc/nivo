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

const TreeMapHtmlNode = ({ node, animatedProps, borderWidth, enableLabel, labelSkipSize }) => {
    const theme = useTheme()

    const showLabel =
        enableLabel &&
        node.isLeaf &&
        (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize)

    return (
        <animated.div
            id={node.path.replace(/[^\w]/gi, '-')}
            style={{
                boxSizing: 'border-box',
                position: 'absolute',
                top: animatedProps.y,
                left: animatedProps.x,
                width: animatedProps.width,
                height: animatedProps.height,
                background: animatedProps.color,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth,
                borderStyle: 'solid',
                borderColor: node.borderColor,
                opacity: node.opacity,
            }}
            onMouseEnter={node.onMouseEnter}
            onMouseMove={node.onMouseMove}
            onMouseLeave={node.onMouseLeave}
            onClick={node.onClick}
        >
            {showLabel && (
                <span
                    style={{
                        ...theme.labels.text,
                        color: node.labelTextColor,
                        //transform: `rotate(${rotate ? '-90' : '0'}deg)`,
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        MsUserSelect: 'none',
                        userSelect: 'none',
                    }}
                >
                    {node.label}
                </span>
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
