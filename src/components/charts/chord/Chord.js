/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Nivo from '../../../Nivo'
import { margin as marginPropType } from '../../../PropTypes'
import { getColorRange } from '../../../ColorUtils'

import { chord as d3Chord, arc as Arc, ribbon as Ribbon, rgb } from 'd3'

class Chord extends Component {
    render() {
        const {
            data,
            margin: _margin,
            width: _width,
            height: _height,
            padAngle,
            innerRadiusRatio,
            innerRadiusOffset,
            ribbonOpacity,
            ribbonBorderWidth,
            arcOpacity,
            arcBorderWidth,
            colors,
        } = this.props

        const color = getColorRange(colors)

        const margin = Object.assign({}, Nivo.defaults.margin, _margin)
        const width = _width - margin.left - margin.right
        const height = _height - margin.top - margin.bottom
        const radius = Math.min(width, height) / 2
        const arcInnerRadius = radius * innerRadiusRatio
        const ribbonRadius = radius * (innerRadiusRatio - innerRadiusOffset)

        const chord = d3Chord().padAngle(padAngle)

        const arc = Arc().innerRadius(arcInnerRadius).outerRadius(radius)

        const ribbon = Ribbon().radius(ribbonRadius)

        const ribbons = chord(data)
        const arcs = ribbons.groups

        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="nivo_chord"
                width={_width}
                height={_height}
            >
                <g
                    className="nivo_chord_wrapper"
                    transform={`translate(${_width / 2},${_height / 2})`}
                >
                    <g className="nivo_chord_ribbons">
                        {ribbons.map(d => {
                            let c = rgb(color(d.source.index))
                            c = rgb(c.r, c.g, c.b, ribbonOpacity)

                            return (
                                <path
                                    key={`ribbon.${d.source.index}.${d.target
                                        .index}`}
                                    className="nivo_chord_ribbon"
                                    d={ribbon(d)}
                                    fill={c}
                                    stroke={c}
                                    strokeWidth={ribbonBorderWidth}
                                />
                            )
                        })}
                    </g>
                    <g className="nivo_chord_arcs">
                        {arcs.map(d => {
                            let c = rgb(color(d.index))
                            c = rgb(c.r, c.g, c.b, arcOpacity)

                            return (
                                <path
                                    key={`arc.${d.index}`}
                                    className="nivo_chord_arc"
                                    d={arc(d)}
                                    fill={c}
                                    stroke={c}
                                    strokeWidth={arcBorderWidth}
                                />
                            )
                        })}
                    </g>
                </g>
            </svg>
        )
    }
}

Chord.propTypes = {
    data: PropTypes.array.isRequired,
    // dimensions
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: marginPropType,

    padAngle: PropTypes.number.isRequired,
    innerRadiusRatio: PropTypes.number.isRequired,
    innerRadiusOffset: PropTypes.number.isRequired,

    ribbonOpacity: PropTypes.number.isRequired,
    ribbonBorderWidth: PropTypes.number.isRequired,

    // colors
    colors: PropTypes.any.isRequired,
}

Chord.defaultProps = {
    // dimensions
    margin: Nivo.defaults.margin,

    padAngle: 0,
    innerRadiusRatio: 0.9,
    innerRadiusOffset: 0,

    ribbonOpacity: 0.5,
    ribbonBorderWidth: 1,

    arcOpacity: 1,
    arcBorderWidth: 1,

    // colors
    colors: Nivo.defaults.colorRange,
}

export default Chord
