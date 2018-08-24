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

const WaffleCellHtml = ({
    position,
    size,
    x,
    y,
    color,
    opacity,
    borderWidth,
    borderColor,
    data,
    onHover,
    onLeave,
    onClick,
}) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: size,
                height: size,
                background: color,
                opacity,
                boxSizing: 'content-box',
                borderStyle: 'solid',
                borderWidth: `${borderWidth}px`,
                borderColor,
            }}
            onMouseEnter={onHover}
            onMouseMove={onHover}
            onMouseLeave={onLeave}
            onClick={event => {
                onClick({ position, color, x, y, data }, event)
            }}
        />
    )
}

WaffleCellHtml.propTypes = {
    position: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onHover: PropTypes.func.isRequired,
    onLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}
WaffleCellHtml.defaultProps = {
    data: {},
}
WaffleCellHtml.displayName = 'WaffleCellHtml'

export default pure(WaffleCellHtml)
