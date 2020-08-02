/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useState, Fragment, useMemo } from 'react'
import { bindDefs, withContainer, useDimensions, SvgWrapper } from '@nivo/core'
import { Grid, Axes } from '@nivo/axes'
import { AreaBumpPropTypes, AreaBumpDefaultProps } from './props'
import { useAreaBump } from './hooks'
import Area from './Area'
import AreasLabels from './AreasLabels'

const AreaBump = props => {
    const {
        data,
        align,

        width,
        height,
        margin: partialMargin,

        layers,

        interpolation,
        spacing,
        xPadding,

        colors,
        blendMode,
        fillOpacity,
        activeFillOpacity,
        inactiveFillOpacity,
        defs,
        fill,
        borderWidth,
        activeBorderWidth,
        inactiveBorderWidth,
        borderColor,
        borderOpacity,
        activeBorderOpacity,
        inactiveBorderOpacity,

        startLabel,
        startLabelPadding,
        startLabelTextColor,
        endLabel,
        endLabelPadding,
        endLabelTextColor,

        enableGridX,
        axisTop,
        axisBottom,

        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    } = props

    const [currentSerie, setCurrentSerie] = useState(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { series, xScale, areaGenerator } = useAreaBump({
        data,
        width: innerWidth,
        height: innerHeight,
        align,
        spacing,
        xPadding,
        interpolation,
        colors,
        fillOpacity,
        activeFillOpacity,
        inactiveFillOpacity,
        borderWidth,
        activeBorderWidth,
        inactiveBorderWidth,
        borderColor,
        borderOpacity,
        activeBorderOpacity,
        inactiveBorderOpacity,
        isInteractive,
        current: currentSerie,
    })

    const boundDefs = useMemo(() => bindDefs(defs, series, fill, { targetKey: 'fill' }), [
        defs,
        series,
        fill,
    ])

    const layerById = {
        grid: enableGridX && (
            <Grid key="grid" width={innerWidth} height={innerHeight} xScale={xScale} />
        ),
        axes: (
            <Axes
                key="axes"
                xScale={xScale}
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                bottom={axisBottom}
            />
        ),
        labels: [],
        areas: (
            <Fragment key="areas">
                {series.map(serie => (
                    <Area
                        key={serie.id}
                        areaGenerator={areaGenerator}
                        serie={serie}
                        blendMode={blendMode}
                        isInteractive={isInteractive}
                        setCurrentSerie={setCurrentSerie}
                        onMouseEnter={onMouseEnter}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        onClick={onClick}
                        tooltip={tooltip}
                    />
                ))}
            </Fragment>
        ),
    }

    if (startLabel !== false) {
        layerById.labels.push(
            <AreasLabels
                key="start"
                series={series}
                position="start"
                padding={startLabelPadding}
                color={startLabelTextColor}
            />
        )
    }
    if (endLabel !== false) {
        layerById.labels.push(
            <AreasLabels
                key="end"
                series={series}
                position="end"
                padding={endLabelPadding}
                color={endLabelTextColor}
            />
        )
    }

    return (
        <SvgWrapper defs={boundDefs} width={outerWidth} height={outerHeight} margin={margin}>
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>
                            {layer({
                                ...props,
                                innerWidth,
                                innerHeight,
                                outerWidth,
                                outerHeight,
                                series,
                                xScale,
                                areaGenerator,
                            })}
                        </Fragment>
                    )
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

AreaBump.propTypes = AreaBumpPropTypes
AreaBump.defaultProps = AreaBumpDefaultProps

export default memo(withContainer(AreaBump))
