import { createElement, Fragment, ReactNode } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { ArcLabelsLayer } from '@nivo/arcs'
import { RadialBarLayerId, RadialBarSvgProps, ComputedBar } from './types'
import { svgDefaultProps } from './props'
import { useRadialBar } from './hooks'
import { RadialBarArcs } from './RadialBarArcs'
import { PolarGrid } from './polar_grid'
import { BoxLegendSvg } from '@nivo/legends'

type InnerRadialBarProps = Omit<
    RadialBarSvgProps,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerRadialBar = ({
    data,
    valueFormat,
    startAngle = svgDefaultProps.startAngle,
    endAngle = svgDefaultProps.endAngle,
    padding = svgDefaultProps.padding,
    width,
    height,
    margin: partialMargin,
    layers = svgDefaultProps.layers,
    enableGridAngles = svgDefaultProps.enableGridAngles,
    enableGridRadii = svgDefaultProps.enableGridRadii,
    colors = svgDefaultProps.colors,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor,
    cornerRadius = svgDefaultProps.cornerRadius,
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
}: InnerRadialBarProps) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        center,
        bars,
        arcGenerator,
        radiusScale,
        valueScale,
        legendData,
        customLayerProps,
    } = useRadialBar({
        data,
        valueFormat,
        startAngle,
        endAngle,
        padding,
        width: innerWidth,
        height: innerHeight,
        colors,
        cornerRadius,
    })

    const layerById: Record<RadialBarLayerId, ReactNode> = {
        grid: null,
        bars: null,
        labels: null,
        legends: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <PolarGrid
                key="grid"
                center={center}
                enableAngles={enableGridAngles}
                enableRadii={enableGridRadii}
                angleScale={valueScale}
                radiusScale={radiusScale}
            />
        )
    }

    if (layers.includes('bars')) {
        layerById.bars = (
            <RadialBarArcs
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
            <ArcLabelsLayer<ComputedBar>
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

export const RadialBar = ({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: RadialBarSvgProps) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerRadialBar isInteractive={isInteractive} {...otherProps} />
    </Container>
)
