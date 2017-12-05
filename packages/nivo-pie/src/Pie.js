/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Motion, TransitionMotion, spring } from 'react-motion'
import { getInheritedColorGenerator } from '@nivo/core'
import { getLabelGenerator } from '@nivo/core'
import { degreesToRadians, radiansToDegrees } from '@nivo/core'
import { bindDefs } from '@nivo/core'
import { Container, SvgWrapper } from '@nivo/core'
import { BasicTooltip } from '@nivo/core'
import { pie as d3Pie, arc as d3Arc } from 'd3-shape'
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
    tooltipFormat,
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

    const enhancedData = data.map(d => {
        const color = getColor(d)
        return { ...d, color }
    })

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
                                                    theme={theme}
                                                    format={tooltipFormat}
                                                />,
                                                e
                                            )

                                        return (
                                            <path
                                                key={d.data.id}
                                                d={interpolatedArc(d)}
                                                fill={d.data.fill ? d.data.fill : d.data.color}
                                                strokeWidth={borderWidth}
                                                stroke={borderColor(d.data)}
                                                onMouseEnter={handleTooltip}
                                                onMouseMove={handleTooltip}
                                                onMouseLeave={hideTooltip}
                                            />
                                        )
                                    })}
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
                </SvgWrapper>
            )}
        </Container>
    )
}

Pie.propTypes = PiePropTypes

const enhancedPie = enhance(Pie)
enhancedPie.displayName = 'enhance(Pie)'

export default enhancedPie
