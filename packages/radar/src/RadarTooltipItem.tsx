import { useMemo, useState, useCallback, ReactNode } from 'react'
import { Arc } from 'd3-shape'
import { positionFromAngle, useTheme } from '@nivo/core'
import { TableTooltip, Chip, useTooltip } from '@nivo/tooltip'
import { RadarDataProps } from './types'

interface RadarTooltipItemProps<D extends Record<string, unknown>> {
    datum: D
    keys: RadarDataProps<D>['keys']
    index: string | number
    formatValue: (value: number, context: string) => string
    colorByKey: Record<string, string>
    startAngle: number
    endAngle: number
    radius: number
    arcGenerator: Arc<void, { startAngle: number; endAngle: number }>
}

type TooltipRow = [ReactNode, string, number | string]

export const RadarTooltipItem = <D extends Record<string, unknown>>({
    datum,
    keys,
    index,
    formatValue,
    colorByKey,
    radius,
    startAngle,
    endAngle,
    arcGenerator,
}: RadarTooltipItemProps<D>) => {
    const [isHover, setIsHover] = useState(false)
    const theme = useTheme()
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const tooltip = useMemo(() => {
        // first use number values to be able to sort
        const rows: TooltipRow[] = keys.map(key => [
            <Chip key={key} color={colorByKey[key]} />,
            key,
            datum[key] as number,
        ])
        rows.sort((a, b) => (a[2] as number) - (b[2] as number))
        rows.reverse()

        // then replace with formatted values
        rows.forEach(row => {
            row[2] = formatValue(row[2] as number, row[1])
        })

        return <TableTooltip title={<strong>{index}</strong>} rows={rows} />
    }, [datum, keys, index, formatValue, colorByKey])
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
