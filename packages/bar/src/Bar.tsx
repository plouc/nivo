import { Axes, Grid } from '@nivo/axes'
import { BarAnnotations } from './BarAnnotations'
import {
    BarDatum,
    BarLayer,
    BarLayerId,
    BarSvgProps,
    ComputedBarDatumWithValue,
    LegendData,
} from './types'
import { BarLegends } from './BarLegends'
import {
    // @ts-ignore
    CartesianMarkers,
    Container,
    SvgWrapper,
    // @ts-ignore
    bindDefs,
    useDimensions,
    useMotionConfig,
    usePropertyAccessor,
    useTheme,
    useValueFormatter,
} from '@nivo/core'
import { Fragment, ReactNode, createElement, useCallback, useMemo, useState } from 'react'
import { generateGroupedBars, generateStackedBars, getLegendData } from './compute'
import { svgDefaultProps } from './props'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { useTransition } from '@react-spring/web'

type InnerBarProps<RawDatum extends BarDatum> = Omit<
    BarSvgProps<RawDatum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

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

    legendLabel,
    tooltipLabel = svgDefaultProps.tooltipLabel,

    valueFormat,

    isInteractive = svgDefaultProps.isInteractive,
    tooltip = svgDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,

    legends = svgDefaultProps.legends,

    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    isFocusable = svgDefaultProps.isFocusable,
    barAriaLabel,
    barAriaLabelledBy,
    barAriaDescribedBy,

    initialHiddenIds,
}: InnerBarProps<RawDatum>) => {
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

    const formatValue = useValueFormatter(valueFormat)
    const getBorderColor = useInheritedColor<ComputedBarDatumWithValue<RawDatum>>(
        borderColor,
        theme
    )
    const getColor = useOrdinalColorScale(colors, colorBy)
    const getIndex = usePropertyAccessor(indexBy)
    const getLabel = usePropertyAccessor(label)
    const getLabelColor = useInheritedColor<ComputedBarDatumWithValue<RawDatum>>(
        labelTextColor,
        theme
    )
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
        formatValue,
        getTooltipLabel,
    })

    const legendData = useMemo(
        () =>
            keys.map(key => {
                const bar = result.bars.find(bar => bar.data.id === key)

                return { ...bar, data: { id: key, ...bar?.data, hidden: hiddenIds.includes(key) } }
            }),
        [hiddenIds, keys, result.bars]
    )

    const barsWithValue = useMemo(
        () =>
            result.bars.filter(
                (bar): bar is ComputedBarDatumWithValue<RawDatum> => bar.data.value !== null
            ),
        [result.bars]
    )

    const transition = useTransition<
        ComputedBarDatumWithValue<RawDatum>,
        {
            borderColor: string
            color: string
            height: number
            labelColor: string
            labelOpacity: number
            labelX: number
            labelY: number
            opacity: number
            transform: string
            width: number
        }
    >(barsWithValue, {
        keys: bar => bar.key,
        from: bar => ({
            borderColor: getBorderColor(bar) as string,
            color: bar.color,
            height: 0,
            labelColor: getLabelColor(bar) as string,
            labelOpacity: 0,
            labelX: bar.width / 2,
            labelY: bar.height / 2,
            transform: `translate(${bar.x}, ${bar.y + bar.height})`,
            width: bar.width,
            ...(layout === 'vertical'
                ? {}
                : {
                      height: bar.height,
                      transform: `translate(${bar.x}, ${bar.y})`,
                      width: 0,
                  }),
        }),
        enter: bar => ({
            borderColor: getBorderColor(bar) as string,
            color: bar.color,
            height: bar.height,
            labelColor: getLabelColor(bar) as string,
            labelOpacity: 1,
            labelX: bar.width / 2,
            labelY: bar.height / 2,
            transform: `translate(${bar.x}, ${bar.y})`,
            width: bar.width,
        }),
        update: bar => ({
            borderColor: getBorderColor(bar) as string,
            color: bar.color,
            height: bar.height,
            labelColor: getLabelColor(bar) as string,
            labelOpacity: 1,
            labelX: bar.width / 2,
            labelY: bar.height / 2,
            transform: `translate(${bar.x}, ${bar.y})`,
            width: bar.width,
        }),
        leave: bar => ({
            borderColor: getBorderColor(bar) as string,
            color: bar.color,
            height: 0,
            labelColor: getLabelColor(bar) as string,
            labelOpacity: 0,
            labelX: bar.width / 2,
            labelY: 0,
            transform: `translate(${bar.x}, ${bar.y + bar.height})`,
            width: bar.width,
            ...(layout === 'vertical'
                ? {}
                : {
                      labelX: 0,
                      labelY: bar.height / 2,
                      height: bar.height,
                      transform: `translate(${bar.x}, ${bar.y})`,
                      width: 0,
                  }),
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

    const commonProps = useMemo(
        () => ({
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
            tooltip,
            isFocusable,
            ariaLabel: barAriaLabel,
            ariaLabelledBy: barAriaLabelledBy,
            ariaDescribedBy: barAriaDescribedBy,
        }),
        [
            borderRadius,
            borderWidth,
            enableLabel,
            getTooltipLabel,
            isInteractive,
            labelSkipHeight,
            labelSkipWidth,
            onClick,
            onMouseEnter,
            onMouseLeave,
            tooltip,
            isFocusable,
            barAriaLabel,
            barAriaLabelledBy,
            barAriaDescribedBy,
        ]
    )

    const boundDefs = bindDefs(defs, result.bars, fill, {
        dataKey: 'data',
        targetKey: 'data.fill',
    })

    const layerById: Record<BarLayerId, ReactNode> = {
        annotations: null,
        axes: null,
        bars: null,
        grid: null,
        legends: null,
        markers: null,
    }

    if (layers.includes('annotations')) {
        layerById.annotations = (
            <BarAnnotations key="annotations" bars={result.bars} annotations={annotations} />
        )
    }

    if (layers.includes('axes')) {
        layerById.axes = (
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
        )
    }

    if (layers.includes('bars')) {
        layerById.bars = (
            <Fragment key="bars">
                {transition((style, bar) =>
                    createElement(barComponent, {
                        ...commonProps,
                        bar,
                        style,
                        shouldRenderLabel: shouldRenderLabel(bar),
                        label: getLabel(bar.data),
                    })
                )}
            </Fragment>
        )
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? (result.xScale as any) : null}
                yScale={enableGridY ? (result.yScale as any) : null}
                xValues={gridXValues}
                yValues={gridYValues}
            />
        )
    }

    if (layers.includes('legends')) {
        const data = ([] as LegendData[]).concat(
            ...legends.map(legend =>
                getLegendData({
                    bars: legend.dataFrom === 'keys' ? legendData : result.bars,
                    direction: legend.direction,
                    from: legend.dataFrom,
                    groupMode,
                    layout,
                    legendLabel,
                    reverse,
                })
            )
        )

        layerById.legends = (
            <BarLegends
                key="legends"
                width={innerWidth}
                height={innerHeight}
                data={data}
                legends={legends}
                toggleSerie={toggleSerie}
            />
        )
    }

    if (layers.includes('markers')) {
        layerById.markers = (
            <CartesianMarkers
                key="markers"
                markers={markers}
                width={innerWidth}
                height={innerHeight}
                xScale={result.xScale}
                yScale={result.yScale}
                theme={theme}
            />
        )
    }

    // We use `any` here until we can figure out the best way to type xScale/yScale
    const layerContext: any = useMemo(
        () => ({
            ...commonProps,
            margin,
            innerWidth,
            innerHeight,
            width,
            height,
            ...result,
        }),
        [commonProps, height, innerHeight, innerWidth, margin, result, width]
    )

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            defs={boundDefs}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
            isFocusable={isFocusable}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return layerById?.[layer] ?? null
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
