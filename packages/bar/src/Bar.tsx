import { Axes, Grid } from '@nivo/axes'
import { BarAnnotations } from './BarAnnotations'
import {
    BarDatum,
    BarLayer,
    BarSvgProps,
    ComputedBarDatum,
    ComputedBarDatumWithValue,
} from './types'
import { BoxLegendSvg } from '@nivo/legends'
import {
    // @ts-ignore
    CartesianMarkers,
    Container,
    SvgWrapper,
    // @ts-ignore
    bindDefs,
    // defaultMargin,
    useDimensions,
    useMotionConfig,
    usePropertyAccessor,
    useTheme,
} from '@nivo/core'
import { Fragment, createElement, useCallback, useMemo, useState } from 'react'
import { generateGroupedBars, generateStackedBars, getLegendData } from './compute'
import { svgDefaultProps } from './props'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { useTransition } from '@react-spring/web'

const InnerBar = <RawDatum extends BarDatum>({
    data,
    indexBy = svgDefaultProps.indexBy,
    keys = svgDefaultProps.keys,

    margin: partialMargin,
    width,
    height,

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

    colorBy = svgDefaultProps.colorBy,
    colors = svgDefaultProps.colors,
    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill,
    borderRadius = svgDefaultProps.borderRadius,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor,

    annotations = svgDefaultProps.annotations,

    isInteractive = svgDefaultProps.isInteractive,
    tooltipLabel = svgDefaultProps.tooltipLabel,
    tooltipFormat,
    tooltip = svgDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,

    legends = svgDefaultProps.legends,

    role = svgDefaultProps.role,

    initialHiddenIds,
}: BarSvgProps<RawDatum>) => {
    const [hiddenIds, setHiddenIds] = useState(initialHiddenIds ?? [])
    const toggleSerie = useCallback(id => {
        setHiddenIds(state =>
            state.indexOf(id) > -1 ? state.filter(item => item !== id) : [...state, id]
        )
    }, [])

    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

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
        width: innerWidth,
        height: innerHeight,
        getColor,
        padding,
        innerPadding,
        valueScale,
        indexScale,
        hiddenIds,
    })

    const barsWithValue = useMemo(
        () =>
            result.bars.filter(
                (bar): bar is ComputedBarDatumWithValue<RawDatum> => bar.data.value !== null
            ),
        [result.bars]
    )

    const transition = useTransition(barsWithValue, {
        keys: bar => bar.key,
        enter: bar => ({
            x: bar.width / 2,
            y: bar.height / 2,
            width: bar.width,
            height: bar.height,
            color: bar.color,
            transform: `translate(${bar.x}, ${bar.y})`,
        }),
        update: bar => ({
            x: bar.width / 2,
            y: bar.height / 2,
            width: bar.width,
            height: bar.height,
            color: bar.color,
            transform: `translate(${bar.x}, ${bar.y})`,
        }),
        config: springConfig,
        immediate: !animate,
    })

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

    const commonProps = {
        borderRadius,
        borderWidth,
        enableLabel,
        isInteractive,
        labelSkipWidth,
        labelSkipHeight,
        onClick,
        onMouseEnter,
        onMouseLeave,
        getTooltipLabel,
        tooltipFormat,
        tooltip,
    }

    const layerById = {
        grid: (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
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
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        ),
        bars: (
            <>
                {transition((style, bar) =>
                    createElement(barComponent, {
                        ...bar,
                        ...commonProps,
                        style,
                        shouldRenderLabel: shouldRenderLabel(bar),
                        label: getLabel(bar.data),
                        labelColor: getLabelColor(bar),
                        borderColor: getBorderColor(bar),
                    })
                )}
            </>
        ),
        markers: (
            <CartesianMarkers
                key="markers"
                markers={markers}
                width={innerWidth}
                height={innerHeight}
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
                groupMode,
                reverse,
            })

            if (legendData === undefined) return null

            return (
                <BoxLegendSvg
                    key={i}
                    {...legend}
                    containerWidth={innerWidth}
                    containerHeight={innerHeight}
                    data={legendData}
                    toggleSerie={legend.toggleSerie ? toggleSerie : undefined}
                />
            )
        }),
        annotations: (
            <BarAnnotations key="annotations" bars={result.bars} annotations={annotations} />
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
                        <Fragment key={i}>{layer({ ...commonProps, ...result } as any)}</Fragment>
                    )
                }
                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

export const Bar = <RawDatum extends BarDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: BarSvgProps<RawDatum>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerBar<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
