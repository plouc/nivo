import React, { createElement, Fragment, ReactNode } from 'react'
import { Container, useDimensions } from '@bitbloom/nivo-core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@bitbloom/nivo-colors'
import { CirclePackingHtmlProps, CirclePackingLayerId, ComputedDatum } from './types'
import { useCirclePacking, useCirclePackingLayerContext, useCirclePackingZoom } from './hooks'
import { Circles } from './Circles'
import { CircleHtml } from './CircleHtml'
import { defaultProps } from './props'
import { Labels } from './Labels'
import { LabelHtml } from './LabelHtml'

type InnerCirclePackingHtmlProps<RawDatum> = Partial<
    Omit<
        CirclePackingHtmlProps<RawDatum>,
        'data' | 'width' | 'height' | 'isInteractive' | 'animate' | 'motionConfig'
    >
> &
    Pick<CirclePackingHtmlProps<RawDatum>, 'data' | 'width' | 'height' | 'isInteractive'>

export const InnerCirclePackingHtml = <RawDatum,>({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    width,
    height,
    margin: partialMargin,
    padding = defaultProps.padding,
    leavesOnly = defaultProps.leavesOnly,
    colors = defaultProps.colors as OrdinalColorScaleConfig<
        Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>
    >,
    colorBy = defaultProps.colorBy,
    inheritColorFromParent = defaultProps.inheritColorFromParent,
    childColor = defaultProps.childColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    circleComponent = CircleHtml,
    enableLabels = defaultProps.enableLabels,
    label = defaultProps.label,
    labelsFilter,
    labelsSkipRadius = defaultProps.labelsSkipRadius,
    labelTextColor = defaultProps.labelTextColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    labelComponent = LabelHtml,
    layers = defaultProps.layers,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = defaultProps.tooltip,
    zoomedId,
    role = defaultProps.role,
}: InnerCirclePackingHtmlProps<RawDatum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const nodes = useCirclePacking<RawDatum>({
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

    const zoomedNodes = useCirclePackingZoom<RawDatum>(nodes, zoomedId, innerWidth, innerHeight)

    const layerById: Record<CirclePackingLayerId, ReactNode> = {
        circles: null,
        labels: null,
    }

    if (layers.includes('circles')) {
        layerById.circles = (
            <Circles<RawDatum>
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
            <Labels<RawDatum>
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

    const layerContext = useCirclePackingLayerContext<RawDatum>({
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

export const CirclePackingHtml = <RawDatum,>({
    theme,
    isInteractive = defaultProps.isInteractive,
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    ...otherProps
}: Partial<Omit<CirclePackingHtmlProps<RawDatum>, 'data' | 'width' | 'height'>> &
    Pick<CirclePackingHtmlProps<RawDatum>, 'data' | 'width' | 'height'>) => (
    <Container
        isInteractive={isInteractive}
        animate={animate}
        motionConfig={motionConfig}
        theme={theme}
    >
        <InnerCirclePackingHtml<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
