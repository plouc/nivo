import { Fragment, ReactNode, createElement, useMemo, forwardRef, Ref, ReactElement } from 'react'
import {
    // @ts-expect-error no types
    bindDefs,
    Container,
    SvgWrapper,
    useDimensions,
    WithChartRef,
} from '@nivo/core'
import { ArcLabelsLayer } from '@nivo/arcs'
import { defaultProps } from './props'
import { useSunburst, useSunburstLayerContext } from './hooks'
import { SunburstSvgProps, SunburstLayerId, SunburstLayer, ComputedDatum } from './types'
import { Arcs } from './Arcs'
import { InheritedColorConfig } from '@nivo/colors'

type InnerSunburstProps<RawDatum> = Partial<
    Omit<
        SunburstSvgProps<RawDatum>,
        'data' | 'width' | 'height' | 'isInteractive' | 'animate' | 'motionConfig'
    >
> &
    Pick<SunburstSvgProps<RawDatum>, 'data' | 'width' | 'height' | 'isInteractive'> & {
        forwardedRef: Ref<SVGSVGElement>
    }

const InnerSunburst = <RawDatum,>({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    cornerRadius = defaultProps.cornerRadius,
    layers = defaultProps.layers as SunburstLayer<RawDatum>[],
    colors = defaultProps.colors,
    colorBy = defaultProps.colorBy,
    inheritColorFromParent = defaultProps.inheritColorFromParent,
    childColor = defaultProps.childColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor,
    margin: partialMargin,
    width,
    height,
    enableArcLabels = defaultProps.enableArcLabels,
    arcLabel = defaultProps.arcLabel,
    arcLabelsRadiusOffset = defaultProps.arcLabelsRadiusOffset,
    arcLabelsSkipAngle = defaultProps.arcLabelsSkipAngle,
    arcLabelsSkipRadius = defaultProps.arcLabelsSkipRadius,
    arcLabelsTextColor = defaultProps.arcLabelsTextColor,
    arcLabelsComponent,
    defs = defaultProps.defs,
    fill = defaultProps.fill,
    transitionMode = defaultProps.transitionMode,
    isInteractive = defaultProps.isInteractive,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    tooltip = defaultProps.tooltip,
    role = defaultProps.role,
    forwardedRef,
}: InnerSunburstProps<RawDatum>) => {
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
        data,
        id,
        value,
        valueFormat,
        radius,
        cornerRadius,
        colors,
        colorBy,
        inheritColorFromParent,
        childColor,
    })

    const boundDefs = bindDefs(defs, nodes, fill, {
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
                skipRadius={arcLabelsSkipRadius}
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
            ref={forwardedRef}
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

export const Sunburst = forwardRef(
    <RawDatum,>(
        {
            isInteractive = defaultProps.isInteractive,
            animate = defaultProps.animate,
            motionConfig = defaultProps.motionConfig,
            theme,
            renderWrapper,
            ...props
        }: Partial<Omit<SunburstSvgProps<RawDatum>, 'data' | 'width' | 'height'>> &
            Pick<SunburstSvgProps<RawDatum>, 'data' | 'width' | 'height'>,
        ref: Ref<SVGSVGElement>
    ) => (
        <Container
            isInteractive={isInteractive}
            animate={animate}
            motionConfig={motionConfig}
            theme={theme}
            renderWrapper={renderWrapper}
        >
            <InnerSunburst<RawDatum> {...props} isInteractive={isInteractive} forwardedRef={ref} />
        </Container>
    )
) as <RawDatum>(
    props: WithChartRef<
        Partial<Omit<SunburstSvgProps<RawDatum>, 'data' | 'width' | 'height'>> &
            Pick<SunburstSvgProps<RawDatum>, 'data' | 'width' | 'height'>,
        SVGSVGElement
    >
) => ReactElement
