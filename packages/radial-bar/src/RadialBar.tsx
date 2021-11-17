import { createElement, Fragment, ReactNode } from 'react'
import { Container, useDimensions, SvgWrapper, clampArc } from '@nivo/core'
import { ArcLabelsLayer } from '@nivo/arcs'
import { BoxLegendSvg } from '@nivo/legends'
import { PolarGrid, RadialAxis, CircularAxis } from '@nivo/polar-axes'
import { RadialBarLayerId, RadialBarSvgProps, ComputedBar, RadialBarDatum } from './types'
import { svgDefaultProps } from './props'
import { useRadialBar } from './hooks'
import { RadialBarArcs } from './RadialBarArcs'
import { RadialBarTracks } from './RadialBarTracks'

type InnerRadialBarProps<D extends RadialBarDatum = RadialBarDatum> = Omit<
    RadialBarSvgProps<D>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerRadialBar = <D extends RadialBarDatum>({
    data,
    maxValue = svgDefaultProps.maxValue,
    valueFormat,
    startAngle: originalStartAngle = svgDefaultProps.startAngle,
    endAngle: originalEndAngle = svgDefaultProps.endAngle,
    innerRadius: innerRadiusRatio = svgDefaultProps.innerRadius,
    padding = svgDefaultProps.padding,
    padAngle = svgDefaultProps.padAngle,
    cornerRadius = svgDefaultProps.cornerRadius,
    width,
    height,
    margin: partialMargin,
    layers = svgDefaultProps.layers,
    enableTracks = svgDefaultProps.enableTracks,
    tracksColor = svgDefaultProps.tracksColor,
    enableRadialGrid = svgDefaultProps.enableRadialGrid,
    enableCircularGrid = svgDefaultProps.enableCircularGrid,
    radialAxisStart = svgDefaultProps.radialAxisStart,
    radialAxisEnd = svgDefaultProps.radialAxisEnd,
    circularAxisInner = svgDefaultProps.circularAxisInner,
    circularAxisOuter = svgDefaultProps.circularAxisOuter,
    colors = svgDefaultProps.colors,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor,
    enableLabels = svgDefaultProps.enableLabels,
    label = svgDefaultProps.label,
    labelsSkipAngle = svgDefaultProps.labelsSkipAngle,
    labelsRadiusOffset = svgDefaultProps.labelsRadiusOffset,
    labelsTextColor = svgDefaultProps.labelsTextColor,
    isInteractive = svgDefaultProps.isInteractive,
    tooltip = svgDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    transitionMode = svgDefaultProps.transitionMode,
    legends = svgDefaultProps.legends,
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerRadialBarProps<D>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const [startAngle, endAngle] = clampArc(originalStartAngle, originalEndAngle)

    const {
        center,
        innerRadius,
        outerRadius,
        bars,
        arcGenerator,
        radiusScale,
        valueScale,
        tracks,
        legendData,
        customLayerProps,
    } = useRadialBar<D>({
        data,
        maxValue,
        valueFormat,
        startAngle,
        endAngle,
        innerRadiusRatio,
        padding,
        padAngle,
        cornerRadius,
        width: innerWidth,
        height: innerHeight,
        colors,
        tracksColor,
    })

    const layerById: Record<RadialBarLayerId, ReactNode> = {
        grid: null,
        tracks: null,
        bars: null,
        labels: null,
        legends: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <Fragment key="grid">
                <PolarGrid
                    center={center}
                    enableRadialGrid={enableRadialGrid}
                    enableCircularGrid={enableCircularGrid}
                    angleScale={valueScale}
                    radiusScale={radiusScale}
                    startAngle={startAngle}
                    endAngle={endAngle}
                />
                {radialAxisStart && (
                    <RadialAxis
                        type="start"
                        center={center}
                        angle={Math.min(startAngle, endAngle)}
                        scale={radiusScale}
                        {...radialAxisStart}
                    />
                )}
                {radialAxisEnd && (
                    <RadialAxis
                        type="end"
                        center={center}
                        angle={Math.max(startAngle, endAngle)}
                        scale={radiusScale}
                        {...radialAxisEnd}
                    />
                )}
                {circularAxisInner && (
                    <CircularAxis
                        type="inner"
                        center={center}
                        radius={innerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        scale={valueScale}
                        {...circularAxisInner}
                    />
                )}
                {circularAxisOuter && (
                    <CircularAxis
                        type="outer"
                        center={center}
                        radius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        scale={valueScale}
                        {...circularAxisOuter}
                    />
                )}
            </Fragment>
        )
    }

    if (layers.includes('tracks') && enableTracks) {
        layerById.tracks = (
            <RadialBarTracks
                key="tracks"
                center={center}
                tracks={tracks}
                arcGenerator={arcGenerator}
                transitionMode={transitionMode}
            />
        )
    }

    if (layers.includes('bars')) {
        layerById.bars = (
            <RadialBarArcs<D>
                key="bars"
                center={center}
                bars={bars}
                borderWidth={borderWidth}
                borderColor={borderColor}
                arcGenerator={arcGenerator}
                isInteractive={isInteractive}
                tooltip={tooltip}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                transitionMode={transitionMode}
            />
        )
    }

    if (layers.includes('labels') && enableLabels) {
        layerById.labels = (
            <ArcLabelsLayer<ComputedBar<D>>
                key="labels"
                center={center}
                data={bars}
                label={label}
                radiusOffset={labelsRadiusOffset}
                skipAngle={labelsSkipAngle}
                textColor={labelsTextColor}
                transitionMode={transitionMode}
            />
        )
    }

    if (layers.includes('legends') && legends.length > 0) {
        layerById.legends = (
            <Fragment key="legends">
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={innerWidth}
                        containerHeight={innerHeight}
                        data={legendData}
                    />
                ))}
            </Fragment>
        )
    }

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, customLayerProps)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const RadialBar = <D extends RadialBarDatum = RadialBarDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: RadialBarSvgProps<D>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerRadialBar<D> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
