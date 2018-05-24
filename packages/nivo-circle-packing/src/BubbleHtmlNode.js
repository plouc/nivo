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

const BubbleHtmlNode = ({ node, style, handlers }) => {
    if (style.r <= 0) return null

    return (
        <div
            id={(node.data && node.data.id
                ? node.data.id
                : // replace special characters with "-"
                  node.id
            ).replace(/[^\w]/gi, '-')}
            style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: style.color,
                color: style.labelTextColor,
                borderWidth: style.borderWidth,
                borderColor: style.borderColor,
                top: style.y - style.r,
                left: style.x - style.r,
                width: style.r * 2,
                height: style.r * 2,
                borderStyle: 'solid',
                borderRadius: style.r,
            }}
            {...handlers}
        >
            {node.label !== false && node.label}
        </div>
    )
}

BubbleHtmlNode.propTypes = {
    node: PropTypes.object.isRequired,
    style: PropTypes.shape({
        r: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        fill: PropTypes.string,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        labelTextColor: PropTypes.string.isRequired,
    }).isRequired,
    handlers: PropTypes.object.isRequired,
}

export default BubbleHtmlNode
