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

const TreeMapHtmlNode = ({ node, style, handlers }) => {
    if (style.width <= 0 || style.height <= 0) return null

    const rotate = node.label && style.orientLabel && style.height > style.width

    return (
        <div
            id={(node.data && node.data.id
                ? node.data.id
                : // replace special characters with "-"
                  node.id
            ).replace(/[^\w]/gi, '-')}
            style={{
                boxSizing: 'border-box',
                position: 'absolute',
                top: style.y,
                left: style.x,
                width: style.width,
                height: style.height,
                background: style.color,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: style.borderWidth,
                borderStyle: 'solid',
                borderColor: style.borderColor,
            }}
            {...handlers}
        >
            {node.label !== false && (
                <span
                    style={{
                        color: style.labelTextColor,
                        transform: `rotate(${rotate ? '-90' : '0'}deg)`,
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        MsUserSelect: 'none',
                        userSelect: 'none',
                    }}
                >
                    {node.label}
                </span>
            )}
        </div>
    )
}

TreeMapHtmlNode.propTypes = {
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
}

export default TreeMapHtmlNode
