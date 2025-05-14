import { createElement, Fragment, ReactNode, forwardRef, Ref, ReactElement } from 'react'
import { Container, useDimensions, WithChartRef } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { CirclePackingHtmlProps, CirclePackingLayerId, ComputedDatum } from './types'
import { useCirclePacking, useCirclePackingLayerContext, useCirclePackingZoom } from './hooks'
import { Circles } from './Circles'
import { htmlDefaultProps } from './defaults'
import { Labels } from './Labels'

type InnerCirclePackingHtmlProps<Datum> = Omit<
    CirclePackingHtmlProps<Datum>,
    'animate' | 'motionConfig'
> & {
    forwardedRef: Ref<HTMLDivElement>
}

export const InnerCirclePackingHtml = <Datum,>({
    data,
    id = htmlDefaultProps.id,
    value = htmlDefaultProps.value,
    valueFormat,
    width,
    height,
    margin: partialMargin,
    padding = htmlDefaultProps.padding,
    leavesOnly = htmlDefaultProps.leavesOnly,
    colors = htmlDefaultProps.colors as OrdinalColorScaleConfig<
        Omit<ComputedDatum<Datum>, 'color' | 'fill'>
    >,
    colorBy = htmlDefaultProps.colorBy,
    inheritColorFromParent = htmlDefaultProps.inheritColorFromParent,
    childColor = htmlDefaultProps.childColor as InheritedColorConfig<ComputedDatum<Datum>>,
    borderWidth = htmlDefaultProps.borderWidth,
    borderColor = htmlDefaultProps.borderColor as InheritedColorConfig<ComputedDatum<Datum>>,
    circleComponent = htmlDefaultProps.circleComponent,
    enableLabels = htmlDefaultProps.enableLabels,
    label = htmlDefaultProps.label,
    labelsFilter,
    labelsSkipRadius = htmlDefaultProps.labelsSkipRadius,
    labelTextColor = htmlDefaultProps.labelTextColor as InheritedColorConfig<ComputedDatum<Datum>>,
    labelComponent = htmlDefaultProps.labelComponent,
    layers = htmlDefaultProps.layers,
    isInteractive = htmlDefaultProps.isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = htmlDefaultProps.tooltip,
    zoomedId,
    role = htmlDefaultProps.role,
    forwardedRef,
}: InnerCirclePackingHtmlProps<Datum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const nodes = useCirclePacking<Datum>({
        data,
        id,
        value,
        valueFormat,
        width: innerWidth,
        height: innerHeight,
        padding,
        leavesOnly,
        colors,
        colorBy,
        inheritColorFromParent,
        childColor,
    })

    const zoomedNodes = useCirclePackingZoom<Datum>(nodes, zoomedId, innerWidth, innerHeight)

    const layerById: Record<CirclePackingLayerId, ReactNode> = {
        circles: null,
        labels: null,
    }

    if (layers.includes('circles')) {
        layerById.circles = (
            <Circles<Datum>
                key="circles"
                nodes={zoomedNodes}
                borderWidth={borderWidth}
                borderColor={borderColor}
                isInteractive={isInteractive}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                component={circleComponent}
                tooltip={tooltip}
            />
        )
    }

    if (enableLabels && layers.includes('labels')) {
        layerById.labels = (
            <Labels<Datum>
                key="labels"
                nodes={zoomedNodes}
                label={label}
                filter={labelsFilter}
                skipRadius={labelsSkipRadius}
                textColor={labelTextColor}
                component={labelComponent}
            />
        )
    }

    const layerContext = useCirclePackingLayerContext<Datum>({
        nodes,
    })

    return (
        <div
            role={role}
            style={{
                position: 'relative',
                overflow: 'hidden',
                width: outerWidth,
                height: outerHeight,
            }}
            ref={forwardedRef}
        >
            <div
                style={{
                    position: 'absolute',
                    top: margin.top,
                    left: margin.left,
                }}
            >
                {layers.map((layer, i) => {
                    if (layerById[layer as CirclePackingLayerId] !== undefined) {
                        return layerById[layer as CirclePackingLayerId]
                    }

                    if (typeof layer === 'function') {
                        return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                    }

                    return null
                })}
            </div>
        </div>
    )
}

export const CirclePackingHtml = forwardRef(
    <Datum,>(
        {
            theme,
            isInteractive = htmlDefaultProps.isInteractive,
            animate = htmlDefaultProps.animate,
            motionConfig = htmlDefaultProps.motionConfig,
            ...otherProps
        }: CirclePackingHtmlProps<Datum>,
        ref: Ref<HTMLDivElement>
    ) => (
        <Container
            isInteractive={isInteractive}
            animate={animate}
            motionConfig={motionConfig}
            theme={theme}
        >
            <InnerCirclePackingHtml<Datum>
                isInteractive={isInteractive}
                {...otherProps}
                forwardedRef={ref}
            />
        </Container>
    )
) as <Datum>(props: WithChartRef<CirclePackingHtmlProps<Datum>, HTMLDivElement>) => ReactElement
