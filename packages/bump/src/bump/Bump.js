/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useState, Fragment } from 'react'
import { withContainer, useDimensions, SvgWrapper } from '@nivo/core'
import { Grid, Axes } from '@nivo/axes'
import { useBump } from './hooks'
import { BumpPropTypes, BumpDefaultProps } from './props'
import Line from './Line'
import LinesLabels from './LinesLabels'
import Points from './Points'

const Bump = props => {
    const {
        data,

        width,
        height,
        margin: partialMargin,

        layers,

        interpolation,
        xPadding,
        xOuterPadding,
        yOuterPadding,

        colors,
        lineWidth,
        activeLineWidth,
        inactiveLineWidth,
        opacity,
        activeOpacity,
        inactiveOpacity,

        startLabel,
        startLabelPadding,
        startLabelTextColor,
        endLabel,
        endLabelPadding,
        endLabelTextColor,

        pointComponent,
        pointSize,
        activePointSize,
        inactivePointSize,
        pointColor,
        pointBorderWidth,
        activePointBorderWidth,
        inactivePointBorderWidth,
        pointBorderColor,

        axisTop,
        axisRight,
        axisBottom,
        axisLeft,
        enableGridX,
        enableGridY,

        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    } = props

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const [currentSerie, setCurrentSerie] = useState(null)

    const { series, points, xScale, yScale, lineGenerator } = useBump({
        width: innerWidth,
        height: innerHeight,
        data,
        interpolation,
        xPadding,
        xOuterPadding,
        yOuterPadding,
        lineWidth,
        activeLineWidth,
        inactiveLineWidth,
        colors,
        opacity,
        activeOpacity,
        inactiveOpacity,
        pointSize,
        activePointSize,
        inactivePointSize,
        pointColor,
        pointBorderWidth,
        activePointBorderWidth,
        inactivePointBorderWidth,
        pointBorderColor,
        startLabel,
        endLabel,
        isInteractive,
        currentSerie,
    })

    const layerById = {
        grid: (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
            />
        ),
        axes: (
            <Axes
                key="axes"
                xScale={xScale}
                yScale={yScale}
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        ),
        labels: [],
        lines: (
            <Fragment key="lines">
                {series.map(serie => (
                    <Line
                        key={serie.id}
                        serie={serie}
                        currentSerie={currentSerie}
                        setCurrentSerie={setCurrentSerie}
                        lineGenerator={lineGenerator}
                        yStep={yScale.step()}
                        margin={margin}
                        isInteractive={isInteractive}
                        onMouseEnter={onMouseEnter}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        onClick={onClick}
                        tooltip={tooltip}
                    />
                ))}
            </Fragment>
        ),
        points: <Points key="points" pointComponent={pointComponent} points={points} />,
    }

    if (startLabel !== false) {
        layerById.labels.push(
            <LinesLabels
                key="start"
                series={series}
                getLabel={startLabel}
                position="start"
                padding={startLabelPadding}
                color={startLabelTextColor}
            />
        )
    }
    if (endLabel !== false) {
        layerById.labels.push(
            <LinesLabels
                key="end"
                series={series}
                getLabel={endLabel}
                position="end"
                padding={endLabelPadding}
                color={endLabelTextColor}
            />
        )
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>
                            {layer({
                                innerWidth,
                                innerHeight,
                                xScale,
                                yScale,
                            })}
                        </Fragment>
                    )
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

Bump.propTypes = BumpPropTypes
Bump.defaultProps = BumpDefaultProps

export default memo(withContainer(Bump))
