import { createElement, memo, useCallback } from 'react'
import { Margin } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { Mesh as BaseMesh } from '@nivo/voronoi'
import { LinePointDatum, LineDatum, LineCommonProps } from './types'

const NonMemoizedMesh = <Datum extends LineDatum>({
    points,
    width,
    height,
    margin,
    setCurrent,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    debug,
}: {
    points: LinePointDatum<Datum>[]
    width: number
    height: number
    margin: Margin
    setCurrent: (point: LinePointDatum<Datum> | null) => void
    onMouseEnter?: LineCommonProps<Datum>['onMouseEnter']
    onMouseMove?: LineCommonProps<Datum>['onMouseMove']
    onMouseLeave?: LineCommonProps<Datum>['onMouseLeave']
    onClick?: LineCommonProps<Datum>['onClick']
    tooltip: LineCommonProps<Datum>['tooltip']
    debug: LineCommonProps<Datum>['debugMesh']
}) => {
    const { showTooltipAt, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (point, event) => {
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
        (point, event) => {
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
        (point, event) => {
            hideTooltip()
            setCurrent(null)
            onMouseLeave && onMouseLeave(point, event)
        },
        [hideTooltip, setCurrent, onMouseLeave]
    )

    const handleClick = useCallback(
        (point, event) => {
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
