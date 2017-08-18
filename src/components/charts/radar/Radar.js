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
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import { closedCurvePropType } from '../../../props'
import { withTheme, withColors, withCurve, withDimensions, withMotion } from '../../../hocs'
import SvgWrapper from '../SvgWrapper'
import { scaleLinear } from 'd3-scale'
import RadarShapes from './RadarShapes'
import RadarGrid from './RadarGrid'
import RadarMarkers from './RadarMarkers'
import { getAccessorFor } from '../../../lib/propertiesConverters'

const Radar = ({
    data,
    keys,
    getIndex,
    indices,

    curveInterpolator,

    radius,
    radiusScale,
    angleStep,

    // dimensions
    centerX,
    centerY,
    margin,
    outerWidth,
    outerHeight,

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
    colorByKey,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
}) => {
    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            <g transform={`translate(${centerX}, ${centerY})`}>
                <RadarGrid
                    levels={gridLevels}
                    shape={gridShape}
                    radius={radius}
                    angleStep={angleStep}
                    theme={theme}
                    indices={indices}
                    labelOffset={gridLabelOffset}
                    {...motionProps}
                />
                <RadarShapes
                    data={data}
                    keys={keys}
                    colorByKey={colorByKey}
                    radiusScale={radiusScale}
                    angleStep={angleStep}
                    curveInterpolator={curveInterpolator}
                    borderWidth={borderWidth}
                    borderColor={borderColor}
                    fillOpacity={fillOpacity}
                    {...motionProps}
                />
                {enableMarkers &&
                    <RadarMarkers
                        data={data}
                        keys={keys}
                        getIndex={getIndex}
                        radiusScale={radiusScale}
                        angleStep={angleStep}
                        size={markersSize}
                        colorByKey={colorByKey}
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
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]).isRequired,
    getIndex: PropTypes.func.isRequired, // computed
    indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        .isRequired, // computed

    curve: closedCurvePropType.isRequired,
    curveInterpolator: PropTypes.func.isRequired, // computed

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
    getColor: PropTypes.func.isRequired, // computed
    colorByKey: PropTypes.object.isRequired, // computed
    fillOpacity: PropTypes.number.isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
}

export const RadarDefaultProps = {
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
    fillOpacity: 0.15,

    // interactivity
    isInteractive: true,
}

const enhance = compose(
    defaultProps(RadarDefaultProps),
    withTheme(),
    withColors({
        defaultColorBy: 'key',
    }),
    withCurve(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['indexBy'], ({ indexBy }) => ({
        getIndex: getAccessorFor(indexBy),
    })),
    withPropsOnChange(['data', 'getIndex'], ({ data, getIndex }) => ({
        indices: data.map(getIndex),
    })),
    withPropsOnChange(['keys', 'getColor'], ({ keys, getColor }) => ({
        colorByKey: keys.reduce((mapping, key, index) => {
            mapping[key] = getColor({ key, index })
            return mapping
        }, {}),
    })),
    withPropsOnChange(
        (props, nextProps) =>
            props.keys !== nextProps.keys ||
            props.indexBy !== nextProps.indexBy ||
            props.data !== nextProps.data ||
            props.width !== nextProps.width ||
            props.height !== nextProps.height,
        ({ data, keys, width, height }) => {
            const maxValue = max(data.reduce((acc, d) => [...acc, ...keys.map(key => d[key])], []))

            const radius = Math.min(width, height) / 2
            const radiusScale = scaleLinear().range([0, radius]).domain([0, maxValue])

            return {
                data,
                radius,
                radiusScale,
                centerX: width / 2,
                centerY: height / 2,
                angleStep: Math.PI * 2 / data.length,
            }
        }
    ),
    pure
)

export default enhance(Radar)
