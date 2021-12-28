import { useState, Fragment, useMemo, ReactNode, createElement } from 'react'
import {
    // @ts-ignore
    bindDefs,
    useDimensions,
    SvgWrapper,
    Container,
} from '@nivo/core'
import { Grid, Axes } from '@nivo/axes'
import { useAreaBump } from './hooks'
import { Area } from './Area'
import { AreasLabels } from './AreasLabels'
import {
    AreaBumpSvgProps,
    AreaBumpDatum,
    DefaultAreaBumpDatum,
    AreaBumpLayerId,
    AreaBumpCustomLayerProps,
} from './types'
import { areaBumpSvgDefaultProps } from './defaults'

type InnerAreaBumpProps<D extends AreaBumpDatum> = Omit<
    AreaBumpSvgProps<D>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerAreaBump = <D extends AreaBumpDatum>({
    data,
    align = areaBumpSvgDefaultProps.align,

    width,
    height,
    margin: partialMargin,

    layers = areaBumpSvgDefaultProps.layers,

    interpolation = areaBumpSvgDefaultProps.interpolation,
    spacing = areaBumpSvgDefaultProps.spacing,
    xPadding = areaBumpSvgDefaultProps.xPadding,

    colors = areaBumpSvgDefaultProps.colors,
    blendMode = areaBumpSvgDefaultProps.blendMode,
    fillOpacity = areaBumpSvgDefaultProps.fillOpacity,
    activeFillOpacity = areaBumpSvgDefaultProps.activeFillOpacity,
    inactiveFillOpacity = areaBumpSvgDefaultProps.inactiveFillOpacity,
    defs = areaBumpSvgDefaultProps.defs,
    fill = areaBumpSvgDefaultProps.fill,
    borderWidth = areaBumpSvgDefaultProps.borderWidth,
    activeBorderWidth = areaBumpSvgDefaultProps.activeBorderWidth,
    inactiveBorderWidth = areaBumpSvgDefaultProps.inactiveBorderWidth,
    borderColor = areaBumpSvgDefaultProps.borderColor,
    borderOpacity = areaBumpSvgDefaultProps.borderOpacity,
    activeBorderOpacity = areaBumpSvgDefaultProps.activeBorderOpacity,
    inactiveBorderOpacity = areaBumpSvgDefaultProps.inactiveBorderOpacity,

    startLabel = areaBumpSvgDefaultProps.startLabel,
    startLabelPadding = areaBumpSvgDefaultProps.startLabelPadding,
    startLabelTextColor = areaBumpSvgDefaultProps.startLabelTextColor,
    endLabel = areaBumpSvgDefaultProps.endLabel,
    endLabelPadding = areaBumpSvgDefaultProps.endLabelPadding,
    endLabelTextColor = areaBumpSvgDefaultProps.endLabelTextColor,

    enableGridX = areaBumpSvgDefaultProps.enableGridX,
    axisTop = areaBumpSvgDefaultProps.axisTop,
    axisBottom = areaBumpSvgDefaultProps.axisBottom,

    isInteractive = areaBumpSvgDefaultProps.isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = areaBumpSvgDefaultProps.tooltip,
    role = areaBumpSvgDefaultProps.role,
}: InnerAreaBumpProps<D>) => {
    const [currentSerie, setCurrentSerie] = useState(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { series, xScale, heightScale, areaGenerator } = useAreaBump<D>({
        data,
        width: innerWidth,
        height: innerHeight,
        align,
        spacing,
        xPadding,
        interpolation,
        colors,
        fillOpacity,
        activeFillOpacity,
        inactiveFillOpacity,
        borderWidth,
        activeBorderWidth,
        inactiveBorderWidth,
        borderColor,
        borderOpacity,
        activeBorderOpacity,
        inactiveBorderOpacity,
        isInteractive,
        current: currentSerie,
    })

    const boundDefs = useMemo(
        () => bindDefs(defs, series, fill, { targetKey: 'fill' }),
        [defs, series, fill]
    )

    const layerById: Record<AreaBumpLayerId, ReactNode> = {
        grid: null,
        axes: null,
        labels: null,
        areas: null,
    }

    if (layers.includes('grid') && enableGridX) {
        layerById.grid = <Grid key="grid" width={innerWidth} height={innerHeight} xScale={xScale} />
    }

    if (layers.includes('axes')) {
        layerById.axes = (
            <Axes
                key="axes"
                xScale={xScale}
                yScale={heightScale}
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                bottom={axisBottom}
            />
        )
    }

    if (layers.includes('areas')) {
        layerById.areas = (
            <Fragment key="areas">
                {series.map(serie => (
                    <Area<D>
                        key={serie.id}
                        areaGenerator={areaGenerator}
                        serie={serie}
                        blendMode={blendMode}
                        isInteractive={isInteractive}
                        setCurrentSerie={setCurrentSerie}
                        onMouseEnter={onMouseEnter}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        onClick={onClick}
                        tooltip={tooltip}
                    />
                ))}
            </Fragment>
        )
    }

    if (layers.includes('labels')) {
        layerById.labels = (
            <Fragment key="labels">
                {startLabel !== false && (
                    <AreasLabels<D>
                        label={startLabel}
                        series={series}
                        position="start"
                        padding={startLabelPadding}
                        color={startLabelTextColor}
                    />
                )}
                {endLabel !== false && (
                    <AreasLabels<D>
                        label={endLabel}
                        series={series}
                        position="end"
                        padding={endLabelPadding}
                        color={endLabelTextColor}
                    />
                )}
            </Fragment>
        )
    }

    const customLayerProps: AreaBumpCustomLayerProps<D> = useMemo(
        () => ({
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight,
            series,
            xScale,
            areaGenerator,
        }),
        [innerWidth, innerHeight, outerWidth, outerHeight, series, xScale, areaGenerator]
    )

    return (
        <SvgWrapper
            defs={boundDefs}
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
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

export const AreaBump = <D extends AreaBumpDatum = DefaultAreaBumpDatum>({
    isInteractive = areaBumpSvgDefaultProps.isInteractive,
    animate = areaBumpSvgDefaultProps.animate,
    motionConfig = areaBumpSvgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: AreaBumpSvgProps<D>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerAreaBump<D> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
