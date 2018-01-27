/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { Container, SvgWrapper, SensorXY, IndicatorXY } from '@nivo/core'
import { Grid, Axes } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import setDisplayName from 'recompose/setDisplayName'
import enhance from '../enhance'
import { ScatterPlotPropTypes } from '../props'
import ScatterPlotItem from './ScatterPlotItem'

class ScatterPlotSvg extends Component {
    state = {
        sensorX: null,
        sensorY: null,
        selectedPoints: []
    }

    handleSensor = ({ x, y, points }) => {
        this.setState({
            sensorX: x !== undefined ? x : null,
            sensorY: y !== undefined ? y : null,
            selectedPoints: points
        })
    }

    render() {
        const {
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
        } = this.props

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        const springConfig = {
            damping:   motionDamping,
            stiffness: motionStiffness,
        }

        const legendData = data.map(serie => ({
            label: serie.id,
            fill:  getColor(serie),
        }))

        const symbols = data.reduce(
            (agg, serie) => [
                ...agg,
                ...serie.data.map(d => ({
                    id:    `${serie.id}.${d.id}`,
                    x:     xScale(d.x),
                    y:     yScale(d.y),
                    color: getColor(serie),
                    data:  {...d, serie: serie.id},
                })),
            ],
            []
        )

        const { sensorX, sensorY, selectedPoints } = this.state

        console.log('selectedPoints', selectedPoints)

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({showTooltip, hideTooltip}) => (
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
                        <IndicatorXY
                            width={width}
                            height={height}
                            x={sensorX}
                            y={sensorY}
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
                                    key:   symbol.id,
                                    data:  symbol,
                                    style: {
                                        x: spring(symbol.x, springConfig),
                                        y: spring(symbol.y, springConfig),
                                    },
                                }))}
                            >
                                {interpolatedStyles => (
                                    <g>
                                        {interpolatedStyles.map(({key, style, data: symbol}) => (
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
                        <SensorXY
                            width={width}
                            height={height}
                            xScale={xScale}
                            yScale={yScale}
                            data={data}
                            onMatch={this.handleSensor}
                        />
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
}

ScatterPlotSvg.propTypes = ScatterPlotPropTypes

export default setDisplayName('ScatterPlotSvg')(enhance(ScatterPlotSvg))
