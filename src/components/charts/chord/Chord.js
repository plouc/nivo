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
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import { chord as d3Chord, ribbon as Ribbon } from 'd3-chord'
import { arc as Arc } from 'd3-shape'
import { rgb } from 'd3-color'
import { withTheme, withDimensions } from '../../../hocs'
import { getColorRange } from '../../../lib/colorUtils'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'

const Chord = ({
    data,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    padAngle,
    innerRadiusRatio,
    innerRadiusOffset,
    ribbonOpacity,
    ribbonBorderWidth,
    arcOpacity,
    arcBorderWidth,

    // theming
    theme,
    colors,

    // interactivity
    isInteractive,
}) => {
    const centerX = width / 2
    const centerY = height / 2

    const color = getColorRange(colors)

    const radius = Math.min(width, height) / 2
    const arcInnerRadius = radius * innerRadiusRatio
    const ribbonRadius = radius * (innerRadiusRatio - innerRadiusOffset)

    const chord = d3Chord().padAngle(padAngle)

    const arc = Arc().innerRadius(arcInnerRadius).outerRadius(radius)

    const ribbon = Ribbon().radius(ribbonRadius)

    const ribbons = chord(data)
    const arcs = ribbons.groups

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => {
                return (
                    <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                        <g transform={`translate(${centerX}, ${centerY})`}>
                            <g>
                                {ribbons.map(d => {
                                    let c = rgb(color(d.source.index))
                                    c = rgb(c.r, c.g, c.b, ribbonOpacity)

                                    return (
                                        <path
                                            key={`ribbon.${d.source.index}.${d.target.index}`}
                                            className="nivo_chord_ribbon"
                                            d={ribbon(d)}
                                            fill={c}
                                            stroke={c}
                                            strokeWidth={ribbonBorderWidth}
                                        />
                                    )
                                })}
                            </g>
                            <g>
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
                    </SvgWrapper>
                )
            }}
        </Container>
    )
}

Chord.propTypes = {
    data: PropTypes.array.isRequired,

    padAngle: PropTypes.number.isRequired,
    innerRadiusRatio: PropTypes.number.isRequired,
    innerRadiusOffset: PropTypes.number.isRequired,

    ribbonOpacity: PropTypes.number.isRequired,
    ribbonBorderWidth: PropTypes.number.isRequired,

    // colors
    colors: PropTypes.any.isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
}

export const ChordDefaultProps = {
    padAngle: 0,
    innerRadiusRatio: 0.9,
    innerRadiusOffset: 0,

    ribbonOpacity: 0.5,
    ribbonBorderWidth: 1,

    arcOpacity: 1,
    arcBorderWidth: 1,

    // colors
    colors: 'nivo',

    // interactivity
    isInteractive: true,
}

const enhance = compose(defaultProps(ChordDefaultProps), withTheme(), withDimensions(), pure)

export default enhance(Chord)
