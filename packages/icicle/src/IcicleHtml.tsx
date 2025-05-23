import { Fragment, ReactNode, useCallback, forwardRef, Ref, ReactElement } from 'react'
import {
    Container,
    useDimensions,
    DefaultChartContext,
    ChartContext,
    WithChartRef,
} from '@nivo/core'
import { RectLabels } from '@nivo/rects'
import {
    IcicleCustomLayerProps,
    IcicleHtmlProps,
    IcicleHtmlPropsWithDefaults,
    IcicleLayerId,
    IcicleNode,
} from './types'
import { useIcicle, useIcicleNav, useMemoizeChartContext } from './hooks'
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
    labelOffsetX = htmlDefaultProps.labelOffsetX,
    labelOffsetY = htmlDefaultProps.labelOffsetY,
    labelRotation = htmlDefaultProps.labelRotation,
    labelSkipWidth = htmlDefaultProps.labelSkipWidth,
    labelSkipHeight = htmlDefaultProps.labelSkipHeight,
    labelTextColor = htmlDefaultProps.labelTextColor as IcicleHtmlPropsWithDefaults<Datum>['labelTextColor'],
    labelComponent = htmlDefaultProps.labelComponent as IcicleHtmlPropsWithDefaults<Datum>['labelComponent'],
    isInteractive = htmlDefaultProps.isInteractive,
    enableZooming = htmlDefaultProps.enableZooming,
    zoomMode = htmlDefaultProps.zoomMode,
    tooltip = htmlDefaultProps.tooltip as IcicleHtmlPropsWithDefaults<Datum>['tooltip'],
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    onDoubleClick,
    onFocus,
    onBlur,
    onKeyDown,
    onWheel,
    onContextMenu,
    animateOnMount = htmlDefaultProps.animateOnMount,
    rectsTransitionMode = htmlDefaultProps.rectsTransitionMode,
    labelsTransitionMode = htmlDefaultProps.labelsTransitionMode,
    role = htmlDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    isFocusable = htmlDefaultProps.isFocusable,
    nodeRole = htmlDefaultProps.nodeRole as string,
    nodeAriaLabel,
    nodeAriaLabelledBy,
    nodeAriaDescribedBy,
    nodeAriaHidden,
    context = htmlDefaultProps.context as IcicleHtmlPropsWithDefaults<Datum, Context>['context'],
    forwardedRef,
}: IcicleHtmlProps<Datum, Context> & {
    forwardedRef: Ref<HTMLDivElement>
}) => {
    const { margin, outerHeight, outerWidth, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, nodeByPath, zoom } = useIcicle<Datum>({
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
        isFocusable,
        withA11y: true,
        nodeRole,
        nodeAriaLabel,
        nodeAriaLabelledBy,
        nodeAriaDescribedBy,
        nodeAriaHidden,
    })

    const layerById: Record<IcicleLayerId, ReactNode> = {
        rects: null,
        labels: null,
    }

    const { nodeRefs, nav } = useIcicleNav<Datum>(nodes, nodeByPath, orientation)

    if (layers.includes('rects')) {
        layerById.rects = (
            <IcicleNodes<Datum>
                nodeRefs={nodeRefs}
                key="rects"
                nodes={nodes}
                component={nodeComponent}
                borderRadius={borderRadius}
                borderWidth={borderWidth}
                borderColor={borderColor}
                isInteractive={isInteractive}
                enableZooming={enableZooming}
                zoom={zoom}
                tooltip={tooltip}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                onWheel={onWheel}
                onContextMenu={onContextMenu}
                isFocusable={isFocusable}
                nav={nav}
                animateOnMount={animateOnMount}
                transitionMode={rectsTransitionMode}
            />
        )
    }

    const getLabelTestId = useCallback(
        (datum: Omit<IcicleNode<Datum>, 'rect'>) => `icicle.label.${datum.hierarchy.path}`,
        []
    )

    if (enableLabels && layers.includes('labels')) {
        layerById.labels = (
            <RectLabels<IcicleNode<Datum>>
                key="labels"
                nodes={nodes}
                uid="hierarchy.path"
                label={label}
                boxAnchor={labelBoxAnchor}
                align={labelAlign}
                baseline={labelBaseline}
                paddingX={labelPaddingX}
                paddingY={labelPaddingY}
                offsetX={labelOffsetX}
                offsetY={labelOffsetY}
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

    const customLayerProps: IcicleCustomLayerProps<Datum> = {
        nodes,
        zoom,
    }

    const memoizedContext = useMemoizeChartContext({ orientation, zoom }, context)

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
            tabIndex={isFocusable ? 0 : undefined}
            ref={forwardedRef}
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

export const IcicleHtml = forwardRef(
    <Datum, Context = DefaultChartContext>(
        {
            isInteractive = htmlDefaultProps.isInteractive,
            animate = htmlDefaultProps.animate,
            motionConfig = htmlDefaultProps.motionConfig,
            theme,
            renderWrapper,
            ...props
        }: IcicleHtmlProps<Datum, Context>,
        ref: Ref<HTMLDivElement>
    ) => (
        <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
            <InnerIcicleHtml<Datum, Context>
                isInteractive={isInteractive}
                {...props}
                forwardedRef={ref}
            />
        </Container>
    )
) as <Datum, Context = DefaultChartContext>(
    props: WithChartRef<IcicleHtmlProps<Datum, Context>, HTMLDivElement>
) => ReactElement
