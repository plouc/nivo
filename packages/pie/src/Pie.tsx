import React, { ReactNode, Fragment, createElement } from 'react'
import {
    // @ts-ignore
    withContainer,
    SvgWrapper,
    // @ts-ignore
    bindDefs,
    useDimensions,
} from '@nivo/core'
import { InheritedColorConfig } from '@nivo/colors'
import { RadialLabels } from './RadialLabels'
import { SliceLabels } from './SliceLabels'
import PieLegends from './PieLegends'
import { useNormalizedData, usePieFromBox, usePieLayerContext } from './hooks'
import { ComputedDatum, PieLayer, PieSvgProps, PieLayerId } from './types'
import { defaultProps } from './props'
import { Slices } from './Slices'

const Pie = <RawDatum,>({
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
    activeInnerRadiusOffset = defaultProps.activeInnerRadiusOffset,
    activeOuterRadiusOffset = defaultProps.activeOuterRadiusOffset,

    width,
    height,
    margin: partialMargin,

    colors = defaultProps.colors,

    // border
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor as InheritedColorConfig<ComputedDatum<RawDatum>>,

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

    transitionMode = defaultProps.transitionMode,

    legends = defaultProps.legends,
    role = defaultProps.role,
}: PieSvgProps<RawDatum>) => {
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

    const {
        dataWithArc,
        arcGenerator,
        centerX,
        centerY,
        radius,
        innerRadius,
        setActiveId,
    } = usePieFromBox<RawDatum>({
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
        activeInnerRadiusOffset,
        activeOuterRadiusOffset,
    })

    const boundDefs = bindDefs(defs, dataWithArc, fill)

    const layerById: Record<PieLayerId, ReactNode> = {
        slices: null,
        radialLabels: null,
        sliceLabels: null,
        legends: null,
    }

    if (layers.includes('slices')) {
        layerById.slices = (
            <Slices<RawDatum>
                key="slices"
                center={[centerX, centerY]}
                data={dataWithArc}
                arcGenerator={arcGenerator}
                borderWidth={borderWidth}
                borderColor={borderColor}
                isInteractive={isInteractive}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                setActiveId={setActiveId}
                tooltip={tooltip}
                transitionMode={transitionMode}
            />
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
            <SliceLabels<RawDatum>
                key="sliceLabels"
                center={[centerX, centerY]}
                data={dataWithArc}
                label={sliceLabel}
                radiusOffset={sliceLabelsRadiusOffset}
                skipAngle={sliceLabelsSkipAngle}
                textColor={sliceLabelsTextColor}
                transitionMode={transitionMode}
            />
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
