import { createElement, Fragment, ReactNode } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { BoxLegendSvg } from '@nivo/legends'
import { Datum, DefaultRawDatum, SvgProps, LayerId, TooltipComponent, ComputedDatum } from './types'
import { svgDefaultProps } from './defaults'
import { useWaffle } from './hooks'
import { WaffleCells } from './WaffleCells'
import { WaffleAreas } from './WaffleAreas'

type InnerWaffleProps<D extends Datum> = Omit<
    SvgProps<D>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerWaffle = <D extends Datum>({
    width,
    height,
    margin: partialMargin,
    data,
    valueFormat,
    total,
    rows,
    columns,
    fillDirection = svgDefaultProps.fillDirection,
    padding = svgDefaultProps.padding,
    layers = svgDefaultProps.layers as LayerId[],
    cellComponent = svgDefaultProps.cellComponent,
    colors = svgDefaultProps.colors as OrdinalColorScaleConfig<D>,
    emptyColor = svgDefaultProps.emptyColor,
    // emptyOpacity = defaultProps.emptyOpacity,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor as InheritedColorConfig<ComputedDatum<D>>,
    // defs = defaultProps.defs,
    // fill = defaultProps.fill,
    isInteractive = svgDefaultProps.isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = svgDefaultProps.tooltip as TooltipComponent<D>,
    legends = svgDefaultProps.legends,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    testIdPrefix,
}: InnerWaffleProps<D>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { cells, cellSize, legendData, computedData } = useWaffle<D>({
        width: innerWidth,
        height: innerHeight,
        data,
        valueFormat,
        total,
        rows,
        columns,
        fillDirection,
        padding,
        colors,
        emptyColor,
        borderColor,
    })

    const layerById: Record<LayerId, ReactNode> = {
        cells: null,
        areas: null,
        legends: null,
    }

    if (layers.includes('cells')) {
        layerById.cells = (
            <WaffleCells<D>
                key="cells"
                cells={cells}
                cellComponent={cellComponent}
                cellSize={cellSize}
                borderWidth={borderWidth}
                testIdPrefix={testIdPrefix}
            />
        )
    }

    if (layers.includes('areas')) {
        layerById.areas = (
            <WaffleAreas<D>
                key="areas"
                data={computedData}
                isInteractive={isInteractive}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                tooltip={tooltip}
                testIdPrefix={testIdPrefix}
            />
        )
    }

    if (layers.includes('legends')) {
        layerById.legends = (
            <g key="legends">
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={width}
                        containerHeight={height}
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
            //defs={boundDefs}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const Waffle = <D extends Datum = DefaultRawDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: SvgProps<D>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerWaffle<D> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
