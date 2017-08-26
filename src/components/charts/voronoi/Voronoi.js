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
import Nivo from '../../../Nivo'
import { voronoi as VoronoiGenerator } from 'd3-voronoi'

class Voronoi extends Component {
    render() {
        const {
            data,
            width: _width,
            height: _height,
            margin: _margin,
            x,
            y,
            enableSites,
            enableLinks,
            enablePolygons,
            borderWidth,
            borderColor,
            linkWidth,
            linkColor,
        } = this.props

        const margin = Object.assign({}, Nivo.defaults.margin, _margin)
        const width = _width - margin.left - margin.right
        const height = _height - margin.top - margin.bottom

        const voronoi = VoronoiGenerator()
            .x(d => d[x])
            .y(d => d[y])
            .extent([[0, 0], [width, height]])

        const polygons = voronoi.polygons(data)
        const links = voronoi.links(data)

        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={_width} height={_height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    {enableLinks &&
                        links.map((l, i) => {
                            return (
                                <line
                                    key={i}
                                    fill="none"
                                    stroke={linkColor}
                                    strokeWidth={linkWidth}
                                    x1={l.source[0]}
                                    y1={l.source[1]}
                                    x2={l.target[0]}
                                    y2={l.target[1]}
                                />
                            )
                        })}
                    {enablePolygons &&
                        polygons.map((p, i) => {
                            return (
                                <path
                                    key={i}
                                    fill="none"
                                    stroke={borderColor}
                                    strokeWidth={borderWidth}
                                    d={`M${p.join('L')}Z`}
                                />
                            )
                        })}
                    {enableSites &&
                        data.map((d, i) => {
                            return (
                                <circle
                                    key={i}
                                    r="2.5"
                                    cx={d[0]}
                                    cy={d[1]}
                                    fill="#F00"
                                    stroke="none"
                                />
                            )
                        })}
                </g>
            </svg>
        )
    }
}

Voronoi.propTypes = {
    enableSites: PropTypes.bool.isRequired,
    enableLinks: PropTypes.bool.isRequired,
    enablePolygons: PropTypes.bool.isRequired,
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    colors: PropTypes.any.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    linkWidth: PropTypes.number.isRequired,
    linkColor: PropTypes.string.isRequired,
}

Voronoi.defaultProps = {
    enableSites: true,
    enableLinks: true,
    enablePolygons: true,
    x: 0,
    y: 1,
    borderWidth: 1,
    borderColor: '#000',
    linkWidth: 1,
    linkColor: '#bbb',
    colors: Nivo.defaults.colorRange,
}

export default Voronoi
