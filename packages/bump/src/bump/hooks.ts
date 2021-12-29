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
    BumpSerieExtraProps,
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

const useSerieStyle = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    lineWidth,
    activeLineWidth,
    inactiveLineWidth,
    opacity,
    activeOpacity,
    inactiveOpacity,
    isInteractive,
    activeSerieIds,
}: {
    lineWidth: BumpCommonProps<Datum, ExtraProps>['lineWidth']
    activeLineWidth: BumpCommonProps<Datum, ExtraProps>['activeLineWidth']
    inactiveLineWidth: BumpCommonProps<Datum, ExtraProps>['inactiveLineWidth']
    opacity: BumpCommonProps<Datum, ExtraProps>['opacity']
    activeOpacity: BumpCommonProps<Datum, ExtraProps>['activeOpacity']
    inactiveOpacity: BumpCommonProps<Datum, ExtraProps>['inactiveOpacity']
    isInteractive: BumpCommonProps<Datum, ExtraProps>['isInteractive']
    activeSerieIds: string[]
}) => {
    type Serie = Omit<BumpComputedSerie<Datum, ExtraProps>, 'color' | 'opacity' | 'lineWidth'>

    const getLineWidth = useSerieDerivedProp<Serie, number>(lineWidth)
    const getActiveLineWidth = useSerieDerivedProp<Serie, number>(activeLineWidth)
    const getInactiveLineWidth = useSerieDerivedProp<Serie, number>(inactiveLineWidth)

    const getOpacity = useSerieDerivedProp<Serie, number>(opacity)
    const getActiveOpacity = useSerieDerivedProp<Serie, number>(activeOpacity)
    const getInactiveOpacity = useSerieDerivedProp<Serie, number>(inactiveOpacity)

    const getNormalStyle = useCallback(
        (serie: Serie) => ({
            opacity: getOpacity(serie),
            lineWidth: getLineWidth(serie),
        }),
        [getLineWidth, getOpacity]
    )
    const getActiveStyle = useCallback(
        (serie: Serie) => ({
            opacity: getActiveOpacity(serie),
            lineWidth: getActiveLineWidth(serie),
        }),
        [getActiveLineWidth, getActiveOpacity]
    )
    const getInactiveStyle = useCallback(
        (serie: Serie) => ({
            opacity: getInactiveOpacity(serie),
            lineWidth: getInactiveLineWidth(serie),
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

const usePointStyle = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    pointSize,
    activePointSize,
    inactivePointSize,
    pointBorderWidth,
    activePointBorderWidth,
    inactivePointBorderWidth,
    isInteractive,
    activeSerieIds,
}: {
    pointSize: BumpCommonProps<Datum, ExtraProps>['pointSize']
    activePointSize: BumpCommonProps<Datum, ExtraProps>['activePointSize']
    inactivePointSize: BumpCommonProps<Datum, ExtraProps>['inactivePointSize']
    pointBorderWidth: BumpCommonProps<Datum, ExtraProps>['pointBorderWidth']
    activePointBorderWidth: BumpCommonProps<Datum, ExtraProps>['activePointBorderWidth']
    inactivePointBorderWidth: BumpCommonProps<Datum, ExtraProps>['inactivePointBorderWidth']
    isInteractive: BumpCommonProps<Datum, ExtraProps>['isInteractive']
    activeSerieIds: string[]
}) => {
    type Point = Omit<BumpPoint<Datum, ExtraProps>, 'size' | 'borderWidth'>

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

export const useBump = <
    Datum extends BumpDatum = DefaultBumpDatum,
    ExtraProps extends BumpSerieExtraProps = {}
>({
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
    data: BumpDataProps<Datum, ExtraProps>['data']
    interpolation: BumpCommonProps<Datum, ExtraProps>['interpolation']
    xPadding: BumpCommonProps<Datum, ExtraProps>['xPadding']
    xOuterPadding: BumpCommonProps<Datum, ExtraProps>['xOuterPadding']
    yOuterPadding: BumpCommonProps<Datum, ExtraProps>['yOuterPadding']
    lineWidth: BumpCommonProps<Datum, ExtraProps>['lineWidth']
    activeLineWidth: BumpCommonProps<Datum, ExtraProps>['activeLineWidth']
    inactiveLineWidth: BumpCommonProps<Datum, ExtraProps>['inactiveLineWidth']
    colors: BumpCommonProps<Datum, ExtraProps>['colors']
    opacity: BumpCommonProps<Datum, ExtraProps>['opacity']
    activeOpacity: BumpCommonProps<Datum, ExtraProps>['activeOpacity']
    inactiveOpacity: BumpCommonProps<Datum, ExtraProps>['inactiveOpacity']
    pointSize: BumpCommonProps<Datum, ExtraProps>['pointSize']
    activePointSize: BumpCommonProps<Datum, ExtraProps>['activePointSize']
    inactivePointSize: BumpCommonProps<Datum, ExtraProps>['inactivePointSize']
    pointColor: BumpCommonProps<Datum, ExtraProps>['pointColor']
    pointBorderWidth: BumpCommonProps<Datum, ExtraProps>['pointBorderWidth']
    activePointBorderWidth: BumpCommonProps<Datum, ExtraProps>['activePointBorderWidth']
    inactivePointBorderWidth: BumpCommonProps<Datum, ExtraProps>['inactivePointBorderWidth']
    pointBorderColor: BumpCommonProps<Datum, ExtraProps>['pointBorderColor']
    isInteractive: BumpCommonProps<Datum, ExtraProps>['isInteractive']
    defaultActiveSerieIds: string[]
}) => {
    const [activeSerieIds, setActiveSerieIds] = useState<string[]>(defaultActiveSerieIds)

    const {
        series: rawSeries,
        xScale,
        yScale,
    } = useMemo(
        () =>
            computeSeries<Datum, ExtraProps>({
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

    const getColor = useOrdinalColorScale(colors, 'id')
    const getSerieStyle = useSerieStyle<Datum, ExtraProps>({
        lineWidth,
        activeLineWidth,
        inactiveLineWidth,
        opacity,
        activeOpacity,
        inactiveOpacity,
        isInteractive,
        activeSerieIds,
    })

    const series: BumpComputedSerie<Datum, ExtraProps>[] = useMemo(
        () =>
            rawSeries.map(serie => ({
                ...serie,
                color: getColor(serie.data),
                ...getSerieStyle(serie),
            })),
        [rawSeries, getColor, getSerieStyle]
    )

    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)
    const getPointStyle = usePointStyle<Datum, ExtraProps>({
        pointSize,
        activePointSize,
        inactivePointSize,
        pointBorderWidth,
        activePointBorderWidth,
        inactivePointBorderWidth,
        isInteractive,
        activeSerieIds,
    })
    const points: BumpPoint<Datum, ExtraProps>[] = useMemo(() => {
        const pts: BumpPoint<Datum, ExtraProps>[] = []
        series.forEach(serie => {
            serie.points.forEach(rawPoint => {
                // @ts-ignore
                const point: BumpPoint<Datum, ExtraProps> = {
                    ...rawPoint,
                    serie,
                    isActive: activeSerieIds.includes(serie.id),
                    isInactive: activeSerieIds.length > 0 && !activeSerieIds.includes(serie.id),
                }
                point.color = getPointColor(point)
                point.borderColor = getPointBorderColor(point)

                pts.push({
                    ...point,
                    ...getPointStyle(point),
                })
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

export const useBumpSerieHandlers = <
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
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
    serie: BumpComputedSerie<Datum, ExtraProps>
    isInteractive: BumpCommonProps<Datum, ExtraProps>['isInteractive']
    onMouseEnter?: BumpCommonProps<Datum, ExtraProps>['onMouseEnter']
    onMouseMove?: BumpCommonProps<Datum, ExtraProps>['onMouseMove']
    onMouseLeave?: BumpCommonProps<Datum, ExtraProps>['onMouseLeave']
    onClick?: BumpCommonProps<Datum, ExtraProps>['onClick']
    setActiveSerieIds: (serieIds: string[]) => void
    tooltip: BumpCommonProps<Datum, ExtraProps>['tooltip']
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

export const useBumpSeriesLabels = <
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
>({
    series,
    position,
    padding,
    color,
    getLabel,
}: {
    series: BumpComputedSerie<Datum, ExtraProps>[]
    position: 'start' | 'end'
    padding: number
    color: InheritedColorConfig<BumpComputedSerie<Datum, ExtraProps>>
    getLabel: BumpLabel<Datum, ExtraProps>
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

        const labels: BumpLabelData<Datum, ExtraProps>[] = []
        series.forEach(serie => {
            let label = serie.id
            if (typeof getLabel === 'function') {
                label = getLabel(serie.data)
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
                opacity: serie.opacity,
                serie,
                textAnchor,
            })
        })

        return labels
    }, [series, position, padding, getColor])
}
