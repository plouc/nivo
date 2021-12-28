import { createElement, useMemo, useCallback } from 'react'
import { area as d3Area, curveBasis, curveLinear } from 'd3-shape'
import { useTheme, usePropertyAccessor } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor, InheritedColorConfig } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { computeSeries } from './compute'
import {
    AreaBumpAreaPoint,
    AreaBumpCommonProps,
    AreaBumpComputedSerie,
    AreaBumpDataProps,
    AreaBumpDatum,
    AreaBumpInterpolation,
    AreaBumpLabel,
    AreaBumpLabelData,
} from './types'

const useAreaBumpSeries = <D extends AreaBumpDatum>({
    data,
    width,
    height,
    align,
    spacing,
    xPadding,
}: {
    data: AreaBumpDataProps<D>['data']
    width: number
    height: number
    align: AreaBumpCommonProps<D>['align']
    spacing: AreaBumpCommonProps<D>['spacing']
    xPadding: AreaBumpCommonProps<D>['xPadding']
}) =>
    useMemo(
        () => computeSeries<D>({ data, width, height, align, spacing, xPadding }),
        [data, width, height, align, spacing, xPadding]
    )

const useAreaGenerator = (interpolation: AreaBumpInterpolation) =>
    useMemo(
        () =>
            d3Area<AreaBumpAreaPoint>()
                .x(d => d.x)
                .y0(d => d.y0)
                .y1(d => d.y1)
                .curve(interpolation === 'smooth' ? curveBasis : curveLinear),
        [interpolation]
    )

const useSerieDerivedProp = <Target, Output extends string | number>(
    instruction: ((target: Target) => Output) | Output
): ((target: Target) => Output) =>
    useMemo(() => {
        if (typeof instruction === 'function') return instruction
        return () => instruction
    }, [instruction])

const useSerieStyle = <D extends AreaBumpDatum>({
    fillOpacity,
    activeFillOpacity,
    inactiveFillOpacity,
    borderWidth,
    activeBorderWidth,
    inactiveBorderWidth,
    borderColor,
    borderOpacity,
    activeBorderOpacity,
    inactiveBorderOpacity,
    isInteractive,
    current,
}: {
    fillOpacity: AreaBumpCommonProps<D>['fillOpacity']
    activeFillOpacity: AreaBumpCommonProps<D>['activeFillOpacity']
    inactiveFillOpacity: AreaBumpCommonProps<D>['inactiveFillOpacity']
    borderWidth: AreaBumpCommonProps<D>['borderWidth']
    activeBorderWidth: AreaBumpCommonProps<D>['activeBorderWidth']
    inactiveBorderWidth: AreaBumpCommonProps<D>['inactiveBorderWidth']
    borderColor: AreaBumpCommonProps<D>['borderColor']
    borderOpacity: AreaBumpCommonProps<D>['borderOpacity']
    activeBorderOpacity: AreaBumpCommonProps<D>['activeBorderOpacity']
    inactiveBorderOpacity: AreaBumpCommonProps<D>['inactiveBorderOpacity']
    isInteractive: AreaBumpCommonProps<D>['isInteractive']
    current: any
}) => {
    type Serie = Omit<AreaBumpComputedSerie<D>, 'style'>

    const getFillOpacity = useSerieDerivedProp<Serie, number>(fillOpacity)
    const getActiveFillOpacity = useSerieDerivedProp<Serie, number>(activeFillOpacity)
    const getInactiveFillOpacity = useSerieDerivedProp<Serie, number>(inactiveFillOpacity)

    const getBorderWidth = useSerieDerivedProp<Serie, number>(borderWidth)
    const getActiveBorderWidth = useSerieDerivedProp<Serie, number>(activeBorderWidth)
    const getInactiveBorderWidth = useSerieDerivedProp<Serie, number>(inactiveBorderWidth)

    const theme = useTheme()
    const getBorderColor = useInheritedColor(borderColor, theme)

    const getBorderOpacity = useSerieDerivedProp<Serie, number>(borderOpacity)
    const getActiveBorderOpacity = useSerieDerivedProp<Serie, number>(activeBorderOpacity)
    const getInactiveBorderOpacity = useSerieDerivedProp<Serie, number>(inactiveBorderOpacity)

    const getNormalStyle = useCallback(
        (serie: Serie) => ({
            fillOpacity: getFillOpacity(serie),
            borderWidth: getBorderWidth(serie),
            borderColor: getBorderColor(serie),
            borderOpacity: getBorderOpacity(serie),
        }),
        [getFillOpacity, getBorderWidth, getBorderColor, getBorderOpacity]
    )
    const getActiveStyle = useCallback(
        (serie: Serie) => ({
            fillOpacity: getActiveFillOpacity(serie),
            borderWidth: getActiveBorderWidth(serie),
            borderColor: getBorderColor(serie),
            borderOpacity: getActiveBorderOpacity(serie),
        }),
        [getActiveFillOpacity, getActiveBorderWidth, getBorderColor, getActiveBorderOpacity]
    )
    const getInactiveStyle = useCallback(
        (serie: Serie) => ({
            fillOpacity: getInactiveFillOpacity(serie),
            borderWidth: getInactiveBorderWidth(serie),
            borderColor: getBorderColor(serie),
            borderOpacity: getInactiveBorderOpacity(serie),
        }),
        [getInactiveFillOpacity, getInactiveBorderWidth, getBorderColor, getInactiveBorderOpacity]
    )

    return useCallback(
        (serie: Serie) => {
            if (!isInteractive || current === null) return getNormalStyle(serie)
            if (serie.id === current) return getActiveStyle(serie)
            return getInactiveStyle(serie)
        },
        [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, current]
    )
}

export const useAreaBump = <D extends AreaBumpDatum>({
    data,
    width,
    height,
    align,
    spacing,
    xPadding,
    interpolation,
    colors,
    fillOpacity,
    activeFillOpacity,
    inactiveFillOpacity,
    borderWidth,
    activeBorderWidth,
    inactiveBorderWidth,
    borderColor,
    borderOpacity,
    activeBorderOpacity,
    inactiveBorderOpacity,
    isInteractive,
    current,
}: {
    data: AreaBumpDataProps<D>['data']
    width: number
    height: number
    align: AreaBumpCommonProps<D>['align']
    spacing: AreaBumpCommonProps<D>['spacing']
    xPadding: AreaBumpCommonProps<D>['xPadding']
    interpolation: AreaBumpCommonProps<D>['interpolation']
    colors: AreaBumpCommonProps<D>['colors']
    fillOpacity: AreaBumpCommonProps<D>['fillOpacity']
    activeFillOpacity: AreaBumpCommonProps<D>['activeFillOpacity']
    inactiveFillOpacity: AreaBumpCommonProps<D>['inactiveFillOpacity']
    borderWidth: AreaBumpCommonProps<D>['borderWidth']
    activeBorderWidth: AreaBumpCommonProps<D>['activeBorderWidth']
    inactiveBorderWidth: AreaBumpCommonProps<D>['inactiveBorderWidth']
    borderColor: AreaBumpCommonProps<D>['borderColor']
    borderOpacity: AreaBumpCommonProps<D>['borderOpacity']
    activeBorderOpacity: AreaBumpCommonProps<D>['activeBorderOpacity']
    inactiveBorderOpacity: AreaBumpCommonProps<D>['inactiveBorderOpacity']
    isInteractive: AreaBumpCommonProps<D>['isInteractive']
    current: any
}) => {
    const {
        series: rawSeries,
        xScale,
        heightScale,
    } = useAreaBumpSeries<D>({
        data,
        width,
        height,
        align,
        spacing,
        xPadding,
    })

    const areaGenerator = useAreaGenerator(interpolation)

    const getColor = useOrdinalColorScale(colors, 'id')
    const getSerieStyle = useSerieStyle<D>({
        fillOpacity,
        activeFillOpacity,
        inactiveFillOpacity,
        borderWidth,
        activeBorderWidth,
        inactiveBorderWidth,
        borderColor,
        borderOpacity,
        activeBorderOpacity,
        inactiveBorderOpacity,
        isInteractive,
        current,
    })

    const series: AreaBumpComputedSerie<D>[] = useMemo(
        () =>
            rawSeries.map(serie => {
                const serieWithColor = {
                    ...serie,
                    color: getColor(serie),
                }

                return {
                    ...serieWithColor,
                    style: getSerieStyle(serieWithColor),
                }
            }),
        [rawSeries, getColor, getSerieStyle]
    )

    return {
        series,
        xScale,
        heightScale,
        areaGenerator,
    }
}

export const useAreaBumpSerieHandlers = <D extends AreaBumpDatum>({
    serie,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setCurrent,
    tooltip,
}: {
    serie: AreaBumpComputedSerie<D>
    isInteractive: AreaBumpCommonProps<D>['isInteractive']
    onMouseEnter?: AreaBumpCommonProps<D>['onMouseEnter']
    onMouseMove?: AreaBumpCommonProps<D>['onMouseMove']
    onMouseLeave?: AreaBumpCommonProps<D>['onMouseLeave']
    onClick?: AreaBumpCommonProps<D>['onClick']
    setCurrent: any
    tooltip: AreaBumpCommonProps<D>['tooltip']
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { serie }), event)
            setCurrent(serie.id)
            onMouseEnter && onMouseEnter(serie, event)
        },
        [serie, onMouseEnter, showTooltipFromEvent, setCurrent]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { serie }), event)
            onMouseMove && onMouseMove(serie, event)
        },
        [serie, onMouseMove, showTooltipFromEvent]
    )

    const handleMouseLeave = useCallback(
        event => {
            hideTooltip()
            setCurrent(null)
            onMouseLeave && onMouseLeave(serie, event)
        },
        [serie, onMouseLeave, hideTooltip, setCurrent]
    )

    const handleClick = useCallback(
        event => {
            onClick && onClick(serie, event)
        },
        [serie, onClick]
    )

    return useMemo(
        () => ({
            onMouseEnter: isInteractive ? handleMouseEnter : undefined,
            onMouseMove: isInteractive ? handleMouseMove : undefined,
            onMouseLeave: isInteractive ? handleMouseLeave : undefined,
            onClick: isInteractive ? handleClick : undefined,
        }),
        [isInteractive, handleMouseEnter, handleMouseMove, handleMouseLeave, handleClick]
    )
}

export const useAreaBumpSeriesLabels = <D extends AreaBumpDatum>({
    label,
    series,
    position,
    padding,
    color,
}: {
    label: Exclude<AreaBumpLabel<D>, false>
    series: AreaBumpComputedSerie<D>[]
    position: 'start' | 'end'
    padding: number
    color: InheritedColorConfig<AreaBumpComputedSerie<D>>
}): AreaBumpLabelData<D>[] => {
    const theme = useTheme()
    const getColor = useInheritedColor(color, theme)

    const getLabel = usePropertyAccessor(label)

    return useMemo(() => {
        let textAnchor: 'start' | 'end'
        let signedPadding: number
        if (position === 'start') {
            textAnchor = 'end'
            signedPadding = padding * -1
        } else {
            textAnchor = 'start'
            signedPadding = padding
        }

        return series.map(serie => {
            const point =
                position === 'start' ? serie.points[0] : serie.points[serie.points.length - 1]

            return {
                id: serie.id,
                label: getLabel(serie),
                x: point.x + signedPadding,
                y: point.y,
                color: getColor(serie),
                opacity: serie.style.fillOpacity,
                serie,
                textAnchor,
            }
        })
    }, [getLabel, series, position, padding, getColor])
}
