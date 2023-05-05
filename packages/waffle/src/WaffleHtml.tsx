import { createElement, Fragment, ReactNode } from 'react'
import { Container, useDimensions } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import {
    Datum,
    CellComponent,
    WaffleHtmlProps,
    TooltipComponent,
    HtmlLayerId,
    ComputedDatum,
} from './types'
import { htmlDefaultProps } from './defaults'
import { useWaffle } from './hooks'
import { WaffleCellsHtml } from './WaffleCellsHtml'
import { WaffleAreasHtml } from './WaffleAreasHtml'

type InnerWaffleHtmlProps<D extends Datum> = Omit<
    WaffleHtmlProps<D>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerWaffleHtml = <D extends Datum>({
    width,
    height,
    margin: partialMargin,
    data,
    valueFormat,
    total,
    rows,
    columns,
    fillDirection = htmlDefaultProps.fillDirection,
    hiddenIds = htmlDefaultProps.hiddenIds,
    padding = htmlDefaultProps.padding,
    layers = htmlDefaultProps.layers as HtmlLayerId[],
    cellComponent = htmlDefaultProps.cellComponent as unknown as CellComponent<D>,
    colors = htmlDefaultProps.colors as OrdinalColorScaleConfig<D>,
    emptyColor = htmlDefaultProps.emptyColor,
    // emptyOpacity = defaultProps.emptyOpacity,
    borderWidth = htmlDefaultProps.borderWidth,
    borderColor = htmlDefaultProps.borderColor as InheritedColorConfig<ComputedDatum<D>>,
    // defs = defaultProps.defs,
    // fill = defaultProps.fill,
    isInteractive = htmlDefaultProps.isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = htmlDefaultProps.tooltip as TooltipComponent<D>,
    forwardLegendData,
    motionStagger = htmlDefaultProps.motionStagger,
    role = htmlDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    testIdPrefix,
}: InnerWaffleHtmlProps<D>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { cells, computedData } = useWaffle<D>({
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

    const layerById: Record<HtmlLayerId, ReactNode> = {
        cells: null,
        areas: null,
    }

    if (layers.includes('cells')) {
        layerById.cells = (
            <WaffleCellsHtml<D>
                key="cells"
                cells={cells}
                cellComponent={cellComponent}
                padding={padding}
                margin={margin}
                borderWidth={borderWidth}
                motionStagger={motionStagger}
                testIdPrefix={testIdPrefix}
            />
        )
    }

    if (layers.includes('areas')) {
        layerById.areas = (
            <WaffleAreasHtml<D>
                key="areas"
                data={computedData}
                margin={margin}
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

    return (
        <div
            style={{
                position: 'relative',
                width: outerWidth,
                height: outerHeight,
            }}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </div>
    )
}

export const WaffleHtml = <D extends Datum = Datum>({
    isInteractive = htmlDefaultProps.isInteractive,
    animate = htmlDefaultProps.animate,
    motionConfig = htmlDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: WaffleHtmlProps<D>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerWaffleHtml<D> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
