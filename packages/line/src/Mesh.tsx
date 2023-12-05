import { createElement, memo, useCallback, MouseEvent } from 'react'
import { Margin } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { Mesh as BaseMesh } from '@nivo/voronoi'
import { LineDatum, PointDatum, PointTooltipComponent, PointMouseHandler } from './types'

interface MeshProps<Datum extends LineDatum> {
    points: readonly PointDatum<Datum>[]
    width: number
    height: number
    margin: Margin
    setCurrent: (point: PointDatum<Datum> | null) => void
    tooltip: PointTooltipComponent<Datum>
    debug: boolean
    onMouseEnter?: PointMouseHandler<Datum>
    onMouseMove?: PointMouseHandler<Datum>
    onMouseLeave?: PointMouseHandler<Datum>
    onClick?: PointMouseHandler<Datum>
}

const NonMemoizedMesh = <Datum extends LineDatum>({
    points,
    width,
    height,
    margin,
    setCurrent,
    tooltip,
    debug,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: MeshProps<Datum>) => {
    const { showTooltipAt, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (point: PointDatum<Datum>, event: MouseEvent) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            setCurrent(point)
            onMouseEnter && onMouseEnter(point, event)
        },
        [setCurrent, showTooltipAt, tooltip, onMouseEnter, margin]
    )

    const handleMouseMove = useCallback(
        (point: PointDatum<Datum>, event: MouseEvent) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            setCurrent(point)
            onMouseMove && onMouseMove(point, event)
        },
        [setCurrent, showTooltipAt, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (point: PointDatum<Datum>, event: MouseEvent) => {
            hideTooltip()
            setCurrent(null)
            onMouseLeave && onMouseLeave(point, event)
        },
        [hideTooltip, setCurrent, onMouseLeave]
    )

    const handleClick = useCallback(
        (point: PointDatum<Datum>, event: MouseEvent) => {
            onClick && onClick(point, event)
        },
        [onClick]
    )

    return (
        <BaseMesh
            nodes={points}
            width={width}
            height={height}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            debug={debug}
        />
    )
}

export const Mesh = memo(NonMemoizedMesh) as typeof NonMemoizedMesh
