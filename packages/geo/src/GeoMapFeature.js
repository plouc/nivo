/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

class GeoMapFeature extends Component {
    static propTypes = {
        feature: PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['Feature']).isRequired,
            properties: PropTypes.object,
            geometry: PropTypes.object.isRequired,
        }).isRequired,
        pathHelper: PropTypes.func.isRequired,

        fillColor: PropTypes.string.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,

        onMouseEnter: PropTypes.func.isRequired,
        onMouseMove: PropTypes.func.isRequired,
        onMouseLeave: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
    }

    handleMouseEnter = event => {
        const { onMouseEnter, feature } = this.props
        onMouseEnter(feature, event)
    }

    handleMouseMove = event => {
        const { onMouseMove, feature } = this.props
        onMouseMove(feature, event)
    }

    handleMouseLeave = event => {
        const { onMouseLeave, feature } = this.props
        onMouseLeave(feature, event)
    }

    handleClick = event => {
        const { onClick, feature } = this.props
        onClick(feature, event)
    }

    render() {
        const { feature, pathHelper, fillColor, borderWidth, borderColor } = this.props

        return (
            <path
                key={feature.id}
                style={{ cursor: 'crosshair' }}
                fill={fillColor}
                strokeWidth={borderWidth}
                stroke={borderColor}
                strokeLinejoin="bevel"
                d={pathHelper(feature)}
                onMouseEnter={this.handleMouseEnter}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
            />
        )
    }
}

export default pure(GeoMapFeature)
