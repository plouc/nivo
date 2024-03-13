import { createElement, useMemo, Fragment, ReactNode } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { Grid, Axes } from '@nivo/axes'
import {
    BumpCustomLayerProps,
    BumpDatum,
    BumpLayerId,
    BumpPointMouseHandler,
    BumpSerieExtraProps,
    BumpSerieMouseHandler,
    BumpSvgProps,
    DefaultBumpDatum,
} from './types'
import { useBump } from './hooks'
import { bumpSvgDefaultProps } from './defaults'
import { Line } from './Line'
import { LinesLabels } from './LinesLabels'
import { Mesh } from './Mesh'

type InnerBumpProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> = Omit<
    BumpSvgProps<Datum, ExtraProps>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerBump = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    data,

    width,
    height,
    margin: partialMargin,

    layers = bumpSvgDefaultProps.layers as NonNullable<BumpSvgProps<Datum, ExtraProps>['layers']>,

    interpolation = bumpSvgDefaultProps.interpolation,
    xPadding = bumpSvgDefaultProps.xPadding,
    xOuterPadding = bumpSvgDefaultProps.xOuterPadding,
    yOuterPadding = bumpSvgDefaultProps.yOuterPadding,

    colors = bumpSvgDefaultProps.colors as NonNullable<BumpSvgProps<Datum, ExtraProps>['colors']>,
    lineWidth = bumpSvgDefaultProps.lineWidth,
    activeLineWidth = bumpSvgDefaultProps.activeLineWidth,
    inactiveLineWidth = bumpSvgDefaultProps.inactiveLineWidth,
    opacity = bumpSvgDefaultProps.opacity,
    activeOpacity = bumpSvgDefaultProps.activeOpacity,
    inactiveOpacity = bumpSvgDefaultProps.inactiveOpacity,

    startLabel = bumpSvgDefaultProps.startLabel as NonNullable<
        BumpSvgProps<Datum, ExtraProps>['startLabel']
    >,
    startLabelPadding = bumpSvgDefaultProps.startLabelPadding,
    startLabelTextColor = bumpSvgDefaultProps.startLabelTextColor as NonNullable<
        BumpSvgProps<Datum, ExtraProps>['startLabelTextColor']
    >,
    endLabel = bumpSvgDefaultProps.endLabel as NonNullable<
        BumpSvgProps<Datum, ExtraProps>['endLabel']
    >,
    endLabelPadding = bumpSvgDefaultProps.endLabelPadding,
    endLabelTextColor = bumpSvgDefaultProps.endLabelTextColor as NonNullable<
        BumpSvgProps<Datum, ExtraProps>['endLabelTextColor']
    >,

    pointComponent = bumpSvgDefaultProps.pointComponent as NonNullable<
        BumpSvgProps<Datum, ExtraProps>['pointComponent']
    >,
    pointSize = bumpSvgDefaultProps.pointSize,
    activePointSize = bumpSvgDefaultProps.activePointSize,
    inactivePointSize = bumpSvgDefaultProps.inactivePointSize,
    pointColor = bumpSvgDefaultProps.pointColor as NonNullable<
        BumpSvgProps<Datum, ExtraProps>['pointColor']
    >,
    pointBorderWidth = bumpSvgDefaultProps.pointBorderWidth,
    activePointBorderWidth = bumpSvgDefaultProps.activePointBorderWidth,
    inactivePointBorderWidth = bumpSvgDefaultProps.inactivePointBorderWidth,
    pointBorderColor = bumpSvgDefaultProps.pointBorderColor as NonNullable<
        BumpSvgProps<Datum, ExtraProps>['pointBorderColor']
    >,

    enableGridX = bumpSvgDefaultProps.enableGridX,
    enableGridY = bumpSvgDefaultProps.enableGridY,
    axisTop = bumpSvgDefaultProps.axisTop,
    axisRight,
    axisBottom = bumpSvgDefaultProps.axisBottom,
    axisLeft = bumpSvgDefaultProps.axisLeft,

    isInteractive = bumpSvgDefaultProps.isInteractive,
    defaultActiveSerieIds = bumpSvgDefaultProps.defaultActiveSerieIds,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    useMesh = bumpSvgDefaultProps.useMesh,
    debugMesh = bumpSvgDefaultProps.debugMesh,
    lineTooltip = bumpSvgDefaultProps.lineTooltip as NonNullable<
        BumpSvgProps<Datum, ExtraProps>['lineTooltip']
    >,
    pointTooltip = bumpSvgDefaultProps.pointTooltip as NonNullable<
        BumpSvgProps<Datum, ExtraProps>['pointTooltip']
    >,
    role = bumpSvgDefaultProps.role,
}: InnerBumpProps<Datum, ExtraProps>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        series,
        points,
        xScale,
        yScale,
        lineGenerator,
        activePointIds,
        activeSerieIds,
        setActiveSerieIds,
        setActivePointIds,
    } = useBump<Datum, ExtraProps>({
        width: innerWidth,
        height: innerHeight,
        data,
        interpolation,
        xPadding,
        xOuterPadding,
        yOuterPadding,
        lineWidth,
        activeLineWidth,
        inactiveLineWidth,
        colors,
        opacity,
        activeOpacity,
        inactiveOpacity,
        pointSize,
        activePointSize,
        inactivePointSize,
        pointColor,
        pointBorderWidth,
        activePointBorderWidth,
        inactivePointBorderWidth,
        pointBorderColor,
        isInteractive,
        defaultActiveSerieIds,
    })

    const layerById: Record<BumpLayerId, ReactNode> = {
        grid: null,
        axes: null,
        labels: null,
        lines: null,
        points: null,
        mesh: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
            />
        )
    }

    if (layers.includes('axes')) {
        layerById.axes = (
            <Axes
                key="axes"
                xScale={xScale}
                yScale={yScale}
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        )
    }

    if (layers.includes('lines')) {
        layerById.lines = (
            <Fragment key="lines">
                {series.map(serie => (
                    <Line<Datum, ExtraProps>
                        key={serie.id}
                        serie={serie}
                        setActiveSerieIds={setActiveSerieIds}
                        lineGenerator={lineGenerator}
                        yStep={yScale.step()}
                        isInteractive={isInteractive}
                        onMouseEnter={onMouseEnter as BumpSerieMouseHandler<Datum, ExtraProps>}
                        onMouseMove={onMouseMove as BumpSerieMouseHandler<Datum, ExtraProps>}
                        onMouseLeave={onMouseLeave as BumpSerieMouseHandler<Datum, ExtraProps>}
                        onClick={onClick as BumpSerieMouseHandler<Datum, ExtraProps>}
                        lineTooltip={lineTooltip}
                        useMesh={useMesh}
                    />
                ))}
            </Fragment>
        )
    }

    if (isInteractive && useMesh && layers.includes('mesh')) {
        layerById.mesh = (
            <Mesh
                key="mesh"
                points={points}
                width={innerWidth}
                height={innerHeight}
                margin={margin}
                setActivePointIds={setActivePointIds}
                setActiveSerieIds={setActiveSerieIds}
                onMouseEnter={onMouseEnter as BumpPointMouseHandler<Datum, ExtraProps>}
                onMouseMove={onMouseMove as BumpPointMouseHandler<Datum, ExtraProps>}
                onMouseLeave={onMouseLeave as BumpPointMouseHandler<Datum, ExtraProps>}
                onClick={onClick as BumpPointMouseHandler<Datum, ExtraProps>}
                tooltip={pointTooltip}
                debug={debugMesh}
            />
        )
    }

    if (layers.includes('points')) {
        layerById.points = points.map(point =>
            createElement(pointComponent, {
                key: point.id,
                point,
            })
        )
    }

    if (layers.includes('labels')) {
        layerById.labels = (
            <Fragment key="legends">
                {startLabel !== false && (
                    <LinesLabels<Datum, ExtraProps>
                        series={series}
                        getLabel={startLabel}
                        position="start"
                        padding={startLabelPadding}
                        color={startLabelTextColor}
                    />
                )}
                {endLabel !== false && (
                    <LinesLabels<Datum, ExtraProps>
                        series={series}
                        getLabel={endLabel}
                        position="end"
                        padding={endLabelPadding}
                        color={endLabelTextColor}
                    />
                )}
            </Fragment>
        )
    }

    const customLayerProps: BumpCustomLayerProps<Datum, ExtraProps> = useMemo(
        () => ({
            innerHeight,
            innerWidth,
            lineGenerator,
            points,
            series,
            xScale,
            yScale,
            activeSerieIds,
            activePointIds,
            setActiveSerieIds,
            setActivePointIds,
        }),
        [
            activePointIds,
            activeSerieIds,
            setActivePointIds,
            setActiveSerieIds,
            innerHeight,
            innerWidth,
            lineGenerator,
            points,
            series,
            xScale,
            yScale,
        ]
    )

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} role={role}>
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, customLayerProps)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const Bump = <
    Datum extends BumpDatum = DefaultBumpDatum,
    ExtraProps extends BumpSerieExtraProps = Record<string, never>
>({
    isInteractive = bumpSvgDefaultProps.isInteractive,
    animate = bumpSvgDefaultProps.animate,
    motionConfig = bumpSvgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: BumpSvgProps<Datum, ExtraProps>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerBump<Datum, ExtraProps> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
