import React, { ReactNode, Fragment, createElement } from 'react'
// @ts-ignore
import { withContainer, SvgWrapper, bindDefs, useTheme, useDimensions } from '@nivo/core'
import {
    // @ts-ignore
    useInheritedColor,
    InheritedColorProp,
} from '@nivo/colors'
import { PieSlice } from './PieSlice'
import { RadialLabels } from './RadialLabels'
import { SliceLabels } from './SliceLabels'
import PieLegends from './PieLegends'
import { useNormalizedData, usePieFromBox, usePieLayerContext } from './hooks'
import { ComputedDatum, PieLayer, PieSvgProps, PieLayerId } from './types'
import { defaultProps } from './props'

// prettier-ignore
const Pie = <RawDatum, >({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    sortByValue = defaultProps.sortByValue,

    layers = defaultProps.layers as PieLayer<RawDatum>[],

    startAngle = defaultProps.startAngle,
    endAngle = defaultProps.endAngle,
    padAngle = defaultProps.padAngle,
    fit = defaultProps.fit,
    innerRadius: innerRadiusRatio = defaultProps.innerRadius,
    cornerRadius = defaultProps.cornerRadius,

    width,
    height,
    margin: partialMargin,

    colors = defaultProps.colors,

    // border
    borderWidth = defaultProps.borderWidth,
    borderColor: _borderColor = defaultProps.borderColor as InheritedColorProp<ComputedDatum<RawDatum>>,

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
}: PieSvgProps<RawDatum>) => {
    const theme = useTheme()

    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const normalizedData = useNormalizedData<RawDatum>({
        data,
        id,
        value,
        valueFormat,
        colors,
    })

    const { dataWithArc, arcGenerator, centerX, centerY, radius, innerRadius } = usePieFromBox<RawDatum>({
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
                    <PieSlice<RawDatum>
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
                <RadialLabels<RawDatum>
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
                <SliceLabels<RawDatum>
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
            <PieLegends<RawDatum>
                key="legends"
                width={innerWidth}
                height={innerHeight}
                dataWithArc={dataWithArc}
                legends={legends}
            />
        )
    }

    const layerContext = usePieLayerContext<RawDatum>({
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

export default withContainer(Pie) as <RawDatum>(props: PieSvgProps<RawDatum>) => JSX.Element
