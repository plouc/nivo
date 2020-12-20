import React, { createElement, Fragment, ReactNode } from 'react'
import {
    // @ts-ignore
    bindDefs,
    useDimensions,
    Container,
    SvgWrapper,
    usePropertyAccessor,
} from '@nivo/core'
import { CirclePackLayerId, CirclePackSvgProps } from './types'
import { useCirclePack } from './hooks'

const defaultProps = {
    id: 'id',
    value: 'value',

    layers: ['circles', 'labels'] as CirclePackLayerId[],

    isInteractive: true,

    animate: true,
    motionConfig: 'gentle',

    role: 'img',
}

const InnerCirclePack = <RawDatum,>({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,

    width,
    height,
    margin: partialMargin,

    layers = defaultProps.layers,

    role = defaultProps.role,
}: Partial<CirclePackSvgProps<RawDatum>>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    useCirclePack<RawDatum>({
        data,
        id,
        value,
    })
    const layerById: Record<CirclePackLayerId, ReactNode> = {
        circles: null,
        labels: null,
    }

    const layerContext = {}

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            //defs={boundDefs}
            role={role}
        >
            {layers.map((layer, i) => {
                if (layerById[layer as CirclePackLayerId] !== undefined) {
                    return layerById[layer as CirclePackLayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

export const CirclePack = <RawDatum,>({
    isInteractive = defaultProps.isInteractive,
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    theme,
    ...otherProps
}: CirclePackSvgProps<RawDatum>) => (
    <Container
        isInteractive={isInteractive}
        animate={animate}
        motionConfig={motionConfig}
        theme={theme}
    >
        <InnerCirclePack<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
