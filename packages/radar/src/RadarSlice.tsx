import { useMemo, useState, useCallback, createElement } from 'react'
import { Arc } from 'd3-shape'
import { positionFromAngle, useTheme } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { RadarCommonProps, RadarDataProps, RadarSliceTooltipDatum } from './types'

interface RadarSliceProps<D extends Record<string, unknown>> {
    datum: D
    keys: RadarDataProps<D>['keys']
    index: string | number
    formatValue: (value: number, context: string) => string
    colorByKey: Record<string, string>
    startAngle: number
    endAngle: number
    radius: number
    arcGenerator: Arc<void, { startAngle: number; endAngle: number }>
    tooltip: RadarCommonProps<D>['sliceTooltip']
}

export const RadarSlice = <D extends Record<string, unknown>>({
    datum,
    keys,
    index,
    formatValue,
    colorByKey,
    radius,
    startAngle,
    endAngle,
    arcGenerator,
    tooltip,
}: RadarSliceProps<D>) => {
    const [isHover, setIsHover] = useState(false)
    const theme = useTheme()
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const tooltipData = useMemo(() => {
        const data: RadarSliceTooltipDatum[] = keys.map(key => ({
            color: colorByKey[key],
            id: key,
            value: datum[key] as number,
            formattedValue: formatValue(datum[key] as number, key),
        }))
        data.sort((a, b) => a.value - b.value)
        data.reverse()

        return data
    }, [datum, keys, formatValue, colorByKey])

    const showItemTooltip = useCallback(
        event => {
            setIsHover(true)
            showTooltipFromEvent(
                createElement(tooltip, {
                    index,
                    data: tooltipData,
                }),
                event
            )
        },
        [showTooltipFromEvent, tooltip, index, tooltipData]
    )

    const hideItemTooltip = useCallback(() => {
        setIsHover(false)
        hideTooltip()
    }, [hideTooltip, setIsHover])

    const { path, tipX, tipY } = useMemo(() => {
        const position = positionFromAngle(
            startAngle + (endAngle - startAngle) * 0.5 - Math.PI / 2,
            radius
        )

        return {
            path: arcGenerator({ startAngle, endAngle }) as string,
            tipX: position.x,
            tipY: position.y,
        }
    }, [startAngle, endAngle, radius, arcGenerator])

    return (
        <>
            {isHover && <line x1={0} y1={0} x2={tipX} y2={tipY} style={theme.crosshair.line} />}
            <path
                d={path}
                fill="#F00"
                fillOpacity={0}
                onMouseEnter={showItemTooltip}
                onMouseMove={showItemTooltip}
                onMouseLeave={hideItemTooltip}
            />
        </>
    )
}
