import { createElement, Fragment, ReactNode } from 'react'
import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { Axis } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { svgDefaultProps } from '../defaults'
import { useParallelCoordinates } from '../hooks'
import { ParallelCoordinatesProps, BaseDatum, LayerId } from '../types'
import { ParallelCoordinatesLine } from './ParallelCoordinatesLine'

type InnerParallelCoordinatesProps<D extends BaseDatum> = Omit<
    ParallelCoordinatesProps<D>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerParallelCoordinates = <D extends BaseDatum>({
    data,
    variables,
    width,
    height,
    margin: partialMargin,
    layout = svgDefaultProps.layout,
    curve = svgDefaultProps.curve,
    axesTicksPosition,
    lineWidth = svgDefaultProps.lineWidth,
    lineOpacity = svgDefaultProps.lineOpacity,
    colors = svgDefaultProps.colors,
    layers = svgDefaultProps.layers,
    legends = svgDefaultProps.legends,
    forwardLegendData,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerParallelCoordinatesProps<D>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        variablesScale,
        variablesWithScale,
        computedData,
        lineGenerator,
        legendData,
        customLayerContext,
    } = useParallelCoordinates<D>({
        width: innerWidth,
        height: innerHeight,
        data,
        variables,
        layout,
        colors,
        curve,
        forwardLegendData,
    })

    const layerById: Record<LayerId, ReactNode> = {
        axes: null,
        lines: null,
        legends: null,
    }

    if (layers.includes('axes')) {
        layerById.axes = (
            <g key="axes">
                {variablesWithScale.map(variable => (
                    <Axis
                        key={variable.id}
                        axis={layout === 'horizontal' ? 'y' : 'x'}
                        length={layout === 'horizontal' ? innerHeight : innerWidth}
                        x={layout === 'horizontal' ? variablesScale(variable.id) : 0}
                        y={layout === 'horizontal' ? 0 : variablesScale(variable.id)}
                        scale={variable.scale}
                        ticksPosition={variable.ticksPosition || axesTicksPosition}
                        tickValues={variable.tickValues}
                        tickSize={variable.tickSize}
                        tickPadding={variable.tickPadding}
                        tickRotation={variable.tickRotation}
                        format={variable.tickFormat}
                        legend={variable.label || variable.id}
                        legendPosition={variable.legendPosition}
                        legendOffset={variable.legendOffset}
                    />
                ))}
            </g>
        )
    }

    if (layers.includes('lines')) {
        layerById.lines = (
            <g key="lines">
                {computedData.map(datum => (
                    <ParallelCoordinatesLine<D>
                        key={datum.id}
                        data={datum}
                        variables={variables}
                        lineGenerator={lineGenerator}
                        lineWidth={lineWidth}
                        opacity={lineOpacity}
                    />
                ))}
            </g>
        )
    }

    if (layers.includes('legends')) {
        layerById.legends = (
            <g key="legends">
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={innerWidth}
                        containerHeight={innerHeight}
                        data={legendData}
                    />
                ))}
            </g>
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
                    return <Fragment key={i}>{createElement(layer, customLayerContext)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const ParallelCoordinates = <D extends BaseDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: ParallelCoordinatesProps<D>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerParallelCoordinates<D> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
