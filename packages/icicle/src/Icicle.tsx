import { Fragment, ReactNode, useCallback } from 'react'
import { RectLabels } from '@nivo/rects'
import {
    // @ts-expect-error no types
    bindDefs,
    Container,
    SvgWrapper,
    useDimensions,
    ChartContext,
    DefaultChartContext,
} from '@nivo/core'
import {
    IcicleSvgProps,
    IcicleSvgPropsWithDefaults,
    IcicleLayerId,
    IcicleNode,
    IcicleCustomLayerProps,
} from './types'
import { useIcicle, useMemoizeChartContext, useIcicleNav } from './hooks'
import { svgDefaultProps } from './defaults'
import { IcicleNodes } from './IcicleNodes'

const InnerIcicle = <Datum, Context>({
    data,
    sort = svgDefaultProps.sort as IcicleSvgPropsWithDefaults<Datum>['sort'],
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
    nodeComponent = svgDefaultProps.nodeComponent as IcicleSvgPropsWithDefaults<Datum>['nodeComponent'],
    colors = svgDefaultProps.colors as IcicleSvgPropsWithDefaults<Datum>['colors'],
    colorBy = svgDefaultProps.colorBy,
    inheritColorFromParent = svgDefaultProps.inheritColorFromParent,
    childColor = svgDefaultProps.childColor as IcicleSvgPropsWithDefaults<Datum>['childColor'],
    borderRadius = svgDefaultProps.borderRadius,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor as IcicleSvgPropsWithDefaults<Datum>['borderColor'],
    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill as IcicleSvgPropsWithDefaults<Datum>['fill'],
    enableLabels = svgDefaultProps.enableLabels,
    label = svgDefaultProps.label as IcicleSvgPropsWithDefaults<Datum>['label'],
    labelBoxAnchor = svgDefaultProps.labelBoxAnchor,
    labelAlign = svgDefaultProps.labelAlign,
    labelBaseline = svgDefaultProps.labelBaseline,
    labelPaddingX = svgDefaultProps.labelPaddingX,
    labelPaddingY = svgDefaultProps.labelPaddingY,
    labelRotation = svgDefaultProps.labelRotation,
    labelSkipWidth = svgDefaultProps.labelSkipWidth,
    labelSkipHeight = svgDefaultProps.labelSkipHeight,
    labelTextColor = svgDefaultProps.labelTextColor as IcicleSvgPropsWithDefaults<Datum>['labelTextColor'],
    labelComponent = svgDefaultProps.labelComponent as IcicleSvgPropsWithDefaults<Datum>['labelComponent'],
    isInteractive = svgDefaultProps.isInteractive,
    enableZooming = svgDefaultProps.enableZooming,
    zoomMode = svgDefaultProps.zoomMode,
    tooltip = svgDefaultProps.tooltip as IcicleSvgPropsWithDefaults<Datum>['tooltip'],
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onFocus,
    onBlur,
    onKeyDown,
    onWheel,
    onContextMenu,
    animateOnMount = svgDefaultProps.animateOnMount,
    rectsTransitionMode = svgDefaultProps.rectsTransitionMode,
    labelsTransitionMode = svgDefaultProps.labelsTransitionMode,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    isFocusable = svgDefaultProps.isFocusable,
    nodeRole = svgDefaultProps.nodeRole as string,
    nodeAriaLabel,
    nodeAriaLabelledBy,
    nodeAriaDescribedBy,
    nodeAriaHidden,
    nodeAriaDisabled,
    context = svgDefaultProps.context as IcicleSvgPropsWithDefaults<Datum, Context>['context'],
}: IcicleSvgProps<Datum, Context>) => {
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
        nodeAriaDisabled,
    })

    const boundDefs = bindDefs(defs, nodes, fill, {
        colorKey: 'color',
        targetKey: 'fill',
    })

    const layerById: Record<IcicleLayerId, ReactNode> = {
        rects: null,
        labels: null,
    }

    const { nodeRefs, nav } = useIcicleNav<Datum>(nodes, nodeByPath)

    if (layers.includes('rects')) {
        layerById.rects = (
            <IcicleNodes<Datum>
                key="rects"
                nodeRefs={nodeRefs}
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
        (datum: Omit<IcicleNode<Datum>, 'rect'>) => `icicle.label.${datum.path}`,
        []
    )

    if (enableLabels && layers.includes('labels')) {
        layerById.labels = (
            <RectLabels<IcicleNode<Datum>>
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

    const customLayerProps: IcicleCustomLayerProps<Datum> = {
        nodes,
        zoom,
    }

    const memoizedContext = useMemoizeChartContext({ orientation, zoom }, context)

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
            isFocusable={isFocusable}
        >
            <ChartContext.Provider value={memoizedContext}>
                {layers.map((layer, i) => {
                    if (typeof layer === 'function') {
                        return <Fragment key={i}>{layer(customLayerProps)}</Fragment>
                    }

                    return layerById[layer]
                })}
            </ChartContext.Provider>
        </SvgWrapper>
    )
}

export const Icicle = <Datum, Context = DefaultChartContext>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: IcicleSvgProps<Datum, Context>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerIcicle<Datum, Context> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
