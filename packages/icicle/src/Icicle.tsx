import { Fragment, ReactNode } from 'react'
import { RectLabelsLayer } from '@nivo/rects'
import {
    // @ts-expect-error no types
    bindDefs,
    Container,
    SvgWrapper,
    useDimensions,
} from '@nivo/core'
import { IcicleSvgProps, IcicleSvgPropsWithDefaults, IcicleLayerId, ComputedDatum } from './types'
import { useIcicle, useIcicleCustomLayerProps } from './hooks'
import { svgDefaultProps } from './defaults'
import { Rects } from './Rects'

const InnerIcicle = <Datum,>({
    data,
    identity = svgDefaultProps.identity as IcicleSvgPropsWithDefaults<Datum>['identity'],
    value = svgDefaultProps.value as IcicleSvgPropsWithDefaults<Datum>['value'],
    valueFormat,
    margin: partialMargin,
    width,
    height,
    orientation = svgDefaultProps.orientation,
    padding = svgDefaultProps.padding,
    layers = svgDefaultProps.layers as readonly IcicleLayerId[],
    colors = svgDefaultProps.colors as IcicleSvgPropsWithDefaults<Datum>['colors'],
    colorBy = svgDefaultProps.colorBy,
    inheritColorFromParent = svgDefaultProps.inheritColorFromParent,
    childColor = svgDefaultProps.childColor as IcicleSvgPropsWithDefaults<Datum>['childColor'],
    borderRadius = svgDefaultProps.borderRadius,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor as IcicleSvgPropsWithDefaults<Datum>['borderColor'],
    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill,
    enableRectLabels = svgDefaultProps.enableRectLabels,
    rectLabel = svgDefaultProps.rectLabel as IcicleSvgPropsWithDefaults<Datum>['rectLabel'],
    rectLabelsOffsetX = svgDefaultProps.rectLabelsOffsetX,
    rectLabelsOffsetY = svgDefaultProps.rectLabelsOffsetY,
    rectLabelsSkipWidth = svgDefaultProps.rectLabelsSkipWidth,
    rectLabelsSkipHeight = svgDefaultProps.rectLabelsSkipHeight,
    rectLabelsTextColor = svgDefaultProps.rectLabelsTextColor as IcicleSvgPropsWithDefaults<Datum>['rectLabelsTextColor'],
    rectLabelsComponent,
    isInteractive = svgDefaultProps.isInteractive,
    enableZooming = svgDefaultProps.enableZooming,
    zoomMode = svgDefaultProps.zoomMode,
    tooltip = svgDefaultProps.tooltip as IcicleSvgPropsWithDefaults<Datum>['tooltip'],
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onWheel,
    onContextMenu,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: IcicleSvgProps<Datum>) => {
    const { margin, outerHeight, outerWidth, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, zoom } = useIcicle<Datum>({
        data,
        identity,
        value,
        valueFormat,
        colors,
        colorBy,
        inheritColorFromParent,
        childColor,
        width: innerWidth,
        height: innerHeight,
        orientation,
        padding,
        enableZooming,
        zoomMode,
    })

    const boundDefs = bindDefs(defs, nodes, fill, {
        dataKey: '.',
        colorKey: 'color',
        targetKey: 'fill',
    })

    const layerById: Record<IcicleLayerId, ReactNode> = {
        rects: null,
        rectLabels: null,
    }

    if (layers.includes('rects')) {
        layerById.rects = (
            <Rects<Datum>
                key="rects"
                data={nodes}
                borderRadius={borderRadius}
                borderWidth={borderWidth}
                borderColor={borderColor}
                isInteractive={isInteractive}
                enableZooming={enableZooming}
                zoom={zoom}
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

    if (enableRectLabels && layers.includes('rectLabels')) {
        layerById.rectLabels = (
            <RectLabelsLayer<ComputedDatum<Datum>>
                key="rectLabels"
                data={nodes}
                label={rectLabel}
                textColor={rectLabelsTextColor}
                component={rectLabelsComponent}
                offsetX={rectLabelsOffsetX}
                offsetY={rectLabelsOffsetY}
                skipWidth={rectLabelsSkipWidth}
                skipHeight={rectLabelsSkipHeight}
                transitionMode="flow-right"
            />
        )
    }

    const customLayerProps = useIcicleCustomLayerProps<Datum>({
        nodes,
        zoom,
    })

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            defs={boundDefs}
            margin={margin}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{layer(customLayerProps)}</Fragment>
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

export const Icicle = <Datum,>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: IcicleSvgProps<Datum>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerIcicle<Datum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
