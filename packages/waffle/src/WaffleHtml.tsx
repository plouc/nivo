import { createElement, Fragment, ReactNode } from 'react'
import { Container, useDimensions } from '@nivo/core'
import { OrdinalColorScaleConfig } from '@nivo/colors'
import {
    Datum,
    DefaultRawDatum,
    HtmlCellComponent,
    HtmlProps,
    LayerId,
    TooltipComponent,
} from './types'
import { htmlDefaultProps } from './defaults'
import { useWaffle } from './hooks'
import { WaffleCellsHtml } from './WaffleCellsHtml'

type InnerWaffleHtmlProps<RawDatum extends Datum> = Omit<
    HtmlProps<RawDatum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerWaffleHtml = <RawDatum extends Datum>({
    width,
    height,
    margin: partialMargin,
    data,
    valueFormat,
    total,
    rows,
    columns,
    fillDirection = htmlDefaultProps.fillDirection,
    padding = htmlDefaultProps.padding,
    layers = htmlDefaultProps.layers,
    cellComponent = htmlDefaultProps.cellComponent as unknown as HtmlCellComponent<RawDatum>,
    colors = htmlDefaultProps.colors as OrdinalColorScaleConfig<RawDatum>,
    emptyColor = htmlDefaultProps.emptyColor,
    // emptyOpacity = defaultProps.emptyOpacity,
    borderWidth = htmlDefaultProps.borderWidth,
    borderColor = htmlDefaultProps.borderColor,
    // defs = defaultProps.defs,
    // fill = defaultProps.fill,
    isInteractive = htmlDefaultProps.isInteractive,
    tooltip = htmlDefaultProps.tooltip as TooltipComponent<RawDatum>,
    role = htmlDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    testIdPrefix,
}: InnerWaffleHtmlProps<RawDatum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { grid, computedData, getBorderColor } = useWaffle<RawDatum>({
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
        legends: null,
    }

    if (layers.includes('cells')) {
        layerById.cells = (
            <WaffleCellsHtml<RawDatum>
                key="cells"
                cells={grid.cells}
                computedData={computedData}
                cellComponent={cellComponent}
                cellSize={grid.cellSize}
                margin={margin}
                origin={grid.origin}
                borderWidth={borderWidth}
                getBorderColor={getBorderColor}
                isInteractive={isInteractive}
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

export const WaffleHtml = <RawDatum extends Datum = DefaultRawDatum>({
    isInteractive = htmlDefaultProps.isInteractive,
    animate = htmlDefaultProps.animate,
    motionConfig = htmlDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: HtmlProps<RawDatum>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerWaffleHtml<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
