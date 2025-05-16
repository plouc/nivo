import { createElement, Fragment, ReactNode, forwardRef, Ref, ReactElement } from 'react'
import { Container, SvgWrapper, useDimensions, WithChartRef } from '@nivo/core'
import { Axis } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { svgDefaultProps } from '../defaults'
import { useParallelCoordinates } from '../hooks'
import {
    ParallelCoordinatesProps,
    BaseDatum,
    LayerId,
    DatumGroupKeys,
    TooltipComponent,
    IfGrouped,
    ComputedGroupDatum,
    ComputedDatum,
} from '../types'
import { ParallelCoordinatesLine } from './ParallelCoordinatesLine'

type InnerParallelCoordinatesProps<
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined,
> = Omit<
    ParallelCoordinatesProps<Datum, GroupBy>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
> & {
    forwardedRef: Ref<SVGSVGElement>
}

const InnerParallelCoordinates = <
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined,
>({
    data,
    variables,
    groupBy,
    groups,
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
    tooltip = svgDefaultProps.tooltip as unknown as TooltipComponent<Datum, GroupBy>,
    legends = svgDefaultProps.legends,
    forwardLegendData,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    testIdPrefix,
    forwardedRef,
}: InnerParallelCoordinatesProps<Datum, GroupBy>) => {
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
    } = useParallelCoordinates<Datum, GroupBy>({
        width: innerWidth,
        height: innerHeight,
        data,
        variables,
        groupBy,
        groups,
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
                    <ParallelCoordinatesLine<Datum, GroupBy>
                        key={`${'group' in datum ? datum.group.id : ''}${datum.id}`}
                        datum={
                            datum as IfGrouped<
                                Datum,
                                GroupBy,
                                ComputedGroupDatum<Datum>,
                                ComputedDatum<Datum>
                            >
                        }
                        variables={variables}
                        lineGenerator={lineGenerator}
                        lineWidth={lineWidth}
                        opacity={lineOpacity}
                        tooltip={tooltip}
                        testIdPrefix={testIdPrefix}
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
            ref={forwardedRef}
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

export const ParallelCoordinates = forwardRef(
    <Datum extends BaseDatum, GroupBy extends DatumGroupKeys<Datum> | undefined = undefined>(
        {
            isInteractive = svgDefaultProps.isInteractive,
            animate = svgDefaultProps.animate,
            motionConfig = svgDefaultProps.motionConfig,
            theme,
            renderWrapper,
            ...props
        }: ParallelCoordinatesProps<Datum, GroupBy>,
        ref: Ref<SVGSVGElement>
    ) => (
        <Container
            animate={animate}
            isInteractive={isInteractive}
            motionConfig={motionConfig}
            theme={theme}
            renderWrapper={renderWrapper}
        >
            <InnerParallelCoordinates<Datum, GroupBy>
                {...props}
                isInteractive={isInteractive}
                forwardedRef={ref}
            />
        </Container>
    )
) as <Datum extends BaseDatum, GroupBy extends DatumGroupKeys<Datum> | undefined = undefined>(
    props: WithChartRef<ParallelCoordinatesProps<Datum, GroupBy>, SVGSVGElement>
) => ReactElement
