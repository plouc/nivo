import { createElement, useMemo, useCallback, useState } from 'react'
import { area as d3Area, curveBasis, curveLinear } from 'd3-shape'
import { useTheme } from '@nivo/core'
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
    AreaBumpSerieExtraProps,
    DefaultAreaBumpDatum,
} from './types'

const useAreaBumpSeries = <
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
>({
    data,
    width,
    height,
    align,
    spacing,
    xPadding,
}: {
    data: AreaBumpDataProps<Datum, ExtraProps>['data']
    width: number
    height: number
    align: AreaBumpCommonProps<Datum, ExtraProps>['align']
    spacing: AreaBumpCommonProps<Datum, ExtraProps>['spacing']
    xPadding: AreaBumpCommonProps<Datum, ExtraProps>['xPadding']
}) =>
    useMemo(
        () => computeSeries<Datum, ExtraProps>({ data, width, height, align, spacing, xPadding }),
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

const useSerieStyle = <Datum extends AreaBumpDatum, ExtraProps extends AreaBumpSerieExtraProps>({
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
    activeSerieIds,
}: {
    fillOpacity: AreaBumpCommonProps<Datum, ExtraProps>['fillOpacity']
    activeFillOpacity: AreaBumpCommonProps<Datum, ExtraProps>['activeFillOpacity']
    inactiveFillOpacity: AreaBumpCommonProps<Datum, ExtraProps>['inactiveFillOpacity']
    borderWidth: AreaBumpCommonProps<Datum, ExtraProps>['borderWidth']
    activeBorderWidth: AreaBumpCommonProps<Datum, ExtraProps>['activeBorderWidth']
    inactiveBorderWidth: AreaBumpCommonProps<Datum, ExtraProps>['inactiveBorderWidth']
    borderColor: AreaBumpCommonProps<Datum, ExtraProps>['borderColor']
    borderOpacity: AreaBumpCommonProps<Datum, ExtraProps>['borderOpacity']
    activeBorderOpacity: AreaBumpCommonProps<Datum, ExtraProps>['activeBorderOpacity']
    inactiveBorderOpacity: AreaBumpCommonProps<Datum, ExtraProps>['inactiveBorderOpacity']
    isInteractive: AreaBumpCommonProps<Datum, ExtraProps>['isInteractive']
    activeSerieIds: string[]
}) => {
    type Serie = Omit<
        AreaBumpComputedSerie<Datum, ExtraProps>,
        'fillOpacity' | 'borderWidth' | 'borderColor' | 'borderOpacity'
    >

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
            if (!isInteractive || activeSerieIds.length === 0) return getNormalStyle(serie)
            if (activeSerieIds.includes(serie.id)) return getActiveStyle(serie)
            return getInactiveStyle(serie)
        },
        [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, activeSerieIds]
    )
}

export const useAreaBump = <
    Datum extends AreaBumpDatum = DefaultAreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps = Record<string, unknown>
>({
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
    defaultActiveSerieIds,
}: {
    data: AreaBumpDataProps<Datum, ExtraProps>['data']
    width: number
    height: number
    align: AreaBumpCommonProps<Datum, ExtraProps>['align']
    spacing: AreaBumpCommonProps<Datum, ExtraProps>['spacing']
    xPadding: AreaBumpCommonProps<Datum, ExtraProps>['xPadding']
    interpolation: AreaBumpCommonProps<Datum, ExtraProps>['interpolation']
    colors: AreaBumpCommonProps<Datum, ExtraProps>['colors']
    fillOpacity: AreaBumpCommonProps<Datum, ExtraProps>['fillOpacity']
    activeFillOpacity: AreaBumpCommonProps<Datum, ExtraProps>['activeFillOpacity']
    inactiveFillOpacity: AreaBumpCommonProps<Datum, ExtraProps>['inactiveFillOpacity']
    borderWidth: AreaBumpCommonProps<Datum, ExtraProps>['borderWidth']
    activeBorderWidth: AreaBumpCommonProps<Datum, ExtraProps>['activeBorderWidth']
    inactiveBorderWidth: AreaBumpCommonProps<Datum, ExtraProps>['inactiveBorderWidth']
    borderColor: AreaBumpCommonProps<Datum, ExtraProps>['borderColor']
    borderOpacity: AreaBumpCommonProps<Datum, ExtraProps>['borderOpacity']
    activeBorderOpacity: AreaBumpCommonProps<Datum, ExtraProps>['activeBorderOpacity']
    inactiveBorderOpacity: AreaBumpCommonProps<Datum, ExtraProps>['inactiveBorderOpacity']
    isInteractive: AreaBumpCommonProps<Datum, ExtraProps>['isInteractive']
    defaultActiveSerieIds: string[]
}) => {
    const [activeSerieIds, setActiveSerieIds] = useState<string[]>(defaultActiveSerieIds)

    const {
        series: rawSeries,
        xScale,
        heightScale,
    } = useAreaBumpSeries<Datum, ExtraProps>({
        data,
        width,
        height,
        align,
        spacing,
        xPadding,
    })

    const areaGenerator = useAreaGenerator(interpolation)

    const getColor = useOrdinalColorScale(colors, 'id')
    const getSerieStyle = useSerieStyle<Datum, ExtraProps>({
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
        activeSerieIds,
    })

    const series: AreaBumpComputedSerie<Datum, ExtraProps>[] = useMemo(
        () =>
            rawSeries.map(serie => {
                const serieWithColor = {
                    ...serie,
                    color: getColor(serie.data),
                }

                return {
                    ...serieWithColor,
                    ...getSerieStyle(serieWithColor),
                }
            }),
        [rawSeries, getColor, getSerieStyle]
    )

    return {
        series,
        xScale,
        heightScale,
        areaGenerator,
        activeSerieIds,
        setActiveSerieIds,
    }
}

export const useAreaBumpSerieHandlers = <
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
>({
    serie,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setActiveSerieIds,
    tooltip,
}: {
    serie: AreaBumpComputedSerie<Datum, ExtraProps>
    isInteractive: AreaBumpCommonProps<Datum, ExtraProps>['isInteractive']
    onMouseEnter?: AreaBumpCommonProps<Datum, ExtraProps>['onMouseEnter']
    onMouseMove?: AreaBumpCommonProps<Datum, ExtraProps>['onMouseMove']
    onMouseLeave?: AreaBumpCommonProps<Datum, ExtraProps>['onMouseLeave']
    onClick?: AreaBumpCommonProps<Datum, ExtraProps>['onClick']
    setActiveSerieIds: (serieIds: string[]) => void
    tooltip: AreaBumpCommonProps<Datum, ExtraProps>['tooltip']
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { serie }), event)
            setActiveSerieIds([serie.id])
            onMouseEnter && onMouseEnter(serie, event)
        },
        [serie, onMouseEnter, showTooltipFromEvent, setActiveSerieIds, tooltip]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { serie }), event)
            onMouseMove && onMouseMove(serie, event)
        },
        [serie, onMouseMove, showTooltipFromEvent, tooltip]
    )

    const handleMouseLeave = useCallback(
        event => {
            hideTooltip()
            setActiveSerieIds([])
            onMouseLeave && onMouseLeave(serie, event)
        },
        [serie, onMouseLeave, hideTooltip, setActiveSerieIds]
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

export const useAreaBumpSeriesLabels = <
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
>({
    series,
    position,
    padding,
    color,
    getLabel,
}: {
    series: AreaBumpComputedSerie<Datum, ExtraProps>[]
    position: 'start' | 'end'
    padding: number
    color: InheritedColorConfig<AreaBumpComputedSerie<Datum, ExtraProps>>
    getLabel: Exclude<AreaBumpLabel<Datum, ExtraProps>, false>
}): AreaBumpLabelData<Datum, ExtraProps>[] => {
    const theme = useTheme()
    const getColor = useInheritedColor(color, theme)

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
            let label = serie.id
            if (typeof getLabel === 'function') {
                label = getLabel(serie.data)
            }

            const point =
                position === 'start' ? serie.points[0] : serie.points[serie.points.length - 1]

            return {
                id: serie.id,
                label,
                x: point.x + signedPadding,
                y: point.y,
                color: getColor(serie),
                opacity: serie.fillOpacity,
                serie,
                textAnchor,
            }
        })
    }, [getLabel, series, position, padding, getColor])
}
