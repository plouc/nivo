import { createElement, Fragment, useCallback,  useState } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import {
    // @ts-ignore
    bindDefs,
    // @ts-ignore
    LegacyContainer,
    SvgWrapper,
    // @ts-ignore
    CartesianMarkers,
    defaultMargin,
    usePropertyAccessor,
} from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { BarAnnotations } from './BarAnnotations'
import { BarDatum, BarLayer, BarSvgProps, ComputedBarDatum, TooltipHandlers } from './types'
import { BoxLegendSvg } from '@nivo/legends'
import { generateGroupedBars, generateStackedBars, getLegendData } from './compute'
import { svgDefaultProps } from './props'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'

type SpringConfig = Required<{
    damping: BarSvgProps<BarDatum>['motionDamping']
    stiffness: BarSvgProps<BarDatum>['motionStiffness']
}>

const barWillEnterHorizontal = ({ style }: Record<string, any>) => ({
    x: style.x.val,
    y: style.y.val,
    width: 0,
    height: style.height.val,
})

const barWillEnterVertical = ({ style }: Record<string, any>) => ({
    x: style.x.val,
    y: style.y.val + style.height.val,
    width: style.width.val,
    height: 0,
})

const barWillLeaveHorizontal = (springConfig: SpringConfig) => ({
    style,
}: Record<string, any>) => ({
    x: style.x,
    y: style.y,
    width: spring(0, springConfig),
    height: style.height,
})

const barWillLeaveVertical = (springConfig: SpringConfig) => ({ style }: Record<string, any>) => ({
    x: style.x,
    y: spring(style.y.val + style.height.val, springConfig),
    width: style.width,
    height: spring(0, springConfig),
})

export const Bar = <RawDatum extends BarDatum>({
    data,
    indexBy = svgDefaultProps.indexBy,
    keys = svgDefaultProps.keys,

    groupMode = svgDefaultProps.groupMode,
    layout = svgDefaultProps.layout,
    reverse = svgDefaultProps.reverse,
    minValue = svgDefaultProps.minValue,
    maxValue = svgDefaultProps.maxValue,

    valueScale = svgDefaultProps.valueScale,
    indexScale = svgDefaultProps.indexScale,

    padding = svgDefaultProps.padding,
    innerPadding = svgDefaultProps.innerPadding,

    axisTop,
    axisRight,
    axisBottom = svgDefaultProps.axisBottom,
    axisLeft = svgDefaultProps.axisLeft,
    enableGridX = svgDefaultProps.enableGridX,
    enableGridY = svgDefaultProps.enableGridY,
    gridXValues,
    gridYValues,

    layers = svgDefaultProps.layers as BarLayer<RawDatum>[],
    barComponent = svgDefaultProps.barComponent,

    enableLabel = svgDefaultProps.enableLabel,
    label = svgDefaultProps.label,
    labelSkipWidth = svgDefaultProps.labelSkipWidth,
    labelSkipHeight = svgDefaultProps.labelSkipHeight,
    labelTextColor = svgDefaultProps.labelTextColor,

    markers,

    theme,
    colorBy = svgDefaultProps.colorBy,
    colors = svgDefaultProps.colors,
    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill,
    borderRadius = svgDefaultProps.borderRadius,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor,

    annotations = svgDefaultProps.annotations,

    legendLabel,
    tooltipLabel = svgDefaultProps.tooltipLabel,
    isInteractive = svgDefaultProps.isInteractive,
    tooltipFormat,
    tooltip = svgDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,

    legends = svgDefaultProps.legends,

    animate = svgDefaultProps.animate,
    motionStiffness = svgDefaultProps.motionStiffness,
    motionDamping = svgDefaultProps.motionDamping,

    renderWrapper,
    role = svgDefaultProps.role,

    ...props
}: BarSvgProps<RawDatum>) => {
    const [hiddenIds, setHiddenIds] = useState<string[]>([])
    const toggleSerie = useCallback(id => {
        setHiddenIds(state =>
            state.indexOf(id) > -1 ? state.filter(item => item !== id) : [...state, id]
        )
    }, [])

    const margin = { ...defaultMargin, ...props.margin }
    const outerHeight = props.height
    const outerWidth = props.width
    const height = props.height - margin.top - margin.bottom
    const width = props.width - margin.left - margin.right

    const getBorderColor = useInheritedColor<ComputedBarDatum<RawDatum>>(borderColor, theme)
    const getColor = useOrdinalColorScale(colors, colorBy)
    const getIndex = usePropertyAccessor(indexBy)
    const getLabel = usePropertyAccessor(label)
    const getLabelColor = useInheritedColor<ComputedBarDatum<RawDatum>>(labelTextColor, theme)
    const getTooltipLabel = usePropertyAccessor(tooltipLabel)

    const generateBars = groupMode === 'grouped' ? generateGroupedBars : generateStackedBars
    const result = generateBars({
        layout,
        reverse,
        data,
        getIndex,
        keys,
        minValue,
        maxValue,
        width,
        height,
        getColor,
        padding,
        innerPadding,
        valueScale,
        indexScale,
        hiddenIds,
    })

    const springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    const willEnter = layout === 'vertical' ? barWillEnterVertical : barWillEnterHorizontal
    const willLeave =
        layout === 'vertical'
            ? barWillLeaveVertical(springConfig)
            : barWillLeaveHorizontal(springConfig)

    const shouldRenderLabel = useCallback(
        ({ width, height }: { height: number; width: number }) => {
            if (!enableLabel) return false
            if (labelSkipWidth > 0 && width < labelSkipWidth) return false
            if (labelSkipHeight > 0 && height < labelSkipHeight) return false
            return true
        },
        [enableLabel, labelSkipHeight, labelSkipWidth]
    )

    const boundDefs = bindDefs(defs, result.bars, fill, {
        dataKey: 'data',
        targetKey: 'data.fill',
    })

    return (
        <LegacyContainer
            {...{ animate, isInteractive, motionStiffness, motionDamping, renderWrapper, theme }}
        >
            {({ showTooltip, hideTooltip }: TooltipHandlers) => {
                const commonProps = {
                    borderRadius,
                    borderWidth,
                    enableLabel,
                    labelSkipWidth,
                    labelSkipHeight,
                    showTooltip,
                    hideTooltip,
                    onClick,
                    onMouseEnter,
                    onMouseLeave,
                    getTooltipLabel,
                    tooltipFormat,
                    tooltip,
                }

                let bars
                if (animate === true) {
                    bars = (
                        <TransitionMotion
                            key="bars"
                            willEnter={willEnter}
                            willLeave={willLeave}
                            styles={result.bars
                                .filter(bar => bar.data.value !== null)
                                .map(bar => ({
                                    key: bar.key,
                                    data: bar,
                                    style: {
                                        x: spring(bar.x, springConfig),
                                        y: spring(bar.y, springConfig),
                                        width: spring(bar.width, springConfig),
                                        height: spring(bar.height, springConfig),
                                    },
                                }))}
                        >
                            {interpolatedStyles => (
                                <g>
                                    {interpolatedStyles.map(({ key, style, data: bar }) => {
                                        const baseProps = { ...bar, ...style }

                                        return createElement(barComponent, {
                                            key,
                                            ...baseProps,
                                            ...commonProps,
                                            shouldRenderLabel: shouldRenderLabel(baseProps),
                                            width: Math.max(style.width, 0),
                                            height: Math.max(style.height, 0),
                                            label: getLabel(bar.data),
                                            // @ts-ignore fix theme
                                            labelColor: getLabelColor(baseProps, theme),
                                            borderColor: getBorderColor(baseProps),
                                        })
                                    })}
                                </g>
                            )}
                        </TransitionMotion>
                    )
                } else {
                    bars = result.bars
                        .filter(bar => bar.data.value !== null)
                        .map(d =>
                            createElement(barComponent, {
                                ...d,
                                ...commonProps,
                                label: getLabel(d.data),
                                shouldRenderLabel: shouldRenderLabel(d),
                                // @ts-ignore fix theme
                                labelColor: getLabelColor(d, theme),
                                borderColor: getBorderColor(d),
                            })
                        )
                }

                const layerById = {
                    grid: (
                        <Grid
                            key="grid"
                            width={width}
                            height={height}
                            xScale={enableGridX ? (result.xScale as any) : null}
                            yScale={enableGridY ? (result.yScale as any) : null}
                            xValues={gridXValues}
                            yValues={gridYValues}
                        />
                    ),
                    axes: (
                        <Axes
                            key="axes"
                            xScale={result.xScale as any}
                            yScale={result.yScale as any}
                            width={width}
                            height={height}
                            top={axisTop}
                            right={axisRight}
                            bottom={axisBottom}
                            left={axisLeft}
                        />
                    ),
                    bars,
                    markers: (
                        <CartesianMarkers
                            key="markers"
                            markers={markers}
                            width={width}
                            height={height}
                            xScale={result.xScale}
                            yScale={result.yScale}
                            theme={theme}
                        />
                    ),
                    legends: legends.map((legend, i) => {
                        const legendData = getLegendData({
                            from: legend.dataFrom,
                            bars: result.legendData,
                            layout,
                            direction: legend.direction,
                            // @ts-ignore
                            legendLabel,
                            groupMode,
                            reverse,
                        })

                        if (legendData === undefined) return null

                        return (
                            <BoxLegendSvg
                                key={i}
                                {...legend}
                                containerWidth={width}
                                containerHeight={height}
                                data={legendData}
                                toggleSerie={legend.toggleSerie ? toggleSerie : undefined}
                            />
                        )
                    }),
                    annotations: (
                        <BarAnnotations
                            key="annotations"
                            bars={result.bars}
                            annotations={annotations}
                        />
                    ),
                }

                return (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={margin}
                        defs={boundDefs}
                        role={role}
                    >
                        {layers.map((layer, i) => {
                            if (typeof layer === 'function') {
                                return (
                                    <Fragment key={i}>
                                        {layer({ ...commonProps, ...result } as any)}
                                    </Fragment>
                                )
                            }
                            return layerById[layer]
                        })}
                    </SvgWrapper>
                )
            }}
        </LegacyContainer>
    )
}
