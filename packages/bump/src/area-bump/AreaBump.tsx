import { Fragment, useMemo, ReactNode, createElement } from 'react'
import { bindDefs, useDimensions, SvgWrapper, Container } from '@nivo/core'
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
    AreaBumpSerieExtraProps,
} from './types'
import { areaBumpSvgDefaultProps } from './defaults'

type InnerAreaBumpProps<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> = Omit<
    AreaBumpSvgProps<Datum, ExtraProps>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerAreaBump = <Datum extends AreaBumpDatum, ExtraProps extends AreaBumpSerieExtraProps>({
    data,
    align = areaBumpSvgDefaultProps.align,

    width,
    height,
    margin: partialMargin,

    layers = areaBumpSvgDefaultProps.layers as NonNullable<
        AreaBumpSvgProps<Datum, ExtraProps>['layers']
    >,

    interpolation = areaBumpSvgDefaultProps.interpolation,
    spacing = areaBumpSvgDefaultProps.spacing,
    xPadding = areaBumpSvgDefaultProps.xPadding,

    colors = areaBumpSvgDefaultProps.colors as NonNullable<
        AreaBumpSvgProps<Datum, ExtraProps>['colors']
    >,
    blendMode = areaBumpSvgDefaultProps.blendMode,
    fillOpacity = areaBumpSvgDefaultProps.fillOpacity,
    activeFillOpacity = areaBumpSvgDefaultProps.activeFillOpacity,
    inactiveFillOpacity = areaBumpSvgDefaultProps.inactiveFillOpacity,
    defs = areaBumpSvgDefaultProps.defs,
    fill = areaBumpSvgDefaultProps.fill as NonNullable<AreaBumpSvgProps<Datum, ExtraProps>['fill']>,
    borderWidth = areaBumpSvgDefaultProps.borderWidth,
    activeBorderWidth = areaBumpSvgDefaultProps.activeBorderWidth,
    inactiveBorderWidth = areaBumpSvgDefaultProps.inactiveBorderWidth,
    borderColor = areaBumpSvgDefaultProps.borderColor as NonNullable<
        AreaBumpSvgProps<Datum, ExtraProps>['borderColor']
    >,
    borderOpacity = areaBumpSvgDefaultProps.borderOpacity,
    activeBorderOpacity = areaBumpSvgDefaultProps.activeBorderOpacity,
    inactiveBorderOpacity = areaBumpSvgDefaultProps.inactiveBorderOpacity,

    startLabel = areaBumpSvgDefaultProps.startLabel as NonNullable<
        AreaBumpSvgProps<Datum, ExtraProps>['startLabel']
    >,
    startLabelPadding = areaBumpSvgDefaultProps.startLabelPadding,
    startLabelTextColor = areaBumpSvgDefaultProps.startLabelTextColor as NonNullable<
        AreaBumpSvgProps<Datum, ExtraProps>['startLabelTextColor']
    >,
    endLabel = areaBumpSvgDefaultProps.endLabel as NonNullable<
        AreaBumpSvgProps<Datum, ExtraProps>['endLabel']
    >,
    endLabelPadding = areaBumpSvgDefaultProps.endLabelPadding,
    endLabelTextColor = areaBumpSvgDefaultProps.endLabelTextColor as NonNullable<
        AreaBumpSvgProps<Datum, ExtraProps>['endLabelTextColor']
    >,

    enableGridX = areaBumpSvgDefaultProps.enableGridX,
    axisTop = areaBumpSvgDefaultProps.axisTop,
    axisBottom = areaBumpSvgDefaultProps.axisBottom,

    isInteractive = areaBumpSvgDefaultProps.isInteractive,
    defaultActiveSerieIds = areaBumpSvgDefaultProps.defaultActiveSerieIds,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = areaBumpSvgDefaultProps.tooltip as NonNullable<
        AreaBumpSvgProps<Datum, ExtraProps>['tooltip']
    >,
    role = areaBumpSvgDefaultProps.role,
}: InnerAreaBumpProps<Datum, ExtraProps>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { series, xScale, heightScale, areaGenerator, setActiveSerieIds } = useAreaBump<
        Datum,
        ExtraProps
    >({
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
        defaultActiveSerieIds,
    })

    const boundDefs = useMemo(
        () => bindDefs(defs ?? [], series, fill, { targetKey: 'fill' }),
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
                    <Area<Datum, ExtraProps>
                        key={serie.id}
                        areaGenerator={areaGenerator}
                        serie={serie}
                        blendMode={blendMode}
                        isInteractive={isInteractive}
                        setActiveSerieIds={setActiveSerieIds}
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
                    <AreasLabels<Datum, ExtraProps>
                        getLabel={startLabel}
                        series={series}
                        position="start"
                        padding={startLabelPadding}
                        color={startLabelTextColor}
                    />
                )}
                {endLabel !== false && (
                    <AreasLabels<Datum, ExtraProps>
                        getLabel={endLabel}
                        series={series}
                        position="end"
                        padding={endLabelPadding}
                        color={endLabelTextColor}
                    />
                )}
            </Fragment>
        )
    }

    const customLayerProps: AreaBumpCustomLayerProps<Datum, ExtraProps> = useMemo(
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

export const AreaBump = <
    Datum extends AreaBumpDatum = DefaultAreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps = Record<string, unknown>
>({
    isInteractive = areaBumpSvgDefaultProps.isInteractive,
    animate = areaBumpSvgDefaultProps.animate,
    motionConfig = areaBumpSvgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: AreaBumpSvgProps<Datum, ExtraProps>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerAreaBump<Datum, ExtraProps> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
