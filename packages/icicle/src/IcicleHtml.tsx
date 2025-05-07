import { Fragment, ReactNode, useCallback } from 'react'
import { Container, useDimensions, DefaultChartContext, ChartContext } from '@nivo/core'
import { RectLabels } from '@nivo/rects'
import { IcicleHtmlProps, IcicleHtmlPropsWithDefaults, IcicleLayerId, ComputedDatum } from './types'
import { useIcicle, useIcicleCustomLayerProps, useMemoizeChartContext } from './hooks'
import { htmlDefaultProps } from './defaults'
import { IcicleNodes } from './IcicleNodes'

const InnerIcicleHtml = <Datum, Context>({
    data,
    sort = htmlDefaultProps.sort as IcicleHtmlPropsWithDefaults<Datum>['sort'],
    identity = htmlDefaultProps.identity as IcicleHtmlPropsWithDefaults<Datum>['identity'],
    value = htmlDefaultProps.value as IcicleHtmlPropsWithDefaults<Datum>['value'],
    valueFormat,
    margin: partialMargin,
    width,
    height,
    orientation = htmlDefaultProps.orientation,
    gapX = htmlDefaultProps.gapX,
    gapY = htmlDefaultProps.gapY,
    layers = htmlDefaultProps.layers as readonly IcicleLayerId[],
    nodeComponent = htmlDefaultProps.nodeComponent as IcicleHtmlPropsWithDefaults<Datum>['nodeComponent'],
    colors = htmlDefaultProps.colors as IcicleHtmlPropsWithDefaults<Datum>['colors'],
    colorBy = htmlDefaultProps.colorBy,
    inheritColorFromParent = htmlDefaultProps.inheritColorFromParent,
    childColor = htmlDefaultProps.childColor as IcicleHtmlPropsWithDefaults<Datum>['childColor'],
    borderRadius = htmlDefaultProps.borderRadius,
    borderWidth = htmlDefaultProps.borderWidth,
    borderColor = htmlDefaultProps.borderColor as IcicleHtmlPropsWithDefaults<Datum>['borderColor'],
    enableLabels = htmlDefaultProps.enableLabels,
    label = htmlDefaultProps.label as IcicleHtmlPropsWithDefaults<Datum>['label'],
    labelBoxAnchor = htmlDefaultProps.labelBoxAnchor,
    labelAlign = htmlDefaultProps.labelAlign,
    labelBaseline = htmlDefaultProps.labelBaseline,
    labelPaddingX = htmlDefaultProps.labelPaddingX,
    labelPaddingY = htmlDefaultProps.labelPaddingY,
    labelRotation = htmlDefaultProps.labelRotation,
    labelSkipWidth = htmlDefaultProps.labelSkipWidth,
    labelSkipHeight = htmlDefaultProps.labelSkipHeight,
    labelTextColor = htmlDefaultProps.labelTextColor as IcicleHtmlPropsWithDefaults<Datum>['labelTextColor'],
    labelComponent = htmlDefaultProps.labelComponent as IcicleHtmlPropsWithDefaults<Datum>['labelComponent'],
    isInteractive = htmlDefaultProps.isInteractive,
    enableZooming = htmlDefaultProps.enableZooming,
    zoomMode = htmlDefaultProps.zoomMode,
    tooltip = htmlDefaultProps.tooltip as IcicleHtmlPropsWithDefaults<Datum>['tooltip'],
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onWheel,
    onContextMenu,
    animateOnMount = htmlDefaultProps.animateOnMount,
    rectsTransitionMode = htmlDefaultProps.rectsTransitionMode,
    labelsTransitionMode = htmlDefaultProps.labelsTransitionMode,
    role = htmlDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    context = htmlDefaultProps.context as IcicleHtmlPropsWithDefaults<Datum, Context>['context'],
}: IcicleHtmlProps<Datum, Context>) => {
    const { margin, outerHeight, outerWidth, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, zoom } = useIcicle<Datum>({
        data,
        sort,
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

    const layerById: Record<IcicleLayerId, ReactNode> = {
        rects: null,
        labels: null,
    }

    if (layers.includes('rects')) {
        layerById.rects = (
            <IcicleNodes<Datum>
                key="rects"
                data={nodes}
                component={nodeComponent}
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
                animateOnMount={animateOnMount}
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
            <RectLabels<ComputedDatum<Datum>>
                key="labels"
                data={nodes}
                uid="path"
                label={label}
                boxAnchor={labelBoxAnchor}
                align={labelAlign}
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

    const memoizedContext = useMemoizeChartContext(zoom, context)

    return (
        <div
            style={{
                position: 'relative',
                width: outerWidth,
                height: outerHeight,
                overflow: 'hidden',
            }}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
        >
            <ChartContext.Provider value={memoizedContext}>
                <div style={{ position: 'absolute', top: margin.top, left: margin.left }}>
                    {layers.map((layer, i) => {
                        if (typeof layer === 'function') {
                            return <Fragment key={i}>{layer(customLayerProps)}</Fragment>
                        }

                        return layerById[layer]
                    })}
                </div>
            </ChartContext.Provider>
        </div>
    )
}

export const IcicleHtml = <Datum, Context = DefaultChartContext>({
    isInteractive = htmlDefaultProps.isInteractive,
    animate = htmlDefaultProps.animate,
    motionConfig = htmlDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: IcicleHtmlProps<Datum, Context>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerIcicleHtml<Datum, Context> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
