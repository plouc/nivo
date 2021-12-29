import { createElement, useMemo, Fragment, ReactNode } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { Grid, Axes } from '@nivo/axes'
import {
    BumpDatum,
    BumpLayerId,
    BumpSerieExtraProps,
    BumpSvgProps,
    DefaultBumpDatum,
} from './types'
import { useBump } from './hooks'
import { bumpSvgDefaultProps } from './defaults'
import { Line } from './Line'
import { LinesLabels } from './LinesLabels'
import { Points } from './Points'

type InnerBumpProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> = Omit<
    BumpSvgProps<Datum, ExtraProps>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerBump = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    data,

    width,
    height,
    margin: partialMargin,

    layers = bumpSvgDefaultProps.layers,

    interpolation = bumpSvgDefaultProps.interpolation,
    xPadding = bumpSvgDefaultProps.xPadding,
    xOuterPadding = bumpSvgDefaultProps.xOuterPadding,
    yOuterPadding = bumpSvgDefaultProps.yOuterPadding,

    colors = bumpSvgDefaultProps.colors,
    lineWidth = bumpSvgDefaultProps.lineWidth,
    activeLineWidth = bumpSvgDefaultProps.activeLineWidth,
    inactiveLineWidth = bumpSvgDefaultProps.inactiveLineWidth,
    opacity = bumpSvgDefaultProps.opacity,
    activeOpacity = bumpSvgDefaultProps.activeOpacity,
    inactiveOpacity = bumpSvgDefaultProps.inactiveOpacity,

    startLabel = bumpSvgDefaultProps.startLabel,
    startLabelPadding = bumpSvgDefaultProps.startLabelPadding,
    startLabelTextColor = bumpSvgDefaultProps.startLabelTextColor,
    endLabel = bumpSvgDefaultProps.endLabel,
    endLabelPadding = bumpSvgDefaultProps.endLabelPadding,
    endLabelTextColor = bumpSvgDefaultProps.endLabelTextColor,

    pointComponent = bumpSvgDefaultProps.pointComponent,
    pointSize = bumpSvgDefaultProps.pointSize,
    activePointSize = bumpSvgDefaultProps.activePointSize,
    inactivePointSize = bumpSvgDefaultProps.inactivePointSize,
    pointColor = bumpSvgDefaultProps.pointColor,
    pointBorderWidth = bumpSvgDefaultProps.pointBorderWidth,
    activePointBorderWidth = bumpSvgDefaultProps.activePointBorderWidth,
    inactivePointBorderWidth = bumpSvgDefaultProps.inactivePointBorderWidth,
    pointBorderColor = bumpSvgDefaultProps.pointBorderColor,

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
    tooltip = bumpSvgDefaultProps.tooltip,
    role = bumpSvgDefaultProps.role,
}: InnerBumpProps<Datum, ExtraProps>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { series, points, xScale, yScale, lineGenerator, activeSerieIds, setActiveSerieIds } =
        useBump<Datum, ExtraProps>({
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

    if (layers.includes('points')) {
        layerById.points = (
            <Points<Datum, ExtraProps>
                key="points"
                pointComponent={pointComponent}
                points={points}
            />
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

    const customLayerProps = useMemo(
        () => ({
            innerHeight,
            innerWidth,
            lineGenerator,
            points,
            series,
            xScale,
            yScale,
            activeSerieIds,
            setActiveSerieIds,
        }),
        [
            activeSerieIds,
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
    ExtraProps extends BumpSerieExtraProps = {}
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
