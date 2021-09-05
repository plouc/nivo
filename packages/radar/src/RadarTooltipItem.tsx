import { useMemo, useState, useCallback } from 'react'
import { Arc } from 'd3-shape'
import { positionFromAngle, useTheme, useValueFormatter } from '@nivo/core'
import { TableTooltip, Chip, useTooltip } from '@nivo/tooltip'
import { RadarDataProps } from './types'

interface RadarTooltipItemProps<D extends Record<string, unknown>> {
    datum: D
    keys: RadarDataProps<D>['keys']
    index: string | number
    colorByKey: Record<string | number, string>
    startAngle: number
    endAngle: number
    radius: number
    arcGenerator: Arc<any, { startAngle: number; endAngle: number }>
    // tooltipFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export const RadarTooltipItem = <D extends Record<string, unknown>>({
    datum,
    keys,
    index,
    colorByKey,
    radius,
    startAngle,
    endAngle,
    arcGenerator,
    tooltipFormat,
}: RadarTooltipItemProps<D>) => {
    const [isHover, setIsHover] = useState(false)
    const theme = useTheme()
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const tooltipFormatter = useValueFormatter(tooltipFormat)
    const tooltip = useMemo(() => {
        const rows = keys.map(key => [
            <Chip key={key} color={colorByKey[key]} />,
            key,
            tooltipFormatter(datum[key], key),
        ])
        // sorting won't work if values are formatted to string
        rows.sort((a, b) => a[2] - b[2])
        rows.reverse()

        return <TableTooltip title={<strong>{index}</strong>} rows={rows} />
    }, [datum, keys, index, colorByKey, theme, tooltipFormatter])
    const showItemTooltip = useCallback(
        event => {
            setIsHover(true)
            showTooltipFromEvent(tooltip, event)
        },
        [showTooltipFromEvent, tooltip]
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
