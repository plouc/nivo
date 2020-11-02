/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, useMemo, createElement } from 'react'
import {
    getLabelGenerator,
    withContainer,
    SvgWrapper,
    bindDefs,
    useTheme,
    useDimensions,
} from '@nivo/core'
import { getInheritedColorGenerator, useInheritedColor } from '@nivo/colors'
import { PieSvgDefaultProps, PieSvgPropTypes } from './props'
import PieSlice from './PieSlice'
import PieRadialLabels from './PieRadialLabels'
import PieSliceLabels from './PieSliceLabels'
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
    enableSlicesLabels,
    slicesLabelsSkipAngle,
    slicesLabelsTextColor,

    // styling
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

    const getRadialLabel = useMemo(() => getLabelGenerator(radialLabel), [radialLabel])

    const getSliceLabel = useMemo(() => getLabelGenerator(sliceLabel), [sliceLabel])

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
                {dataWithArc.map(arc => (
                    <PieSlice
                        key={arc.id}
                        data={arc}
                        path={arcGenerator(arc.arc)}
                        color={arc.color}
                        fill={arc.fill ? arc.fill : arc.color}
                        borderWidth={borderWidth}
                        borderColor={borderColor(arc)}
                        tooltipFormat={tooltipFormat}
                        tooltip={tooltip}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                ))}
            </g>
        )
    }

    if (enableRadialLabels && layers.includes('radialLabels')) {
        layerById.radialLabels = (
            <g key="radialLabels" transform={`translate(${centerX},${centerY})`}>
                <PieRadialLabels
                    arcs={dataWithArc}
                    radius={radius}
                    label={getRadialLabel}
                    skipAngle={radialLabelsSkipAngle}
                    linkOffset={radialLabelsLinkOffset}
                    linkDiagonalLength={radialLabelsLinkDiagonalLength}
                    linkHorizontalLength={radialLabelsLinkHorizontalLength}
                    linkStrokeWidth={radialLabelsLinkStrokeWidth}
                    textXOffset={radialLabelsTextXOffset}
                    textColor={getInheritedColorGenerator(radialLabelsTextColor, theme)}
                    linkColor={getInheritedColorGenerator(radialLabelsLinkColor, theme)}
                />
            </g>
        )
    }

    if (enableSlicesLabels && layers.includes('sliceLabels')) {
        layerById.sliceLabels = (
            <g key="sliceLabels" transform={`translate(${centerX},${centerY})`}>
                <PieSliceLabels
                    arcs={dataWithArc}
                    radius={radius}
                    innerRadius={innerRadius}
                    theme={theme}
                    label={getSliceLabel}
                    skipAngle={slicesLabelsSkipAngle}
                    textColor={getInheritedColorGenerator(slicesLabelsTextColor, theme)}
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
                arcs={dataWithArc}
                legends={legends}
                theme={theme}
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
