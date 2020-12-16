import React, { Fragment, ReactNode, createElement, useMemo } from 'react'
import {
    // @ts-ignore
    bindDefs,
    Container,
    SvgWrapper,
    useDimensions,
} from '@nivo/core'
import { ArcLabelsLayer } from '@nivo/arcs'
import { defaultProps } from './props'
import { useSunburst, useSunburstLayerContext } from './hooks'
import { SvgProps, SunburstLayerId, SunburstLayer, ComputedDatum } from './types'
import { Arcs } from './Arcs'

const InnerSunburst = <RawDatum,>({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,

    layers = defaultProps.layers as SunburstLayer<RawDatum>[],

    colors = defaultProps.colors,
    childColor = defaultProps.childColor,

    margin: partialMargin,
    width,
    height,

    cornerRadius = defaultProps.cornerRadius,

    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor,

    // arc labels
    enableArcLabels = defaultProps.enableArcLabels,
    arcLabel = defaultProps.arcLabel,
    arcLabelsRadiusOffset = defaultProps.arcLabelsRadiusOffset,
    arcLabelsSkipAngle = defaultProps.arcLabelsSkipAngle,
    arcLabelsTextColor = defaultProps.arcLabelsTextColor,
    arcLabelsComponent,

    defs = defaultProps.defs,
    fill = defaultProps.fill,

    role = defaultProps.role,

    transitionMode = defaultProps.transitionMode,

    // interactivity
    isInteractive = defaultProps.isInteractive,
    tooltip = defaultProps.tooltip,

    // event handlers
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
}: SvgProps<RawDatum>) => {
    const { innerHeight, innerWidth, margin, outerHeight, outerWidth } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { centerX, centerY, radius } = useMemo(() => {
        const radius = Math.min(innerWidth, innerHeight) / 2

        return { radius, centerX: innerWidth / 2, centerY: innerHeight / 2 }
    }, [innerHeight, innerWidth])

    const { arcGenerator, nodes } = useSunburst({
        childColor,
        colors,
        cornerRadius,
        data,
        id,
        radius,
        value,
        valueFormat,
    })

    const boundDefs = bindDefs(defs, nodes, fill, {
        dataKey: '.',
        colorKey: 'color',
        targetKey: 'fill',
    })

    const layerById: Record<SunburstLayerId, ReactNode> = {
        arcs: null,
        arcLabels: null,
    }

    if (layers.includes('arcs')) {
        layerById.arcs = (
            <Arcs<RawDatum>
                key="arcs"
                center={[centerX, centerY]}
                data={nodes}
                arcGenerator={arcGenerator}
                borderWidth={borderWidth}
                borderColor={borderColor}
                transitionMode={transitionMode}
                isInteractive={isInteractive}
                tooltip={tooltip}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseMove={onMouseMove}
            />
        )
    }

    if (enableArcLabels && layers.includes('arcLabels')) {
        layerById.arcLabels = (
            <ArcLabelsLayer<ComputedDatum<RawDatum>>
                key="arcLabels"
                center={[centerX, centerY]}
                data={nodes}
                label={arcLabel}
                radiusOffset={arcLabelsRadiusOffset}
                skipAngle={arcLabelsSkipAngle}
                textColor={arcLabelsTextColor}
                transitionMode={transitionMode}
                component={arcLabelsComponent}
            />
        )
    }

    const layerContext = useSunburstLayerContext<RawDatum>({
        nodes,
        arcGenerator,
        centerX,
        centerY,
        radius,
    })

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            defs={boundDefs}
            margin={margin}
            role={role}
        >
            {layers.map((layer, i) => {
                if (layerById[layer as SunburstLayerId] !== undefined) {
                    return layerById[layer as SunburstLayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

export const Sunburst = <RawDatum,>({
    isInteractive = defaultProps.isInteractive,
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    theme,
    ...otherProps
}: SvgProps<RawDatum>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme }}>
        <InnerSunburst<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
