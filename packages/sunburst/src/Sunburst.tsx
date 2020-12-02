import React, { Fragment, ReactNode, createElement, useMemo } from 'react'
// @ts-ignore
import { Container, SvgWrapper, useDimensions, bindDefs } from '@nivo/core'
import { SunburstLabels } from './SunburstLabels'
import { SunburstArc } from './SunburstArc'
import { defaultProps } from './props'
import { useSunburst, useSunburstLayerContext } from './hooks'
import { SvgProps, SunburstLayerId, SunburstLayer } from './types'

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

    // slices labels
    enableSliceLabels = defaultProps.enableSliceLabels,
    sliceLabel = defaultProps.sliceLabel,
    sliceLabelsSkipAngle = defaultProps.sliceLabelsSkipAngle,
    sliceLabelsTextColor = defaultProps.sliceLabelsTextColor,

    defs = defaultProps.defs,
    fill = defaultProps.fill,

    role = defaultProps.role,

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

    const filteredNodes = useMemo(() => nodes.filter(node => node.depth > 0), [nodes])

    const boundDefs = bindDefs(defs, nodes, fill, {
        dataKey: 'data',
        colorKey: 'data.color',
        targetKey: 'data.fill',
    })

    const layerById: Record<SunburstLayerId, ReactNode> = {
        slices: null,
        sliceLabels: null,
    }

    if (layers.includes('slices')) {
        layerById.slices = (
            <g key="slices" transform={`translate(${centerX},${centerY})`}>
                {filteredNodes.map(node => (
                    <SunburstArc<RawDatum>
                        key={node.data.id}
                        node={node}
                        arcGenerator={arcGenerator}
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                        isInteractive={isInteractive}
                        tooltip={tooltip}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onMouseMove={onMouseMove}
                    />
                ))}
            </g>
        )
    }

    if (enableSliceLabels && layers.includes('sliceLabels')) {
        layerById.sliceLabels = (
            <SunburstLabels<RawDatum>
                key="sliceLabels"
                nodes={nodes}
                label={sliceLabel}
                skipAngle={sliceLabelsSkipAngle}
                textColor={sliceLabelsTextColor}
            />
        )
    }

    const layerContext = useSunburstLayerContext<RawDatum>({
        nodes: filteredNodes,
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
