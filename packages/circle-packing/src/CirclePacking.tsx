import { createElement, Fragment, ReactNode, useMemo } from 'react'
import {
    // @ts-ignore
    bindDefs,
    useDimensions,
    Container,
    SvgWrapper,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { CirclePackingLayerId, CirclePackingSvgProps, ComputedDatum } from './types'
import { useCirclePacking, useCirclePackingZoom, useCirclePackingLayerContext } from './hooks'
import { defaultProps } from './props'
import { Circles } from './Circles'
import { CircleSvg } from './CircleSvg'
import { Labels } from './Labels'
import { LabelSvg } from './LabelSvg'

type InnerCirclePackingProps<RawDatum> = Partial<
    Omit<
        CirclePackingSvgProps<RawDatum>,
        'data' | 'width' | 'height' | 'isInteractive' | 'animate' | 'motionConfig'
    >
> &
    Pick<CirclePackingSvgProps<RawDatum>, 'data' | 'width' | 'height' | 'isInteractive'>

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
    inheritColorFromParent = defaultProps.inheritColorFromParent,
    childColor = defaultProps.childColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    circleComponent = CircleSvg,
    defs = defaultProps.defs,
    fill = defaultProps.fill,
    enableLabels = defaultProps.enableLabels,
    label = defaultProps.label,
    labelsFilter,
    labelsSkipRadius = defaultProps.labelsSkipRadius,
    labelTextColor = defaultProps.labelTextColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    labelComponent = LabelSvg,
    layers = defaultProps.layers,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = defaultProps.tooltip,
    zoomedId,
    role = defaultProps.role,
}: InnerCirclePackingProps<RawDatum>) => {
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
        inheritColorFromParent,
        childColor,
    })

    const zoomedNodes = useCirclePackingZoom<RawDatum>(nodes, zoomedId, innerWidth, innerHeight)

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
            <Circles<RawDatum>
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
            <Labels<RawDatum>
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

    const layerContext = useCirclePackingLayerContext<RawDatum>({
        nodes,
    })

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            defs={boundDefs}
            role={role}
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

export const CirclePacking = <RawDatum,>({
    theme,
    isInteractive = defaultProps.isInteractive,
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    renderWrapper,
    ...otherProps
}: Partial<Omit<CirclePackingSvgProps<RawDatum>, 'data' | 'width' | 'height'>> &
    Pick<CirclePackingSvgProps<RawDatum>, 'data' | 'width' | 'height'>) => (
    <Container
        isInteractive={isInteractive}
        animate={animate}
        motionConfig={motionConfig}
        renderWrapper={renderWrapper}
        theme={theme}
    >
        <InnerCirclePacking<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
