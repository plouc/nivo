import React, { createElement, Fragment, ReactNode } from 'react'
import { Container, useDimensions } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { CirclePackingHtmlProps, CirclePackingLayerId, ComputedDatum } from './types'
import { useCirclePacking, useCirclePackingLayerContext } from './hooks'
import { Circles } from './Circles'
import { CircleHtml } from './CircleHtml'
import { defaultProps } from './props'

export const InnerCirclePackingHtml = <RawDatum,>({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    width,
    height,
    margin: partialMargin,
    padding = defaultProps.padding,
    colors = defaultProps.colors as OrdinalColorScaleConfig<
        Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>
    >,
    colorBy = defaultProps.colorBy,
    childColor = defaultProps.childColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    layers = defaultProps.layers,
    role = defaultProps.role,
}: Omit<
    Partial<CirclePackingHtmlProps<RawDatum>>,
    'data' | 'width' | 'height' | 'animate' | 'motionConfig'
> &
    Pick<CirclePackingHtmlProps<RawDatum>, 'data' | 'width' | 'height'>) => {
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
        colors,
        colorBy,
        childColor,
    })

    const layerById: Record<CirclePackingLayerId, ReactNode> = {
        circles: null,
        labels: null,
    }

    if (layers.includes('circles')) {
        layerById.circles = <Circles<RawDatum> key="circles" nodes={nodes} component={CircleHtml} />
    }

    const layerContext = useCirclePackingLayerContext<RawDatum>({
        nodes,
    })

    return (
        <div
            role={role}
            style={{
                position: 'relative',
                width: outerWidth,
                height: outerHeight,
                marginTop: margin.top,
                marginLeft: margin.left,
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
    )
}

export const CirclePackingHtml = <RawDatum,>({
    theme,
    isInteractive = defaultProps.isInteractive,
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    ...otherProps
}: Omit<Partial<CirclePackingHtmlProps<RawDatum>>, 'data' | 'width' | 'height'> &
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
