/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { range, max, maxBy, sumBy, uniq } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { merge } from 'lodash'
import Nivo, { defaultTheme } from '../../../Nivo'
import { marginPropType, motionPropTypes, closedCurvePropType } from '../../../props'
import { getColorsGenerator } from '../../../lib/colorUtils'
import SvgWrapper from '../SvgWrapper'
import { scaleLinear } from 'd3-scale'
import RadarShapes from './RadarShapes'
import RadarGrid from './RadarGrid'
import RadarMarkers from './RadarMarkers'

export default class Radar extends Component {
    static propTypes = {
        // data
        facets: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            .isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                data: PropTypes.arrayOf(PropTypes.number).isRequired,
            })
        ).isRequired,

        curve: closedCurvePropType.isRequired,

        // dimensions
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: marginPropType,

        // border
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        // grid
        gridLevels: PropTypes.number,
        gridShape: PropTypes.oneOf(['circular', 'linear']),
        gridLabelOffset: PropTypes.number,

        // markers
        enableMarkers: PropTypes.bool.isRequired,
        markersSize: PropTypes.number,
        markersColor: PropTypes.any,
        markersBorderWidth: PropTypes.number,
        markersBorderColor: PropTypes.any,

        // theming
        theme: PropTypes.object.isRequired,
        colors: PropTypes.any.isRequired,
        colorBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        fillOpacity: PropTypes.number.isRequired,

        // motion
        ...motionPropTypes,
    }

    static defaultProps = {
        // dimensions
        margin: Nivo.defaults.margin,

        curve: 'linearClosed',

        // border
        borderWidth: 2,
        borderColor: 'inherit',

        // grid
        gridLevels: 5,
        gridShape: 'circular',
        gridLabelOffset: 16,

        // markers
        enableMarkers: true,

        // theming
        theme: {},
        colors: Nivo.defaults.colorRange,
        colorBy: 'id',
        fillOpacity: 0.15,

        // motion
        animate: true,
        motionStiffness: Nivo.defaults.motionStiffness,
        motionDamping: Nivo.defaults.motionDamping,
    }

    render() {
        const {
            facets,
            data: _data,

            curve,

            // dimensions
            margin: _margin,
            width: _width,
            height: _height,

            // border
            borderWidth,
            borderColor,

            // grid
            gridLevels,
            gridShape,
            gridLabelOffset,

            // markers
            enableMarkers,
            markersSize,
            markersColor,
            markersBorderWidth,
            markersBorderColor,

            // theming
            theme: _theme,
            colors,
            colorBy,
            fillOpacity,

            // motion
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const margin = Object.assign({}, Nivo.defaults.margin, _margin)
        const width = _width - margin.left - margin.right
        const height = _height - margin.top - margin.bottom
        const centerX = width / 2
        const centerY = height / 2

        const theme = merge({}, defaultTheme, _theme)
        const color = getColorsGenerator(colors, colorBy)

        const data = _data.map(d => Object.assign({}, d, { color: color(d) }))

        const maxValue = max(data.reduce((acc, serie) => [...acc, ...serie.data], []))

        const radius = Math.min(width, height) / 2
        const radiusScale = scaleLinear().range([0, radius]).domain([0, maxValue])
        const angleStep = Math.PI * 2 / facets.length

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        return (
            <SvgWrapper width={_width} height={_height} margin={margin}>
                <g transform={`translate(${centerX}, ${centerY})`}>
                    <RadarGrid
                        levels={gridLevels}
                        shape={gridShape}
                        radius={radius}
                        angleStep={angleStep}
                        theme={theme}
                        facets={facets}
                        labelOffset={gridLabelOffset}
                        {...motionProps}
                    />
                    <RadarShapes
                        facets={facets}
                        data={data}
                        radiusScale={radiusScale}
                        curve={curve}
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                        fillOpacity={fillOpacity}
                        {...motionProps}
                    />
                    {enableMarkers &&
                        <RadarMarkers
                            data={data}
                            radiusScale={radiusScale}
                            angleStep={angleStep}
                            size={markersSize}
                            color={markersColor}
                            borderWidth={markersBorderWidth}
                            borderColor={markersBorderColor}
                            {...motionProps}
                        />}
                </g>
            </SvgWrapper>
        )
    }
}
