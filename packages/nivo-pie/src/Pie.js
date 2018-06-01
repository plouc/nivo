/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import setDisplayName from 'recompose/setDisplayName'
import { getInheritedColorGenerator } from '@nivo/core'
import { getLabelGenerator } from '@nivo/core'
import { Container, SvgWrapper } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import PieSlice from './PieSlice'
import PieRadialLabels from './PieRadialLabels'
import PieSlicesLabels from './PieSlicesLabels'
import { PiePropTypes } from './props'
import enhance from './enhance'
import PieLayout from './PieLayout'

class Pie extends Component {
    static propTypes = PiePropTypes

    render() {
        const {
            data,
            sortByValue,

            startAngle,
            endAngle,
            padAngle,
            innerRadius,
            cornerRadius,

            // dimensions
            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            colors,
            colorBy,

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
            boundDefs,

            // motion
            animate,
            motionStiffness,
            motionDamping,

            // interactivity
            isInteractive,
            onClick,
            tooltipFormat,
            tooltip,

            legends,
            legendData,
        } = this.props

        const borderColor = getInheritedColorGenerator(_borderColor)

        return (
            <PieLayout
                width={width}
                height={height}
                data={data}
                sortByValue={sortByValue}
                startAngle={startAngle}
                endAngle={endAngle}
                padAngle={padAngle}
                innerRadius={innerRadius}
                cornerRadius={cornerRadius}
                colors={colors}
                colorBy={colorBy}
            >
                {({ centerX, centerY, radius, innerRadius, arcs, arcGenerator }) => {
                    //console.log(arcs)
                    return (
                        <Container isInteractive={isInteractive} theme={theme}>
                            {({ showTooltip, hideTooltip }) => (
                                <SvgWrapper
                                    width={outerWidth}
                                    height={outerHeight}
                                    margin={margin}
                                    //defs={boundDefs}
                                >
                                    <g transform={`translate(${centerX},${centerY})`}>
                                        {arcs.map(arc => (
                                            <PieSlice
                                                key={arc.data.id}
                                                data={arc.data}
                                                path={arcGenerator(arc)}
                                                color={arc.color}
                                                fill={arc.color}
                                                borderWidth={borderWidth}
                                                borderColor={borderColor(arc)}
                                                showTooltip={showTooltip}
                                                hideTooltip={hideTooltip}
                                                tooltipFormat={tooltipFormat}
                                                tooltip={tooltip}
                                                onClick={onClick}
                                                theme={theme}
                                            />
                                        ))}
                                        {enableRadialLabels && (
                                            <PieRadialLabels
                                                data={arcs}
                                                radius={radius}
                                                label={getLabelGenerator(radialLabel)}
                                                skipAngle={radialLabelsSkipAngle}
                                                linkOffset={radialLabelsLinkOffset}
                                                linkDiagonalLength={radialLabelsLinkDiagonalLength}
                                                linkHorizontalLength={
                                                    radialLabelsLinkHorizontalLength
                                                }
                                                linkStrokeWidth={radialLabelsLinkStrokeWidth}
                                                textXOffset={radialLabelsTextXOffset}
                                                textColor={getInheritedColorGenerator(
                                                    radialLabelsTextColor,
                                                    'labels.textColor'
                                                )}
                                                linkColor={getInheritedColorGenerator(
                                                    radialLabelsLinkColor,
                                                    'axis.tickColor'
                                                )}
                                                theme={theme}
                                            />
                                        )}
                                        {enableSlicesLabels && (
                                            <PieSlicesLabels
                                                data={arcs}
                                                radius={radius}
                                                innerRadius={innerRadius}
                                                theme={theme}
                                                label={getLabelGenerator(sliceLabel)}
                                                skipAngle={slicesLabelsSkipAngle}
                                                textColor={getInheritedColorGenerator(
                                                    slicesLabelsTextColor,
                                                    'labels.textColor'
                                                )}
                                            />
                                        )}
                                    </g>
                                </SvgWrapper>
                            )}
                        </Container>
                    )
                }}
            </PieLayout>
        )

        /*
        const springConfig = {
            motionDamping,
            motionStiffness,
            precision: 0.001,
        }

        const motionProps = {
            animate,
            ...springConfig,
        }

        const radialLabelsProps = {
        }

        const slicesLabelsProps = {
            label: getLabelGenerator(sliceLabel),
            skipAngle: slicesLabelsSkipAngle,
            textColor: getInheritedColorGenerator(slicesLabelsTextColor, 'labels.textColor'),
        }

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
                                cornerRadius: spring(cornerRadius, motionProps),
                            }}
                        >
                            {interpolatingStyle => {
                                const interpolatedArc = arc
                                    .cornerRadius(interpolatingStyle.cornerRadius)
                                    .innerRadius(interpolatingStyle.innerRadius)

                                return (
                                    <g
                                        transform={`translate(${interpolatingStyle.centerX}, ${
                                            interpolatingStyle.centerY
                                        })`}
                                    >
                                        {arcsData.map(d => {
                                            return (
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
                                                    tooltipFormat={tooltipFormat}
                                                    tooltip={tooltip}
                                                    theme={theme}
                                                    onClick={onClick}
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
        */
    }
}

export default setDisplayName('Pie')(enhance(Pie))
