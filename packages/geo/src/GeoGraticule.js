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

class GeoGraticule extends Component {
    static propTypes = {
        pathHelper: PropTypes.func.isRequired,
        graticule: PropTypes.func.isRequired,
        lineWidth: PropTypes.number.isRequired,
        lineColor: PropTypes.string.isRequired,
    }

    render() {
        const { pathHelper, graticule, lineWidth, lineColor } = this.props

        return (
            <>
                <path
                    fill="none"
                    strokeWidth={lineWidth}
                    stroke={lineColor}
                    d={pathHelper(graticule())}
                />
            </>
        )
    }
}

export default pure(GeoGraticule)
