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
import { merge } from 'lodash'
import { Motion, TransitionMotion, spring } from 'react-motion'
import Nivo, { defaultTheme } from '../../../Nivo'
import { marginPropType, motionPropTypes } from '../../../props'
import { getColorsGenerator, getInheritedColorGenerator } from '../../../lib/colorUtils'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { degreesToRadians, radiansToDegrees } from '../../../lib/arcUtils'
import SvgWrapper from '../SvgWrapper'
import { pie as d3Pie, arc as d3Arc } from 'd3-shape'
import PieRadialLabels from './PieRadialLabels'
import PieSlicesLabels from './PieSlicesLabels'

export default class Pie extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
            })
        ).isRequired,

        // dimensions
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: marginPropType,

        innerRadius: PropTypes.number.isRequired,
        padAngle: PropTypes.number.isRequired,
        cornerRadius: PropTypes.number.isRequired,

        // border
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        // radial labels
        enableRadialLabels: PropTypes.bool.isRequired,
        radialLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        radialLabelsSkipAngle: PropTypes.number,
        radialLabelsTextXOffset: PropTypes.number,
        radialLabelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        radialLabelsLinkOffset: PropTypes.number,
        radialLabelsLinkDiagonalLength: PropTypes.number,
        radialLabelsLinkHorizontalLength: PropTypes.number,
        radialLabelsLinkStrokeWidth: PropTypes.number,
        radialLabelsLinkColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        // slices labels
        enableSlicesLabels: PropTypes.bool.isRequired,
        sliceLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        slicesLabelsSkipAngle: PropTypes.number,
        slicesLabelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        // theming
        theme: PropTypes.object.isRequired,
        colors: PropTypes.any.isRequired,
        colorBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        // motion
        ...motionPropTypes,
    }

    static defaultProps = {
        // dimensions
        margin: Nivo.defaults.margin,

        innerRadius: 0,
        padAngle: 0,
        cornerRadius: 0,

        // border
        borderWidth: 0,
        borderColor: 'inherit:darker(1)',

        // radial labels
        enableRadialLabels: true,
        radialLabel: 'id',
        radialLabelsTextColor: 'theme',
        radialLabelsLinkColor: 'theme',

        // slices labels
        enableSlicesLabels: true,
        sliceLabel: 'value',
        slicesLabelsTextColor: 'theme',

        // theming
        theme: {},
        colors: Nivo.defaults.colorRange,
        colorBy: 'id',

        // motion
        animate: true,
        motionStiffness: Nivo.defaults.motionStiffness,
        motionDamping: Nivo.defaults.motionDamping,
    }

    render() {
        const {
            data,

            // dimensions
            margin: _margin,
            width: _width,
            height: _height,

            innerRadius: _innerRadius,
            padAngle: _padAngle,
            cornerRadius,

            // border
            borderWidth,
            borderColor: _borderColor,

            // radial labels
            enableRadialLabels,
            radialLabel,
            radialLabelsSkipAngle,
            radialLabelsLinkOffset,
            radialLabelsLinkDiagonalLength,
            radialLabelsLinkHorizontalLength,
            radialLabelsLinkStrokeWidth,
            radialLabelsTextXOffset,
            radialLabelsTextColor,
            radialLabelsLinkColor,

            // slices labels
            enableSlicesLabels,
            sliceLabel,
            slicesLabelsSkipAngle,
            slicesLabelsTextColor,

            // theming
            theme: _theme,
            colors,
            colorBy,

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

        const padAngle = degreesToRadians(_padAngle)

        const theme = merge({}, defaultTheme, _theme)
        const color = getColorsGenerator(colors, colorBy)
        const borderColor = getInheritedColorGenerator(_borderColor)

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        const radialLabelsProps = {
            label: getLabelGenerator(radialLabel),
            skipAngle: radialLabelsSkipAngle,
            linkOffset: radialLabelsLinkOffset,
            linkDiagonalLength: radialLabelsLinkDiagonalLength,
            linkHorizontalLength: radialLabelsLinkHorizontalLength,
            linkStrokeWidth: radialLabelsLinkStrokeWidth,
            textXOffset: radialLabelsTextXOffset,
            textColor: getInheritedColorGenerator(radialLabelsTextColor, 'axis.textColor'),
            linkColor: getInheritedColorGenerator(radialLabelsLinkColor, 'axis.tickColor'),
        }

        const slicesLabelsProps = {
            label: getLabelGenerator(sliceLabel),
            skipAngle: slicesLabelsSkipAngle,
            textColor: getInheritedColorGenerator(slicesLabelsTextColor, 'axis.textColor'),
        }

        const radius = Math.min(width, height) / 2
        const innerRadius = radius * Math.min(_innerRadius, 1)

        const pie = d3Pie()
        pie.value(d => d.value)

        const arc = d3Arc()
        arc.outerRadius(radius)

        return (
            <SvgWrapper width={_width} height={_height} margin={margin}>
                <Motion
                    style={{
                        centerX: spring(centerX, motionProps),
                        centerY: spring(centerY, motionProps),
                        innerRadius: spring(innerRadius),
                        padAngle: spring(padAngle, motionProps),
                        cornerRadius: spring(cornerRadius, motionProps),
                    }}
                >
                    {interpolatingStyle => {
                        const interpolatedPie = pie.padAngle(interpolatingStyle.padAngle)
                        const interpolatedArc = arc
                            .cornerRadius(interpolatingStyle.cornerRadius)
                            .innerRadius(interpolatingStyle.innerRadius)

                        const arcsData = interpolatedPie(data).map(d => {
                            const angle = d.endAngle - d.startAngle

                            return {
                                ...d,
                                angle,
                                angleDegrees: radiansToDegrees(angle),
                                data: {
                                    ...d.data,
                                    color: color(d.data),
                                },
                            }
                        })

                        return (
                            <g
                                transform={`translate(${interpolatingStyle.centerX}, ${interpolatingStyle.centerY})`}
                            >
                                {arcsData.map(d => {
                                    return (
                                        <path
                                            key={d.data.id}
                                            d={interpolatedArc(d)}
                                            fill={d.data.color}
                                            strokeWidth={borderWidth}
                                            stroke={borderColor(d.data)}
                                        />
                                    )
                                })}
                                {enableSlicesLabels &&
                                    <PieSlicesLabels
                                        data={arcsData}
                                        radius={radius}
                                        innerRadius={interpolatingStyle.innerRadius}
                                        theme={theme}
                                        {...slicesLabelsProps}
                                    />}
                                {enableRadialLabels &&
                                    <PieRadialLabels
                                        data={arcsData}
                                        radius={radius}
                                        theme={theme}
                                        {...radialLabelsProps}
                                    />}
                            </g>
                        )
                    }}
                </Motion>
            </SvgWrapper>
        )
    }
}
