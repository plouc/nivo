/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { Container, SvgWrapper } from '@nivo/core'
import { Grid, Axes } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import enhance from './enhance'
import { ScatterPlotPropTypes } from './props'
import ScatterPlotItem from './ScatterPlotItem'

const ScatterPlot = ({
    data,

    xScale,
    yScale,

    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    // axes & grid
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX,
    enableGridY,

    // theming
    theme,
    getColor,

    // symbols,
    symbolSize,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
    tooltipFormat,
    onClick,

    legends,
}) => {
    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    const springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    const legendData = data.map(serie => ({
        label: serie.id,
        fill: getColor(serie),
    }))

    const symbols = data.reduce(
        (agg, serie) => [
            ...agg,
            ...serie.data.map(d => ({
                id: `${serie.id}.${d.id}`,
                x: xScale(d.x),
                y: yScale(d.y),
                color: getColor(serie),
                data: { ...d, serie: serie.id },
            })),
        ],
        []
    )

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                    <Grid
                        theme={theme}
                        width={width}
                        height={height}
                        xScale={enableGridX ? xScale : null}
                        yScale={enableGridY ? yScale : null}
                        {...motionProps}
                    />
                    <Axes
                        xScale={xScale}
                        yScale={yScale}
                        width={width}
                        height={height}
                        theme={theme}
                        top={axisTop}
                        right={axisRight}
                        bottom={axisBottom}
                        left={axisLeft}
                        {...motionProps}
                    />
                    {!animate &&
                        symbols.map(symbol => (
                            <ScatterPlotItem
                                key={symbol.id}
                                x={symbol.x}
                                y={symbol.y}
                                size={symbolSize}
                                color={symbol.color}
                                data={symbol.data}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                tooltipFormat={tooltipFormat}
                                onClick={onClick}
                                theme={theme}
                            />
                        ))}
                    {animate === true && (
                        <TransitionMotion
                            styles={symbols.map(symbol => ({
                                key: symbol.id,
                                data: symbol,
                                style: {
                                    x: spring(symbol.x, springConfig),
                                    y: spring(symbol.y, springConfig),
                                },
                            }))}
                        >
                            {interpolatedStyles => (
                                <g>
                                    {interpolatedStyles.map(({ key, style, data: symbol }) => (
                                        <ScatterPlotItem
                                            key={key}
                                            x={style.x}
                                            y={style.y}
                                            size={symbolSize}
                                            color={symbol.color}
                                            data={symbol.data}
                                            showTooltip={showTooltip}
                                            hideTooltip={hideTooltip}
                                            tooltipFormat={tooltipFormat}
                                            onClick={onClick}
                                            theme={theme}
                                        />
                                    ))}
                                </g>
                            )}
                        </TransitionMotion>
                    )}
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

ScatterPlot.propTypes = ScatterPlotPropTypes

export default enhance(ScatterPlot)
