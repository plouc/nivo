import { createElement, Fragment, ReactNode } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { BoxLegendSvg } from '@nivo/legends'
import { Datum, WaffleSvgProps, LayerId, ComputedDatum, TooltipComponent } from './types'
import { svgDefaultProps } from './defaults'
import { useWaffle, useCustomLayerProps } from './hooks'
import { WaffleCells } from './WaffleCells'
import { WaffleAreas } from './WaffleAreas'

type InnerWaffleProps<D extends Datum> = Omit<
    WaffleSvgProps<D>,
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
    hiddenIds = svgDefaultProps.hiddenIds,
    layers = svgDefaultProps.layers as LayerId[],
    cellComponent = svgDefaultProps.cellComponent,
    colors = svgDefaultProps.colors as OrdinalColorScaleConfig<D>,
    emptyColor = svgDefaultProps.emptyColor,
    // emptyOpacity = defaultProps.emptyOpacity,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor as InheritedColorConfig<ComputedDatum<D>>,
    // defs = svgDefaultProps.defs,
    // fill = svgDefaultProps.fill,
    isInteractive = svgDefaultProps.isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = svgDefaultProps.tooltip as TooltipComponent<D>,
    forwardLegendData,
    legends = svgDefaultProps.legends,
    motionStagger = svgDefaultProps.motionStagger,
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

    const { cells, legendData, computedData } = useWaffle<D>({
        width: innerWidth,
        height: innerHeight,
        data,
        hiddenIds,
        valueFormat,
        total,
        rows,
        columns,
        fillDirection,
        colors,
        emptyColor,
        borderColor,
        forwardLegendData,
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
                padding={padding}
                borderWidth={borderWidth}
                motionStagger={motionStagger}
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

    const customLayerProps = useCustomLayerProps<D>({
        cells,
        computedData,
    })

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
                    return <Fragment key={i}>{createElement(layer, customLayerProps)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const Waffle = <D extends Datum = Datum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: WaffleSvgProps<D>) => (
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
