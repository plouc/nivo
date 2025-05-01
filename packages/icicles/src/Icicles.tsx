import { InheritedColorConfig } from '@nivo/colors'
import {
    // @ts-ignore -- internal function
    bindDefs,
    Container,
    SvgWrapper,
    useDimensions,
} from '@nivo/core'
import { Fragment, ReactNode, createElement, useMemo } from 'react'
import { Rects } from './Rects'
import { useIcicles, useIciclesLayerContext } from './hooks'
import { RectLabelsLayer } from '@nivo/rects'
import { defaultProps } from './props'
import { IciclesSvgProps, IciclesLayerId, ComputedDatum } from './types'

type InnerIciclesProps<RawDatum> = Partial<
    Omit<
        IciclesSvgProps<RawDatum>,
        'data' | 'width' | 'height' | 'isInteractive' | 'animate' | 'motionConfig'
    >
> &
    Pick<IciclesSvgProps<RawDatum>, 'data' | 'width' | 'height' | 'isInteractive'>

const InnerIcicles = <RawDatum,>({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    layers = ['rects', 'rectLabels'],
    colors = defaultProps.colors,
    colorBy = defaultProps.colorBy,
    inheritColorFromParent = defaultProps.inheritColorFromParent,
    childColor = defaultProps.childColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor,
    margin: partialMargin,
    width,
    height,
    enableRectLabels = defaultProps.enableRectLabels,
    rectLabelsTextColor = defaultProps.rectLabelsTextColor,
    defs = defaultProps.defs,
    fill = defaultProps.fill,
    isInteractive = defaultProps.isInteractive,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onWheel,
    onContextMenu,
    tooltip = defaultProps.tooltip,
    role = defaultProps.role,
    rectLabel = defaultProps.rectLabel,
    rectLabelsComponent,
    rectLabelsSkipLength = defaultProps.rectLabelsSkipLength,
    rectLabelsSkipPercentage = defaultProps.rectLabelsSkipPercentage,
    direction = defaultProps.direction,
    rectLabelsOffset = defaultProps.rectLabelsOffset,
}: InnerIciclesProps<RawDatum>) => {
    const { margin, outerHeight, outerWidth } = useDimensions(width, height, partialMargin)

    const { nodes, baseOffsetLeft, baseOffsetTop } = useIcicles({
        data,
        id,
        value,
        valueFormat,
        colors,
        colorBy,
        inheritColorFromParent,
        childColor,
        height: outerHeight,
        width: outerWidth,
        direction,
    })

    const boundDefs = bindDefs(defs, nodes, fill, {
        dataKey: '.',
        colorKey: 'color',
        targetKey: 'fill',
    })

    const layerById: Record<IciclesLayerId, ReactNode> = {
        rects: null,
        rectLabels: null,
    }

    if (layers.includes('rects')) {
        layerById.rects = (
            <Rects<RawDatum>
                key="rects"
                data={nodes}
                borderWidth={borderWidth}
                borderColor={borderColor}
                isInteractive={isInteractive}
                tooltip={tooltip}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseMove={onMouseMove}
                onWheel={onWheel}
                onContextMenu={onContextMenu}
            />
        )
    }

    const filteredData = useMemo(
        () =>
            nodes.filter(datum => {
                return (
                    datum.rect.percentage >= rectLabelsSkipPercentage &&
                    datum.rect[['left', 'right'].includes(direction) ? 'height' : 'width'] >=
                        rectLabelsSkipLength
                )
            }),
        [nodes, rectLabelsSkipPercentage, rectLabelsSkipLength, direction]
    )

    if (enableRectLabels && layers.includes('rectLabels')) {
        layerById.rectLabels = (
            <RectLabelsLayer<ComputedDatum<RawDatum>>
                key="rectLabels"
                data={filteredData}
                label={rectLabel}
                textColor={rectLabelsTextColor}
                component={rectLabelsComponent}
                offset={rectLabelsOffset}
                baseOffsetLeft={baseOffsetLeft}
                baseOffsetTop={baseOffsetTop}
            />
        )
    }

    const layerContext = useIciclesLayerContext<RawDatum>({
        nodes,
        baseOffsetLeft,
        baseOffsetTop,
    })

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            defs={boundDefs}
            margin={margin}
            role={role}
        >
            {layers?.map((layer, i) => {
                if (layerById[layer as IciclesLayerId] !== undefined) {
                    return layerById[layer as IciclesLayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

export const Icicles = <RawDatum,>({
    isInteractive = defaultProps.isInteractive,
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: Partial<Omit<IciclesSvgProps<RawDatum>, 'data' | 'width' | 'height'>> &
    Pick<IciclesSvgProps<RawDatum>, 'data' | 'width' | 'height'>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerIcicles<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
