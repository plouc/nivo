/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, createElement } from 'react'
import { withContainer, SvgWrapper, bindDefs, useTheme, useDimensions } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { PieSvgDefaultProps, PieSvgPropTypes } from './props'
import { PieSlice } from './PieSlice'
import { RadialLabels } from './RadialLabels'
import { SliceLabels } from './SliceLabels'
import PieLegends from './PieLegends'
import { useNormalizedData, usePieFromBox, usePieLayerContext } from './hooks'

const Pie = ({
    data,
    id,
    value,
    valueFormat,
    sortByValue,

    layers,

    startAngle,
    endAngle,
    padAngle,
    fit,
    innerRadius: innerRadiusRatio,
    cornerRadius,

    width,
    height,
    margin: partialMargin,

    colors,

    // border
    borderWidth,
    borderColor: _borderColor,

    // radial labels
    radialLabel,
    enableRadialLabels,
    radialLabelsSkipAngle,
    radialLabelsLinkOffset,
    radialLabelsLinkDiagonalLength,
    radialLabelsLinkHorizontalLength,
    radialLabelsLinkStrokeWidth,
    radialLabelsTextXOffset,
    radialLabelsTextColor,
    radialLabelsLinkColor,

    // slices labels
    sliceLabel,
    enableSliceLabels,
    sliceLabelsSkipAngle,
    sliceLabelsTextColor,
    sliceLabelsRadiusOffset,

    // styling
    defs,
    fill,

    // interactivity
    isInteractive,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    tooltip,

    legends,
    role,
}) => {
    const theme = useTheme()

    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const normalizedData = useNormalizedData({
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

    const layerById = {
        slices: null,
        radialLabels: null,
        sliceLabels: null,
        legends: null,
    }

    if (layers.includes('slices')) {
        layerById.slices = (
            <g key="slices" transform={`translate(${centerX},${centerY})`}>
                {dataWithArc.map(datumWithArc => (
                    <PieSlice
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
                <RadialLabels
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
                dataWithArc={dataWithArc}
                legends={legends}
            />
        )
    }

    const layerContext = usePieLayerContext({
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
                if (layerById[layer] !== undefined) {
                    return layerById[layer]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

Pie.displayName = 'Pie'
Pie.propTypes = PieSvgPropTypes
Pie.defaultProps = PieSvgDefaultProps

export default withContainer(Pie)
