import { createElement, forwardRef, Fragment, ReactElement, ReactNode, Ref, useMemo } from 'react'
import {
    // @ts-expect-error no types
    bindDefs,
    useDimensions,
    Container,
    SvgWrapper,
    WithChartRef,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { CirclePackingLayerId, CirclePackingSvgProps, ComputedDatum } from './types'
import { useCirclePacking, useCirclePackingZoom, useCirclePackingLayerContext } from './hooks'
import { svgDefaultProps } from './defaults'
import { Circles } from './Circles'
import { Labels } from './Labels'

type InnerCirclePackingProps<Datum> = Omit<
    CirclePackingSvgProps<Datum>,
    'animate' | 'motionConfig'
> & {
    forwardedRef: Ref<SVGSVGElement>
}

const InnerCirclePacking = <Datum,>({
    data,
    id = svgDefaultProps.id,
    value = svgDefaultProps.value,
    valueFormat,
    width,
    height,
    margin: partialMargin,
    padding = svgDefaultProps.padding,
    leavesOnly = svgDefaultProps.leavesOnly,
    colors = svgDefaultProps.colors as OrdinalColorScaleConfig<
        Omit<ComputedDatum<Datum>, 'color' | 'fill'>
    >,
    colorBy = svgDefaultProps.colorBy,
    inheritColorFromParent = svgDefaultProps.inheritColorFromParent,
    childColor = svgDefaultProps.childColor as InheritedColorConfig<ComputedDatum<Datum>>,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor as InheritedColorConfig<ComputedDatum<Datum>>,
    circleComponent = svgDefaultProps.circleComponent,
    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill,
    enableLabels = svgDefaultProps.enableLabels,
    label = svgDefaultProps.label,
    labelsFilter,
    labelsSkipRadius = svgDefaultProps.labelsSkipRadius,
    labelTextColor = svgDefaultProps.labelTextColor as InheritedColorConfig<ComputedDatum<Datum>>,
    labelComponent = svgDefaultProps.labelComponent,
    layers = svgDefaultProps.layers,
    isInteractive = svgDefaultProps.isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = svgDefaultProps.tooltip,
    zoomedId,
    role = svgDefaultProps.role,
    forwardedRef,
}: InnerCirclePackingProps<Datum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const nodes = useCirclePacking<Datum>({
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
        inheritColorFromParent,
        childColor,
    })

    const zoomedNodes = useCirclePackingZoom<Datum>(nodes, zoomedId, innerWidth, innerHeight)

    const boundDefs = useMemo(
        () => bindDefs(defs, zoomedNodes, fill, { targetKey: 'fill' }),
        [defs, zoomedNodes, fill]
    )

    const layerById: Record<CirclePackingLayerId, ReactNode> = {
        circles: null,
        labels: null,
    }

    if (layers.includes('circles')) {
        layerById.circles = (
            <Circles<Datum>
                key="circles"
                nodes={zoomedNodes}
                borderWidth={borderWidth}
                borderColor={borderColor}
                isInteractive={isInteractive}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                component={circleComponent}
                tooltip={tooltip}
            />
        )
    }

    if (enableLabels && layers.includes('labels')) {
        layerById.labels = (
            <Labels<Datum>
                key="labels"
                nodes={zoomedNodes}
                label={label}
                filter={labelsFilter}
                skipRadius={labelsSkipRadius}
                textColor={labelTextColor}
                component={labelComponent}
            />
        )
    }

    const layerContext = useCirclePackingLayerContext<Datum>({
        nodes,
    })

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            defs={boundDefs}
            role={role}
            ref={forwardedRef}
        >
            {layers.map((layer, i) => {
                if (layerById[layer as CirclePackingLayerId] !== undefined) {
                    return layerById[layer as CirclePackingLayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

export const CirclePacking = forwardRef(
    <Datum,>(
        {
            isInteractive = svgDefaultProps.isInteractive,
            animate = svgDefaultProps.animate,
            motionConfig = svgDefaultProps.motionConfig,
            theme,
            renderWrapper,
            ...props
        }: CirclePackingSvgProps<Datum>,
        ref: Ref<SVGSVGElement>
    ) => (
        <Container
            animate={animate}
            isInteractive={isInteractive}
            motionConfig={motionConfig}
            renderWrapper={renderWrapper}
            theme={theme}
        >
            <InnerCirclePacking<Datum>
                isInteractive={isInteractive}
                {...props}
                forwardedRef={ref}
            />
        </Container>
    )
) as <Datum>(props: WithChartRef<CirclePackingSvgProps<Datum>, SVGSVGElement>) => ReactElement
