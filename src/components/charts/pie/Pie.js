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
import { merge } from 'lodash'
import { Motion, TransitionMotion, spring } from 'react-motion'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { degreesToRadians, radiansToDegrees } from '../../../lib/arcUtils'
import { withTheme, withDimensions, withColors } from '../../../hocs'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import { pie as d3Pie, arc as d3Arc } from 'd3-shape'
import PieRadialLabels from './PieRadialLabels'
import PieSlicesLabels from './PieSlicesLabels'
import BasicTooltip from '../../tooltip/BasicTooltip'

const Pie = ({
    data,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

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
    theme,
    getColor,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
}) => {
    const centerX = width / 2
    const centerY = height / 2

    const padAngle = degreesToRadians(_padAngle)

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
        <Container isInteractive={isInteractive}>
            {({ showTooltip, hideTooltip }) =>
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
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
                                        color: getColor(d.data),
                                    },
                                }
                            })

                            return (
                                <g
                                    transform={`translate(${interpolatingStyle.centerX}, ${interpolatingStyle.centerY})`}
                                >
                                    {arcsData.map(d => {
                                        const handleTooltip = e =>
                                            showTooltip(
                                                <BasicTooltip
                                                    id={d.data.label}
                                                    value={d.data.value}
                                                    enableChip={true}
                                                    color={d.data.color}
                                                />,
                                                e
                                            )

                                        return (
                                            <path
                                                key={d.data.id}
                                                d={interpolatedArc(d)}
                                                fill={d.data.color}
                                                strokeWidth={borderWidth}
                                                stroke={borderColor(d.data)}
                                                onMouseEnter={handleTooltip}
                                                onMouseMove={handleTooltip}
                                                onMouseLeave={hideTooltip}
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
                </SvgWrapper>}
        </Container>
    )
}

Pie.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,

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

    // interactivity
    isInteractive: PropTypes.bool,
}

export const PieDefaultProps = {
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

    // interactivity
    isInteractive: true,
}

const enhance = compose(
    defaultProps(PieDefaultProps),
    withTheme(),
    withDimensions(),
    withColors(),
    pure
)

export default enhance(Pie)
