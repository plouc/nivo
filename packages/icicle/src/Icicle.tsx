import { Fragment, ReactNode, useCallback } from 'react'
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
    gapX = svgDefaultProps.gapX,
    gapY = svgDefaultProps.gapY,
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
    enableLabels = svgDefaultProps.enableLabels,
    label = svgDefaultProps.label as IcicleSvgPropsWithDefaults<Datum>['label'],
    labelBoxAnchor = svgDefaultProps.labelBoxAnchor,
    labelAnchor = svgDefaultProps.labelAnchor,
    labelBaseline = svgDefaultProps.labelBaseline,
    labelPaddingX = svgDefaultProps.labelPaddingX,
    labelPaddingY = svgDefaultProps.labelPaddingY,
    labelRotation = svgDefaultProps.labelRotation,
    labelSkipWidth = svgDefaultProps.labelSkipWidth,
    labelSkipHeight = svgDefaultProps.labelSkipHeight,
    labelTextColor = svgDefaultProps.labelTextColor as IcicleSvgPropsWithDefaults<Datum>['labelTextColor'],
    labelComponent,
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
    rectsTransitionMode = svgDefaultProps.rectsTransitionMode,
    labelsTransitionMode = svgDefaultProps.labelsTransitionMode,
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
        width: innerWidth,
        height: innerHeight,
        orientation,
        gapX,
        gapY,
        colors,
        colorBy,
        inheritColorFromParent,
        childColor,
        enableZooming,
        zoomMode,
    })

    const boundDefs = bindDefs(defs, nodes, fill, {
        colorKey: 'color',
        targetKey: 'fill',
    })

    const layerById: Record<IcicleLayerId, ReactNode> = {
        rects: null,
        labels: null,
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
                transitionMode={rectsTransitionMode}
            />
        )
    }

    const getLabelTestId = useCallback(
        (datum: Omit<ComputedDatum<Datum>, 'rect'>) => `icicle.label.${datum.path}`,
        []
    )

    if (enableLabels && layers.includes('labels')) {
        layerById.labels = (
            <RectLabelsLayer<ComputedDatum<Datum>>
                key="labels"
                data={nodes}
                uid="path"
                label={label}
                boxAnchor={labelBoxAnchor}
                anchor={labelAnchor}
                baseline={labelBaseline}
                paddingX={labelPaddingX}
                paddingY={labelPaddingY}
                rotation={labelRotation}
                skipWidth={labelSkipWidth}
                skipHeight={labelSkipHeight}
                textColor={labelTextColor}
                component={labelComponent}
                transitionMode={labelsTransitionMode}
                getTestId={getLabelTestId}
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
