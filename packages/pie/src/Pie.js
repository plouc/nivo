/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import setDisplayName from 'recompose/setDisplayName'
import {
    withTheme,
    withDimensions,
    getLabelGenerator,
    Container,
    SvgWrapper,
    bindDefs,
} from '@nivo/core'
import { getInheritedColorGenerator } from '@nivo/colors'
import { PieDefaultProps } from './props'
import PieSlice from './PieSlice'
import PieRadialLabels from './PieRadialLabels'
import PieSlicesLabels from './PieSlicesLabels'
import { PiePropTypes } from './props'
import PieLayout from './PieLayout'
import PieLegends from './PieLegends'

class Pie extends Component {
    static propTypes = PiePropTypes

    render() {
        const {
            data,
            sortByValue,

            startAngle,
            endAngle,
            padAngle,
            fit,
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
            getRadialLabel,
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
            getSliceLabel,
            slicesLabelsSkipAngle,
            slicesLabelsTextColor,

            // styling
            theme,
            defs,
            fill,

            // interactivity
            isInteractive,
            onClick,
            onMouseEnter,
            onMouseLeave,
            tooltipFormat,
            tooltip,

            legends,
        } = this.props

        const borderColor = getInheritedColorGenerator(_borderColor, theme)

        return (
            <PieLayout
                width={width}
                height={height}
                data={data}
                sortByValue={sortByValue}
                startAngle={startAngle}
                endAngle={endAngle}
                fit={fit}
                padAngle={padAngle}
                innerRadius={innerRadius}
                cornerRadius={cornerRadius}
                colors={colors}
                colorBy={colorBy}
            >
                {({ centerX, centerY, radius, innerRadius, arcs, arcGenerator }) => {
                    const boundDefs = bindDefs(defs, arcs, fill, {
                        dataKey: 'data',
                    })

                    return (
                        <Container isInteractive={isInteractive} theme={theme} animate={false}>
                            {({ showTooltip, hideTooltip }) => (
                                <SvgWrapper
                                    width={outerWidth}
                                    height={outerHeight}
                                    margin={margin}
                                    defs={boundDefs}
                                    theme={theme}
                                >
                                    <g transform={`translate(${centerX},${centerY})`}>
                                        {arcs.map(arc => (
                                            <PieSlice
                                                key={arc.data.id}
                                                data={arc.data}
                                                path={arcGenerator(arc)}
                                                color={arc.color}
                                                fill={arc.fill ? arc.fill : arc.color}
                                                borderWidth={borderWidth}
                                                borderColor={borderColor(arc)}
                                                showTooltip={showTooltip}
                                                hideTooltip={hideTooltip}
                                                tooltipFormat={tooltipFormat}
                                                tooltip={tooltip}
                                                onClick={onClick}
                                                onMouseEnter={onMouseEnter}
                                                onMouseLeave={onMouseLeave}
                                                theme={theme}
                                            />
                                        ))}
                                        {enableRadialLabels && (
                                            <PieRadialLabels
                                                arcs={arcs}
                                                radius={radius}
                                                label={getRadialLabel}
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
                                                    theme
                                                )}
                                                linkColor={getInheritedColorGenerator(
                                                    radialLabelsLinkColor,
                                                    theme
                                                )}
                                                theme={theme}
                                            />
                                        )}
                                        {enableSlicesLabels && (
                                            <PieSlicesLabels
                                                arcs={arcs}
                                                radius={radius}
                                                innerRadius={innerRadius}
                                                theme={theme}
                                                label={getSliceLabel}
                                                skipAngle={slicesLabelsSkipAngle}
                                                textColor={getInheritedColorGenerator(
                                                    slicesLabelsTextColor,
                                                    theme
                                                )}
                                            />
                                        )}
                                    </g>
                                    <PieLegends
                                        width={width}
                                        height={height}
                                        arcs={arcs}
                                        legends={legends}
                                        theme={theme}
                                    />
                                </SvgWrapper>
                            )}
                        </Container>
                    )
                }}
            </PieLayout>
        )
    }
}

const enhance = Component =>
    compose(
        defaultProps(PieDefaultProps),
        withTheme(),
        withDimensions(),
        withPropsOnChange(['radialLabel'], ({ radialLabel }) => ({
            getRadialLabel: getLabelGenerator(radialLabel),
        })),
        withPropsOnChange(['sliceLabel'], ({ sliceLabel }) => ({
            getSliceLabel: getLabelGenerator(sliceLabel),
        })),
        pure
    )(Component)

export default setDisplayName('Pie')(enhance(Pie))
