/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { max, isEqual, merge } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import Nivo, { defaultTheme } from '../../../Nivo'
import { marginPropType, motionPropTypes, closedCurvePropType } from '../../../props'
import { getColorsGenerator } from '../../../lib/colorUtils'
import SvgWrapper from '../SvgWrapper'
import { scaleLinear } from 'd3-scale'
import RadarShapes from './RadarShapes'
import RadarGrid from './RadarGrid'
import RadarMarkers from './RadarMarkers'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'

const Radar = ({
    facets,
    data,

    curve,

    radius,
    radiusScale,
    angleStep,

    // dimensions
    centerX,
    centerY,
    margin,
    width,
    height,

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
    enableMarkersLabel,
    markersLabel,
    markersLabelFormat,
    markersLabelYOffset,

    // theming
    theme,
    fillOpacity,

    // motion
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    return (
        <SvgWrapper width={width} height={height} margin={margin}>
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
                    data={data}
                    radiusScale={radiusScale}
                    angleStep={angleStep}
                    curve={curve}
                    borderWidth={borderWidth}
                    borderColor={borderColor}
                    fillOpacity={fillOpacity}
                    {...motionProps}
                />
                {enableMarkers &&
                    <RadarMarkers
                        facets={facets}
                        data={data}
                        radiusScale={radiusScale}
                        angleStep={angleStep}
                        size={markersSize}
                        color={markersColor}
                        borderWidth={markersBorderWidth}
                        borderColor={markersBorderColor}
                        enableLabel={enableMarkersLabel}
                        label={markersLabel}
                        labelFormat={markersLabelFormat}
                        labelYOffset={markersLabelYOffset}
                        theme={theme}
                        {...motionProps}
                    />}
            </g>
        </SvgWrapper>
    )
}

Radar.propTypes = {
    // data
    facets: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
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
    enableMarkersLabel: PropTypes.bool,
    markersLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    markersLabelFormat: PropTypes.string,
    markersLabelYOffset: PropTypes.number,

    // theming
    theme: PropTypes.object.isRequired,
    colors: PropTypes.any.isRequired,
    colorBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    fillOpacity: PropTypes.number.isRequired,

    // motion
    ...motionPropTypes,
}

export const RadarDefaultProps = {
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
    colors: 'nivo',
    colorBy: 'id',
    fillOpacity: 0.15,

    // motion
    animate: true,
    motionStiffness: Nivo.defaults.motionStiffness,
    motionDamping: Nivo.defaults.motionDamping,
}

const enhance = compose(
    defaultProps(RadarDefaultProps),
    withPropsOnChange(['theme'], props => ({ theme: merge({}, defaultTheme, props.theme) })),
    withPropsOnChange(['colors', 'colorBy'], ({ colors, colorBy }) => ({
        color: getColorsGenerator(colors, colorBy),
    })),
    withPropsOnChange(
        (props, nextProps) =>
            props.facets !== nextProps.facets ||
            props.data !== nextProps.data ||
            props.width !== nextProps.width ||
            props.color !== nextProps.color ||
            !isEqual(props.margin, nextProps.margin),
        ({ facets, data, color, width: _width, height: _height, margin: _margin }) => {
            const maxValue = max(data.reduce((acc, serie) => [...acc, ...serie.data], []))

            const margin = Object.assign({}, Nivo.defaults.margin, _margin)
            const width = _width - margin.left - margin.right
            const height = _height - margin.top - margin.bottom

            const radius = Math.min(width, height) / 2
            const radiusScale = scaleLinear().range([0, radius]).domain([0, maxValue])

            return {
                data: data.map(d => Object.assign({}, d, { color: color(d) })),
                radius,
                radiusScale,
                centerX: width / 2,
                centerY: height / 2,
                angleStep: Math.PI * 2 / facets.length,
            }
        }
    )
)

export default enhance(Radar)
