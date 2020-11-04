/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { ReactNode, Fragment, createElement } from 'react'
// @ts-ignore
import { withContainer, SvgWrapper, bindDefs, useTheme, useDimensions } from '@nivo/core'
// @ts-ignore
import { useInheritedColor, OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'
import { PieSlice } from './PieSlice'
import { RadialLabels } from './RadialLabels'
import { SliceLabels } from './SliceLabels'
import PieLegends from './PieLegends'
import { useNormalizedData, usePieFromBox, usePieLayerContext } from './hooks'
import { ComputedDatum, PieLayer, PieSvgProps, PieLayerId } from './definitions'
import { defaultProps } from './props'

// prettier-ignore
const Pie = <R, >({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    sortByValue = defaultProps.sortByValue,

    layers = defaultProps.layers as PieLayer<R>[],

    startAngle = defaultProps.startAngle,
    endAngle = defaultProps.endAngle,
    padAngle = defaultProps.padAngle,
    fit = defaultProps.fit,
    innerRadius: innerRadiusRatio = defaultProps.innerRadius,
    cornerRadius = defaultProps.cornerRadius,

    width,
    height,
    margin: partialMargin,

    colors = defaultProps.colors as OrdinalColorsInstruction,

    // border
    borderWidth = defaultProps.borderWidth,
    borderColor: _borderColor = defaultProps.borderColor as InheritedColorProp<ComputedDatum<R>>,

    // radial labels
    radialLabel = defaultProps.radialLabel,
    enableRadialLabels = defaultProps.enableRadialLabels,
    radialLabelsSkipAngle = defaultProps.radialLabelsSkipAngle,
    radialLabelsLinkOffset = defaultProps.radialLabelsLinkOffset,
    radialLabelsLinkDiagonalLength = defaultProps.radialLabelsLinkDiagonalLength,
    radialLabelsLinkHorizontalLength = defaultProps.radialLabelsLinkHorizontalLength,
    radialLabelsLinkStrokeWidth = defaultProps.radialLabelsLinkStrokeWidth,
    radialLabelsTextXOffset = defaultProps.radialLabelsTextXOffset,
    radialLabelsTextColor = defaultProps.radialLabelsTextColor,
    radialLabelsLinkColor = defaultProps.radialLabelsLinkColor,

    // slices labels
    sliceLabel = defaultProps.sliceLabel,
    enableSliceLabels = defaultProps.enableSliceLabels,
    sliceLabelsSkipAngle = defaultProps.sliceLabelsSkipAngle,
    sliceLabelsTextColor = defaultProps.sliceLabelsTextColor,
    sliceLabelsRadiusOffset = defaultProps.sliceLabelsRadiusOffset,

    // styling
    defs = defaultProps.defs,
    fill = defaultProps.fill,

    // interactivity
    isInteractive = defaultProps.isInteractive,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    tooltip = defaultProps.tooltip,

    legends = defaultProps.legends,
    role = defaultProps.role,
}: PieSvgProps<R>) => {
    const theme = useTheme()

    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const normalizedData = useNormalizedData<R>({
        data,
        id,
        value,
        valueFormat,
        colors,
    })

    const { dataWithArc, arcGenerator, centerX, centerY, radius, innerRadius } = usePieFromBox({
        data: normalizedData,
        width: innerWidth,
        height: innerHeight,
        fit,
        innerRadius: innerRadiusRatio,
        startAngle,
        endAngle,
        padAngle,
        sortByValue,
        cornerRadius,
    })

    const borderColor = useInheritedColor(_borderColor, theme)

    const boundDefs = bindDefs(defs, dataWithArc, fill)

    const layerById: Record<PieLayerId, ReactNode> = {
        slices: null,
        radialLabels: null,
        sliceLabels: null,
        legends: null,
    }

    if (layers.includes('slices')) {
        layerById.slices = (
            <g key="slices" transform={`translate(${centerX},${centerY})`}>
                {dataWithArc.map(datumWithArc => (
                    <PieSlice<R>
                        key={datumWithArc.id}
                        datum={datumWithArc}
                        path={arcGenerator(datumWithArc.arc)}
                        borderWidth={borderWidth}
                        borderColor={borderColor(datumWithArc)}
                        tooltip={tooltip}
                        isInteractive={isInteractive}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                    />
                ))}
            </g>
        )
    }

    if (enableRadialLabels && layers.includes('radialLabels')) {
        layerById.radialLabels = (
            <g key="radialLabels" transform={`translate(${centerX},${centerY})`}>
                <RadialLabels<R>
                    dataWithArc={dataWithArc}
                    radius={radius}
                    label={radialLabel}
                    skipAngle={radialLabelsSkipAngle}
                    linkOffset={radialLabelsLinkOffset}
                    linkDiagonalLength={radialLabelsLinkDiagonalLength}
                    linkHorizontalLength={radialLabelsLinkHorizontalLength}
                    linkStrokeWidth={radialLabelsLinkStrokeWidth}
                    textXOffset={radialLabelsTextXOffset}
                    textColor={radialLabelsTextColor}
                    linkColor={radialLabelsLinkColor}
                />
            </g>
        )
    }

    if (enableSliceLabels && layers.includes('sliceLabels')) {
        layerById.sliceLabels = (
            <g key="sliceLabels" transform={`translate(${centerX},${centerY})`}>
                <SliceLabels
                    // @ts-ignore
                    dataWithArc={dataWithArc}
                    label={sliceLabel}
                    radius={radius}
                    innerRadius={innerRadius}
                    radiusOffset={sliceLabelsRadiusOffset}
                    skipAngle={sliceLabelsSkipAngle}
                    textColor={sliceLabelsTextColor}
                />
            </g>
        )
    }

    if (legends.length > 0 && layers.includes('legends')) {
        layerById.legends = (
            <PieLegends
                key="legends"
                width={innerWidth}
                height={innerHeight}
                // @ts-ignore
                dataWithArc={dataWithArc}
                legends={legends}
            />
        )
    }

    const layerContext = usePieLayerContext<R>({
        dataWithArc,
        arcGenerator,
        centerX,
        centerY,
        radius,
        innerRadius,
    })

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            defs={boundDefs}
            theme={theme}
            role={role}
        >
            {layers.map((layer, i) => {
                if (layerById[layer as PieLayerId] !== undefined) {
                    return layerById[layer as PieLayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

export default withContainer(Pie) as <R>(props: PieSvgProps<R>) => JSX.Element
