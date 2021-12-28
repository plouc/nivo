import { createElement, useMemo, useCallback, useState } from 'react'
import { line as d3Line, curveBasis, curveLinear } from 'd3-shape'
import { useTheme } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor, InheritedColorConfig } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import {
    BumpInterpolation,
    BumpCommonProps,
    BumpDatum,
    DefaultBumpDatum,
    BumpDataProps,
    BumpComputedSerie,
    BumpPoint,
    BumpLabel,
    BumpLabelData,
} from './types'
import { computeSeries } from './compute'

const useLineGenerator = (interpolation: BumpInterpolation) =>
    useMemo(
        () =>
            d3Line<[number, number | null]>()
                .curve(interpolation === 'smooth' ? curveBasis : curveLinear)
                .defined(d => d[0] !== null && d[1] !== null),

        [interpolation]
    )

const useSerieDerivedProp = <Target, Output extends string | number>(
    instruction: ((target: Target) => Output) | Output
): ((target: Target) => Output) =>
    useMemo(() => {
        if (typeof instruction === 'function') return instruction
        return () => instruction
    }, [instruction])

const useSerieStyle = <D extends BumpDatum>({
    lineWidth,
    activeLineWidth,
    inactiveLineWidth,
    opacity,
    activeOpacity,
    inactiveOpacity,
    isInteractive,
    activeSerieIds,
}: {
    lineWidth: BumpCommonProps<D>['lineWidth']
    activeLineWidth: BumpCommonProps<D>['activeLineWidth']
    inactiveLineWidth: BumpCommonProps<D>['inactiveLineWidth']
    opacity: BumpCommonProps<D>['opacity']
    activeOpacity: BumpCommonProps<D>['activeOpacity']
    inactiveOpacity: BumpCommonProps<D>['inactiveOpacity']
    isInteractive: BumpCommonProps<D>['isInteractive']
    activeSerieIds: string[]
}) => {
    type Serie = Omit<BumpComputedSerie<D>, 'color' | 'style'>

    const getLineWidth = useSerieDerivedProp<Serie, number>(lineWidth)
    const getActiveLineWidth = useSerieDerivedProp<Serie, number>(activeLineWidth)
    const getInactiveLineWidth = useSerieDerivedProp<Serie, number>(inactiveLineWidth)

    const getOpacity = useSerieDerivedProp<Serie, number>(opacity)
    const getActiveOpacity = useSerieDerivedProp<Serie, number>(activeOpacity)
    const getInactiveOpacity = useSerieDerivedProp<Serie, number>(inactiveOpacity)

    const getNormalStyle = useCallback(
        (serie: Serie) => ({
            lineWidth: getLineWidth(serie),
            opacity: getOpacity(serie),
        }),
        [getLineWidth, getOpacity]
    )
    const getActiveStyle = useCallback(
        (serie: Serie) => ({
            lineWidth: getActiveLineWidth(serie),
            opacity: getActiveOpacity(serie),
        }),
        [getActiveLineWidth, getActiveOpacity]
    )
    const getInactiveStyle = useCallback(
        (serie: Serie) => ({
            lineWidth: getInactiveLineWidth(serie),
            opacity: getInactiveOpacity(serie),
        }),
        [getInactiveLineWidth, getInactiveOpacity]
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

const usePointStyle = <D extends BumpDatum>({
    pointSize,
    activePointSize,
    inactivePointSize,
    pointBorderWidth,
    activePointBorderWidth,
    inactivePointBorderWidth,
    isInteractive,
    activeSerieIds,
}: {
    pointSize: BumpCommonProps<D>['pointSize']
    activePointSize: BumpCommonProps<D>['activePointSize']
    inactivePointSize: BumpCommonProps<D>['inactivePointSize']
    pointBorderWidth: BumpCommonProps<D>['pointBorderWidth']
    activePointBorderWidth: BumpCommonProps<D>['activePointBorderWidth']
    inactivePointBorderWidth: BumpCommonProps<D>['inactivePointBorderWidth']
    isInteractive: BumpCommonProps<D>['isInteractive']
    activeSerieIds: string[]
}) => {
    type Point = Omit<BumpPoint<D>, 'style'>

    const getSize = useSerieDerivedProp(pointSize)
    const getActiveSize = useSerieDerivedProp(activePointSize)
    const getInactiveSize = useSerieDerivedProp(inactivePointSize)

    const getBorderWidth = useSerieDerivedProp(pointBorderWidth)
    const getActiveBorderWidth = useSerieDerivedProp(activePointBorderWidth)
    const getInactiveBorderWidth = useSerieDerivedProp(inactivePointBorderWidth)

    const getNormalStyle = useCallback(
        (point: Point) => ({
            size: getSize(point),
            borderWidth: getBorderWidth(point),
        }),
        [getSize, getBorderWidth]
    )
    const getActiveStyle = useCallback(
        (point: Point) => ({
            size: getActiveSize(point),
            borderWidth: getActiveBorderWidth(point),
        }),
        [getActiveSize, getActiveBorderWidth]
    )
    const getInactiveStyle = useCallback(
        (point: Point) => ({
            size: getInactiveSize(point),
            borderWidth: getInactiveBorderWidth(point),
        }),
        [getInactiveSize, getInactiveBorderWidth]
    )

    return useCallback(
        (point: Point) => {
            if (!isInteractive || activeSerieIds.length === 0) return getNormalStyle(point)
            if (activeSerieIds.includes(point.serie.id)) return getActiveStyle(point)
            return getInactiveStyle(point)
        },
        [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, activeSerieIds]
    )
}

export const useBump = <D extends BumpDatum = DefaultBumpDatum>({
    width,
    height,
    data,
    interpolation,
    xPadding,
    xOuterPadding,
    yOuterPadding,
    lineWidth,
    activeLineWidth,
    inactiveLineWidth,
    colors,
    opacity,
    activeOpacity,
    inactiveOpacity,
    pointSize,
    activePointSize,
    inactivePointSize,
    pointColor,
    pointBorderWidth,
    activePointBorderWidth,
    inactivePointBorderWidth,
    pointBorderColor,
    isInteractive,
    defaultActiveSerieIds,
}: {
    width: number
    height: number
    data: BumpDataProps<D>['data']
    interpolation: BumpCommonProps<D>['interpolation']
    xPadding: BumpCommonProps<D>['xPadding']
    xOuterPadding: BumpCommonProps<D>['xOuterPadding']
    yOuterPadding: BumpCommonProps<D>['yOuterPadding']
    lineWidth: BumpCommonProps<D>['lineWidth']
    activeLineWidth: BumpCommonProps<D>['activeLineWidth']
    inactiveLineWidth: BumpCommonProps<D>['inactiveLineWidth']
    colors: BumpCommonProps<D>['colors']
    opacity: BumpCommonProps<D>['opacity']
    activeOpacity: BumpCommonProps<D>['activeOpacity']
    inactiveOpacity: BumpCommonProps<D>['inactiveOpacity']
    pointSize: BumpCommonProps<D>['pointSize']
    activePointSize: BumpCommonProps<D>['activePointSize']
    inactivePointSize: BumpCommonProps<D>['inactivePointSize']
    pointColor: BumpCommonProps<D>['pointColor']
    pointBorderWidth: BumpCommonProps<D>['pointBorderWidth']
    activePointBorderWidth: BumpCommonProps<D>['activePointBorderWidth']
    inactivePointBorderWidth: BumpCommonProps<D>['inactivePointBorderWidth']
    pointBorderColor: BumpCommonProps<D>['pointBorderColor']
    isInteractive: BumpCommonProps<D>['isInteractive']
    defaultActiveSerieIds: BumpCommonProps<D>['defaultActiveSerieIds']
}) => {
    const [activeSerieIds, setActiveSerieIds] = useState<string[]>(defaultActiveSerieIds)

    const {
        series: rawSeries,
        xScale,
        yScale,
    } = useMemo(
        () =>
            computeSeries<D>({
                width,
                height,
                data,
                xPadding,
                xOuterPadding,
                yOuterPadding,
            }),
        [width, height, data, xPadding, xOuterPadding, yOuterPadding]
    )

    const lineGenerator = useLineGenerator(interpolation)

    const getColor = useOrdinalColorScale<Omit<BumpComputedSerie<D>, 'color' | 'style'>>(
        colors,
        'id'
    )
    const getSerieStyle = useSerieStyle<D>({
        lineWidth,
        activeLineWidth,
        inactiveLineWidth,
        opacity,
        activeOpacity,
        inactiveOpacity,
        isInteractive,
        activeSerieIds,
    })

    const series: BumpComputedSerie<D>[] = useMemo(
        () =>
            rawSeries.map(serie => ({
                ...serie,
                color: getColor(serie),
                style: getSerieStyle(serie),
            })),
        [rawSeries, getColor, getSerieStyle]
    )

    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)
    const getPointStyle = usePointStyle<D>({
        pointSize,
        activePointSize,
        inactivePointSize,
        pointBorderWidth,
        activePointBorderWidth,
        inactivePointBorderWidth,
        isInteractive,
        activeSerieIds,
    })
    const points: BumpPoint<D>[] = useMemo(() => {
        const pts: BumpPoint<D>[] = []
        series.forEach(serie => {
            serie.points.forEach(rawPoint => {
                // @ts-ignore
                const point: BumpPoint<D> = {
                    ...rawPoint,
                    serie,
                    isActive: activeSerieIds.includes(serie.id),
                    isInactive: activeSerieIds.length > 0 && !activeSerieIds.includes(serie.id),
                }
                point.color = getPointColor(point)
                point.borderColor = getPointBorderColor(point)
                point.style = getPointStyle(point)

                pts.push(point)
            })
        })

        return pts
    }, [series, getPointColor, getPointBorderColor, getPointStyle, activeSerieIds])

    return {
        xScale,
        yScale,
        series,
        points,
        lineGenerator,
        activeSerieIds,
        setActiveSerieIds,
    }
}

export const useBumpSerieHandlers = <D extends BumpDatum>({
    serie,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setActiveSerieIds,
    tooltip,
}: {
    serie: BumpComputedSerie<D>
    isInteractive: BumpCommonProps<D>['isInteractive']
    onMouseEnter?: BumpCommonProps<D>['onMouseEnter']
    onMouseMove?: BumpCommonProps<D>['onMouseMove']
    onMouseLeave?: BumpCommonProps<D>['onMouseLeave']
    onClick?: BumpCommonProps<D>['onClick']
    setActiveSerieIds: (serieIds: string[]) => void
    tooltip: BumpCommonProps<D>['tooltip']
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { serie }), event)
            setActiveSerieIds([serie.id])
            onMouseEnter && onMouseEnter(serie, event)
        },
        [serie, onMouseEnter, showTooltipFromEvent, setActiveSerieIds]
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

export const useBumpSeriesLabels = <D extends BumpDatum>({
    series,
    position,
    padding,
    color,
    getLabel,
}: {
    series: BumpComputedSerie<D>[]
    position: 'start' | 'end'
    padding: number
    color: InheritedColorConfig<BumpComputedSerie<D>>
    getLabel: BumpLabel<D>
}) => {
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

        const labels: BumpLabelData<D>[] = []
        series.forEach(serie => {
            let label = serie.id
            if (typeof getLabel === 'function') {
                label = getLabel(serie)
            }

            const point =
                position === 'start'
                    ? serie.linePoints[0]
                    : serie.linePoints[serie.linePoints.length - 1]

            // exclude labels for series having missing data at the beginning/end
            if (point[0] === null || point[1] === null) {
                return
            }

            labels.push({
                id: serie.id,
                label,
                x: point[0] + signedPadding,
                y: point[1],
                color: getColor(serie),
                opacity: serie.style.opacity,
                serie,
                textAnchor,
            })
        })

        return labels
    }, [series, position, padding, getColor])
}
