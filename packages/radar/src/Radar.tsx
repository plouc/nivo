import { ReactNode, Fragment } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import { RadarShapes } from './RadarShapes'
import { RadarGrid } from './RadarGrid'
import { RadarTooltip } from './RadarTooltip'
import { RadarDots } from './RadarDots'
import { svgDefaultProps } from './props'
import { RadarLayerId, RadarSvgProps } from './types'
import { useRadar } from './hooks'

type InnerRadarProps<D extends Record<string, unknown>> = Omit<
    RadarSvgProps<D>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerRadar = <D extends Record<string, unknown>>({
    data,
    keys,
    indexBy,
    layers = svgDefaultProps.layers,
    maxValue = svgDefaultProps.maxValue,
    curve = svgDefaultProps.curve,
    margin: partialMargin,
    width,
    height,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor,
    gridLevels = svgDefaultProps.gridLevels,
    gridShape = svgDefaultProps.gridShape,
    gridLabel = svgDefaultProps.gridLabel,
    gridLabelOffset = svgDefaultProps.gridLabelOffset,
    enableDots = svgDefaultProps.enableDots,
    dotSymbol,
    dotSize,
    dotColor,
    dotBorderWidth,
    dotBorderColor,
    enableDotLabel,
    dotLabel,
    dotLabelFormat,
    dotLabelYOffset,
    colors = svgDefaultProps.colors,
    fillOpacity = svgDefaultProps.fillOpacity,
    blendMode = svgDefaultProps.blendMode,
    isInteractive = svgDefaultProps.isInteractive,
    tooltipFormat,
    legends = svgDefaultProps.legends,
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerRadarProps<D>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        getIndex,
        indices,
        colorByKey,
        radius,
        radiusScale,
        centerX,
        centerY,
        angleStep,
        curveInterpolator,
        legendData,
    } = useRadar<D>({
        data,
        keys,
        indexBy,
        maxValue,
        curve,
        width: innerWidth,
        height: innerHeight,
        colors,
    })

    const layerById: Record<RadarLayerId, ReactNode> = {
        grid: null,
        shapes: null,
        dots: null,
        legends: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <g key="grid" transform={`translate(${centerX}, ${centerY})`}>
                <RadarGrid<D>
                    levels={gridLevels}
                    shape={gridShape}
                    radius={radius}
                    angleStep={angleStep}
                    indices={indices}
                    label={gridLabel}
                    labelOffset={gridLabelOffset}
                />
            </g>
        )
    }

    if (layers.includes('shapes')) {
        layerById.shapes = (
            <g key="shapes" transform={`translate(${centerX}, ${centerY})`}>
                {keys.map(key => (
                    <RadarShapes<D>
                        key={key}
                        data={data}
                        item={key}
                        colorByKey={colorByKey}
                        radiusScale={radiusScale}
                        angleStep={angleStep}
                        curveInterpolator={curveInterpolator}
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                        fillOpacity={fillOpacity}
                        blendMode={blendMode}
                    />
                ))}
            </g>
        )
    }

    if (layers.includes('dots') && enableDots) {
        layerById.dots = (
            <g key="dots" transform={`translate(${centerX}, ${centerY})`}>
                <RadarDots<D>
                    data={data}
                    keys={keys}
                    getIndex={getIndex}
                    radiusScale={radiusScale}
                    angleStep={angleStep}
                    symbol={dotSymbol}
                    size={dotSize}
                    colorByKey={colorByKey}
                    color={dotColor}
                    borderWidth={dotBorderWidth}
                    borderColor={dotBorderColor}
                    enableLabel={enableDotLabel}
                    label={dotLabel}
                    labelFormat={dotLabelFormat}
                    labelYOffset={dotLabelYOffset}
                />
            </g>
        )
    }

    if (layers.includes('legends')) {
        layerById.legends = (
            <Fragment key="legends">
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={width}
                        containerHeight={height}
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
            {layerById.grid}
            {layerById.shapes}
            {isInteractive && (
                <g transform={`translate(${centerX}, ${centerY})`}>
                    <RadarTooltip<D>
                        data={data}
                        keys={keys}
                        getIndex={getIndex}
                        colorByKey={colorByKey}
                        radius={radius}
                        angleStep={angleStep}
                        tooltipFormat={tooltipFormat}
                    />
                </g>
            )}
            {layerById.dots}
            {layerById.legends}
        </SvgWrapper>
    )
}

export const Radar = <D extends Record<string, unknown>>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: RadarSvgProps<D>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerRadar<D> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
