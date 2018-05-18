/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { pie as d3Pie, arc as d3Arc } from 'd3-shape'
import { Motion, spring } from 'react-motion'
import { getInheritedColorGenerator } from '@nivo/core'
import { getLabelGenerator } from '@nivo/core'
import { degreesToRadians, radiansToDegrees } from '@nivo/core'
import { bindDefs } from '@nivo/core'
import { Container, SvgWrapper } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import PieSlice from './PieSlice'
import PieRadialLabels from './PieRadialLabels'
import PieSlicesLabels from './PieSlicesLabels'
import { PiePropTypes } from './props'
import enhance from './enhance'

const Pie = ({
    data,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    sortByValue,
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

    // styling
    theme,
    getColor,
    defs,
    fill,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
    onClick,
    tooltipFormat,

    legends,
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
        textColor: getInheritedColorGenerator(radialLabelsTextColor, 'labels.textColor'),
        linkColor: getInheritedColorGenerator(radialLabelsLinkColor, 'axis.tickColor'),
    }

    const slicesLabelsProps = {
        label: getLabelGenerator(sliceLabel),
        skipAngle: slicesLabelsSkipAngle,
        textColor: getInheritedColorGenerator(slicesLabelsTextColor, 'labels.textColor'),
    }

    const radius = Math.min(width, height) / 2
    const innerRadius = radius * Math.min(_innerRadius, 1)

    const pie = d3Pie()
    pie.value(d => d.value)
    if (sortByValue !== true) pie.sortValues(null)

    const arc = d3Arc()
    arc.outerRadius(radius)

    const enhancedData = data.map(d => ({
        ...d,
        color: getColor(d),
    }))

    const legendData = enhancedData.map(d => ({
        label: d.label,
        fill: d.color,
    }))

    const boundDefs = bindDefs(defs, enhancedData, fill)

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper
                    width={outerWidth}
                    height={outerHeight}
                    margin={margin}
                    defs={boundDefs}
                >
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

                            const arcsData = interpolatedPie(enhancedData).map(d => {
                                const angle = d.endAngle - d.startAngle

                                return {
                                    ...d,
                                    angle,
                                    angleDegrees: radiansToDegrees(angle),
                                    data: d.data,
                                }
                            })

                            return (
                                <g
                                    transform={`translate(${interpolatingStyle.centerX}, ${
                                        interpolatingStyle.centerY
                                    })`}
                                >
                                    {arcsData.map(d => (
                                        <PieSlice
                                            key={d.data.id}
                                            data={d.data}
                                            path={interpolatedArc(d)}
                                            color={d.data.color}
                                            fill={d.data.fill ? d.data.fill : d.data.color}
                                            borderWidth={borderWidth}
                                            borderColor={borderColor(d.data)}
                                            showTooltip={showTooltip}
                                            hideTooltip={hideTooltip}
                                            theme={theme}
                                            onClick={onClick}
                                        />
                                    ))}
                                    {enableSlicesLabels && (
                                        <PieSlicesLabels
                                            data={arcsData}
                                            radius={radius}
                                            innerRadius={interpolatingStyle.innerRadius}
                                            theme={theme}
                                            {...slicesLabelsProps}
                                        />
                                    )}
                                    {enableRadialLabels && (
                                        <PieRadialLabels
                                            data={arcsData}
                                            radius={radius}
                                            theme={theme}
                                            {...radialLabelsProps}
                                        />
                                    )}
                                </g>
                            )
                        }}
                    </Motion>
                    {legends.map((legend, i) => (
                        <BoxLegendSvg
                            key={i}
                            {...legend}
                            containerWidth={width}
                            containerHeight={height}
                            data={legendData}
                        />
                    ))}
                </SvgWrapper>
            )}
        </Container>
    )
}

Pie.propTypes = PiePropTypes

const enhancedPie = enhance(Pie)
enhancedPie.displayName = 'enhance(Pie)'

export default enhancedPie
