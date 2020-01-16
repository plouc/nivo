/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { createElement, FunctionComponent, ReactElement } from 'react'
import { Arc, LineRadial } from 'd3-shape'
import {
    withContainer,
    useDimensions,
    SvgWrapper,
    ClosedCurveInterpolationId,
    CssMixBlendMode,
} from '@nivo/core'
import { OrdinalColorScale, InheritedColor, OrdinalColorScaleScheme } from '@nivo/colors'
// import { BoxLegendSvg } from '@nivo/legends'
import { RadarShapes } from './RadarShapes'
import { RadarGrid, RadarGridShape } from './RadarGrid'
import { RadarTooltipSensors } from './RadarTooltipSensors'
import { RadarDots, RadarLabel } from './RadarDots'
import {
    useRadar,
    BaseRadarDatum,
    RadarData,
    RadarSerie,
    RadarSlice,
    RadarSerieDatum,
} from './hooks'
import { RadarGridLabelComponent } from './RadarGridLabels'

export type RadarCustomLayer<Datum extends BaseRadarDatum> = FunctionComponent<{
    series: Array<RadarSerie<Datum>>
    slices: RadarSlice[]
    radius: number
    centerX: number
    centerY: number
    angleStep: number
    shapeGenerator: LineRadial<RadarSerieDatum<Datum>>
    sliceGenerator: Arc<any, RadarSlice>
}>

export type RadarLayer<Datum extends BaseRadarDatum> =
    | 'grid'
    | 'shapes'
    | 'sensors'
    | 'dots'
    | RadarCustomLayer<Datum>

export interface RadarProps<Datum extends BaseRadarDatum> {
    data: RadarData<Datum>
    maxValue?: number | 'auto'
    width: number
    height: number
    margin?: {
        top?: number
        right?: number
        bottom?: number
        left?: number
    }
    shapeInterpolation?: ClosedCurveInterpolationId
    colors?: OrdinalColorScale<Datum>
    fillOpacity?: number
    borderWidth?: number
    borderColor?: InheritedColor
    enableDots?: boolean
    dotSize?: number
    dotColor?: InheritedColor
    enableDotLabel?: boolean
    dotBorderWidth?: number
    dotBorderColor?: InheritedColor
    dotSymbol?: ReactElement
    dotLabel: RadarLabel<Datum>
    dotLabelFormat?: string
    dotLabelYOffset?: number
    gridLevels?: number
    gridShape?: RadarGridShape
    gridLabelOffset?: number
    blendMode?: CssMixBlendMode
    legends: any[] // PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
    isInteractive?: boolean
    animate?: boolean
    motionDamping?: number
    motionStiffness?: number
    gridLabelComponent?: RadarGridLabelComponent
    tooltipFormat: any // PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    layers: Array<RadarLayer<Datum>>
}

export const radarDefaults = {
    maxValue: 'auto' as number | 'auto',
    shapeInterpolation: 'linearClosed' as ClosedCurveInterpolationId,
    borderWidth: 2,
    borderColor: { from: 'color' },
    gridLevels: 5,
    gridShape: 'circular' as RadarGridShape,
    gridLabelOffset: 16,
    enableDots: true,
    dotSize: 10,
    dotColor: { from: 'color' },
    dotBorderWidth: 0,
    dotBorderColor: { from: 'color' },
    enableDotLabel: false,
    dotLabel: 'value',
    dotLabelYOffset: -12,
    colors: { scheme: 'nivo' } as OrdinalColorScaleScheme,
    fillOpacity: 0.25,
    blendMode: 'normal' as CssMixBlendMode,
    isInteractive: true,
    animate: true,
    motionDamping: 13,
    motionStiffness: 90,
    layers: ['grid', 'shapes', 'sensors', 'dots'] as Array<RadarLayer<any>>,
}

export function Radar<Datum extends BaseRadarDatum>({
    width,
    height,
    data,
    maxValue = radarDefaults.maxValue,
    shapeInterpolation = radarDefaults.shapeInterpolation,
    margin: partialMargin,
    borderWidth = radarDefaults.borderWidth,
    borderColor = radarDefaults.borderColor,
    gridLevels = radarDefaults.gridLevels,
    gridShape = radarDefaults.gridShape,
    gridLabelComponent,
    gridLabelOffset = radarDefaults.gridLabelOffset,
    enableDots = radarDefaults.enableDots,
    dotSymbol,
    dotSize = radarDefaults.dotSize,
    dotColor = radarDefaults.dotColor,
    dotBorderWidth = radarDefaults.dotBorderWidth,
    dotBorderColor = radarDefaults.dotBorderColor,
    enableDotLabel = radarDefaults.enableDotLabel,
    dotLabel,
    dotLabelFormat,
    dotLabelYOffset = radarDefaults.dotLabelYOffset,
    colors = radarDefaults.colors,
    fillOpacity = radarDefaults.fillOpacity,
    blendMode = radarDefaults.blendMode,
    tooltipFormat,
    legends = [],
    layers = radarDefaults.layers,
    isInteractive,
}: RadarProps<Datum>) {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        series,
        slices,
        radius,
        centerX,
        centerY,
        angleStep,
        shapeGenerator,
        sliceGenerator,
    } = useRadar<Datum>({
        width: innerWidth,
        height: innerHeight,
        data,
        colors,
        maxValue,
        shapeInterpolation,
    })

    /*
    const legendData = keys.map(key => ({
        id: key,
        label: key,
        color: colorByKey[key],
    }))
    */

    const layerById = {
        grid: (
            <RadarGrid
                slices={slices}
                levels={gridLevels}
                shape={gridShape}
                radius={radius}
                angleStep={angleStep}
                labelComponent={gridLabelComponent}
                labelOffset={gridLabelOffset}
            />
        ),
        shapes: (
            <RadarShapes<Datum>
                series={series}
                shapeGenerator={shapeGenerator}
                borderWidth={borderWidth}
                borderColor={borderColor}
                fillOpacity={fillOpacity}
                blendMode={blendMode}
            />
        ),
        sensors: isInteractive ? (
            <RadarTooltipSensors
                slices={slices}
                sliceGenerator={sliceGenerator}
                radius={radius}
                tooltipFormat={tooltipFormat}
            />
        ) : null,
        dots: enableDots ? (
            <RadarDots<Datum>
                series={series}
                symbol={dotSymbol as any}
                size={dotSize}
                color={dotColor}
                borderWidth={dotBorderWidth}
                borderColor={dotBorderColor}
                enableLabel={enableDotLabel}
                label={dotLabel}
                labelFormat={dotLabelFormat}
                labelYOffset={dotLabelYOffset}
            />
        ) : null,
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            <g transform={`translate(${centerX}, ${centerY})`}>
                {layers.map((layer, i) => {
                    if (typeof layer === 'function') {
                        return createElement(layer, {
                            key: i,
                            series,
                            slices,
                            radius,
                            centerX,
                            centerY,
                            angleStep,
                            shapeGenerator,
                            sliceGenerator,
                        })
                    }

                    return (layerById as any)[layer]
                })}
            </g>
            {/*legends.map((legend, i) => (
                <BoxLegendSvg
                    key={i}
                    {...legend}
                    containerWidth={width}
                    containerHeight={height}
                    data={legendData}
                    theme={theme}
                />
            ))*/}
        </SvgWrapper>
    )
}

export default withContainer(Radar)
