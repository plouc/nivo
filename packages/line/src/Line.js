/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Fragment, useState } from 'react'
import {
    bindDefs,
    withContainer,
    useDimensions,
    useTheme,
    SvgWrapper,
    CartesianMarkers,
} from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { Crosshair } from '@nivo/tooltip'
import { useLine } from './hooks'
import { LinePropTypes } from './props'
import Areas from './Areas'
import Lines from './Lines'
import Slices from './Slices'
import Points from './Points'
import Mesh from './Mesh'
import PointTooltip from './PointTooltip'
import SliceTooltip from './SliceTooltip'

const Line = props => {
    const {
        data,
        xScale: xScaleSpec = { type: 'point' },
        xFormat,
        yScale: yScaleSpec = {
            type: 'linear',
            min: 0,
            max: 'auto',
        },
        yFormat,
        layers = [
            'grid',
            'markers',
            'axes',
            'areas',
            'crosshair',
            'lines',
            'points',
            'slices',
            'mesh',
            'legends',
        ],
        curve = 'linear',
        areaBaselineValue = 0,

        colors = { scheme: 'nivo' },

        margin: partialMargin,
        width,
        height,

        axisTop,
        axisRight,
        axisBottom = {},
        axisLeft = {},
        enableGridX = true,
        enableGridY = true,
        gridXValues,
        gridYValues,

        lineWidth = 2,
        enableArea = false,
        areaOpacity = 0.2,
        areaBlendMode = 'normal',

        enablePoints = true,
        pointSymbol,
        pointSize = 6,
        pointColor = { from: 'color' },
        pointBorderWidth = 0,
        pointBorderColor = { theme: 'background' },
        enablePointLabel = false,
        pointLabel = 'yFormatted',
        pointLabelYOffset,

        defs = [],
        fill = [],

        markers,

        legends = [],

        isInteractive = true,

        useMesh = false,
        debugMesh = false,

        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        onTouchStart,
        onTouchMove,
        onTouchEnd,

        tooltip = PointTooltip,

        enableSlices = false,
        debugSlices = false,
        sliceTooltip = SliceTooltip,

        enableCrosshair = true,
        crosshairType = 'bottom-left',

        role = 'img',
    } = props

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        legendData,
        toggleSerie,
        lineGenerator,
        areaGenerator,
        series,
        xScale,
        yScale,
        slices,
        points,
    } = useLine({
        data,
        xScale: xScaleSpec,
        xFormat,
        yScale: yScaleSpec,
        yFormat,
        width: innerWidth,
        height: innerHeight,
        colors,
        curve,
        areaBaselineValue,
        pointColor,
        pointBorderColor,
        enableSlices,
    })

    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)

    const [currentPoint, setCurrentPoint] = useState(null)
    const [currentSlice, setCurrentSlice] = useState(null)

    const layerById = {
        grid: (
            <Grid
                key="grid"
                theme={theme}
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
                xValues={gridXValues}
                yValues={gridYValues}
            />
        ),
        markers: (
            <CartesianMarkers
                key="markers"
                markers={markers}
                width={innerWidth}
                height={innerHeight}
                xScale={xScale}
                yScale={yScale}
                theme={theme}
            />
        ),
        axes: (
            <Axes
                key="axes"
                xScale={xScale}
                yScale={yScale}
                width={innerWidth}
                height={innerHeight}
                theme={theme}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        ),
        areas: null,
        lines: (
            <Lines key="lines" lines={series} lineGenerator={lineGenerator} lineWidth={lineWidth} />
        ),
        slices: null,
        points: null,
        crosshair: null,
        mesh: null,
        legends: legends.map((legend, i) => (
            <BoxLegendSvg
                key={`legend.${i}`}
                {...legend}
                containerWidth={innerWidth}
                containerHeight={innerHeight}
                data={legend.data || legendData}
                theme={theme}
                toggleSerie={legend.toggleSerie ? toggleSerie : undefined}
            />
        )),
    }

    const boundDefs = bindDefs(defs, series, fill)

    if (enableArea) {
        layerById.areas = (
            <Areas
                key="areas"
                areaGenerator={areaGenerator}
                areaOpacity={areaOpacity}
                areaBlendMode={areaBlendMode}
                lines={series}
            />
        )
    }

    if (isInteractive && enableSlices !== false) {
        layerById.slices = (
            <Slices
                key="slices"
                slices={slices}
                axis={enableSlices}
                debug={debugSlices}
                height={innerHeight}
                tooltip={sliceTooltip}
                current={currentSlice}
                setCurrent={setCurrentSlice}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            />
        )
    }

    if (enablePoints) {
        layerById.points = (
            <Points
                key="points"
                points={points}
                symbol={pointSymbol}
                size={pointSize}
                color={getPointColor}
                borderWidth={pointBorderWidth}
                borderColor={getPointBorderColor}
                enableLabel={enablePointLabel}
                label={pointLabel}
                labelYOffset={pointLabelYOffset}
            />
        )
    }

    if (isInteractive && enableCrosshair) {
        if (currentPoint !== null) {
            layerById.crosshair = (
                <Crosshair
                    key="crosshair"
                    width={innerWidth}
                    height={innerHeight}
                    x={currentPoint.x}
                    y={currentPoint.y}
                    type={crosshairType}
                />
            )
        }
        if (currentSlice !== null) {
            layerById.crosshair = (
                <Crosshair
                    key="crosshair"
                    width={innerWidth}
                    height={innerHeight}
                    x={currentSlice.x}
                    y={currentSlice.y}
                    type={enableSlices}
                />
            )
        }
    }

    if (isInteractive && useMesh && enableSlices === false) {
        layerById.mesh = (
            <Mesh
                key="mesh"
                points={points}
                width={innerWidth}
                height={innerHeight}
                margin={margin}
                current={currentPoint}
                setCurrent={setCurrentPoint}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                tooltip={tooltip}
                debug={debugMesh}
            />
        )
    }

    return (
        <SvgWrapper
            defs={boundDefs}
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>
                            {layer({
                                ...props,
                                innerWidth,
                                innerHeight,
                                series,
                                slices,
                                points,
                                xScale,
                                yScale,
                                lineGenerator,
                                areaGenerator,
                                currentPoint,
                                setCurrentPoint,
                                currentSlice,
                                setCurrentSlice,
                            })}
                        </Fragment>
                    )
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

Line.propTypes = LinePropTypes

export default withContainer(Line)
