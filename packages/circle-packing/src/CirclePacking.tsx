import React, { createElement, Fragment, ReactNode } from 'react'
import {
    // @ts-ignore
    bindDefs,
    useDimensions,
    Container,
    SvgWrapper,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { CirclePackingLayerId, CirclePackingSvgProps, ComputedDatum } from './types'
import { useCirclePacking, useCirclePackingLayerContext } from './hooks'
import { defaultProps } from './props'
import { Circles } from './Circles'
import { CircleSvg } from './CircleSvg'
import { Labels } from './Labels'
import { LabelSvg } from './LabelSvg'

const InnerCirclePacking = <RawDatum,>({
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
    childColor = defaultProps.childColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    enableLabels = defaultProps.enableLabels,
    label = defaultProps.label,
    labelsFilter,
    labelsSkipRadius = defaultProps.labelsSkipRadius,
    labelsTextColor = defaultProps.labelsTextColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    layers = defaultProps.layers,
    role = defaultProps.role,
}: Partial<
    Omit<CirclePackingSvgProps<RawDatum>, 'data' | 'width' | 'height' | 'animate' | 'motionConfig'>
> &
    Pick<CirclePackingSvgProps<RawDatum>, 'data' | 'width' | 'height'>) => {
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
        childColor,
    })

    const layerById: Record<CirclePackLayerId, ReactNode> = {
        circles: null,
        labels: null,
    }

    if (layers.includes('circles')) {
        layerById.circles = <Circles key="circles" data={nodes} />
    }

    if (enableLabels && layers.includes('labels')) {
        layerById.labels = (
            <Labels<RawDatum>
                key="labels"
                nodes={nodes}
                label={label}
                filter={labelsFilter}
                skipRadius={labelsSkipRadius}
                textColor={labelsTextColor}
                component={LabelSvg}
            />
        )
    }

    const layerContext = useCirclePackingLayerContext<RawDatum>({
        nodes,
    })

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

export const CirclePacking = <RawDatum,>({
    isInteractive = defaultProps.isInteractive,
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    theme,
    ...otherProps
}: Partial<Omit<CirclePackingSvgProps<RawDatum>, 'data' | 'width' | 'height'>> &
    Pick<CirclePackingSvgProps<RawDatum>, 'data' | 'width' | 'height'>) => (
    <Container
        isInteractive={isInteractive}
        animate={animate}
        motionConfig={motionConfig}
        theme={theme}
    >
        <InnerCirclePacking<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
