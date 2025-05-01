import { createElement, memo, useCallback, MouseEvent, TouchEvent } from 'react'
import { Margin } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { Mesh as BaseMesh } from '@nivo/voronoi'
import { LineSeries, Point, LineSvgProps, LineSvgPropsWithDefaults } from './types'

const NonMemoizedMesh = <Series extends LineSeries>({
    points,
    width,
    height,
    margin,
    setCurrent,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    tooltip,
    debug,
    enableTouchCrosshair,
}: {
    points: Point<Series>[]
    width: number
    height: number
    margin: Margin
    setCurrent: (point: Point<Series> | null) => void
    onMouseEnter?: LineSvgProps<Series>['onMouseEnter']
    onMouseMove?: LineSvgProps<Series>['onMouseMove']
    onMouseLeave?: LineSvgProps<Series>['onMouseLeave']
    onMouseDown?: LineSvgProps<Series>['onMouseDown']
    onMouseUp?: LineSvgProps<Series>['onMouseUp']
    onClick?: LineSvgProps<Series>['onClick']
    onDoubleClick?: LineSvgProps<Series>['onDoubleClick']
    onTouchStart?: LineSvgProps<Series>['onTouchStart']
    onTouchMove?: LineSvgProps<Series>['onTouchMove']
    onTouchEnd?: LineSvgProps<Series>['onTouchEnd']
    tooltip: LineSvgPropsWithDefaults<Series>['tooltip']
    debug: boolean
    enableTouchCrosshair: LineSvgPropsWithDefaults<Series>['enableTouchCrosshair']
}) => {
    const { showTooltipAt, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (point: Point<Series>, event: MouseEvent) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            onMouseEnter?.(point, event)
        },
        [showTooltipAt, tooltip, onMouseEnter, margin]
    )

    const handleMouseMove = useCallback(
        (point: Point<Series>, event: MouseEvent) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            onMouseMove?.(point, event)
        },
        [showTooltipAt, tooltip, margin.left, margin.top, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (point: Point<Series>, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(point, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const handleMouseDown = useCallback(
        (point: Point<Series>, event: MouseEvent) => {
            onMouseDown?.(point, event)
        },
        [onMouseDown]
    )

    const handleMouseUp = useCallback(
        (point: Point<Series>, event: MouseEvent) => {
            onMouseUp?.(point, event)
        },
        [onMouseUp]
    )

    const handleClick = useCallback(
        (point: Point<Series>, event: MouseEvent) => {
            onClick?.(point, event)
        },
        [onClick]
    )

    const handleDoubleClick = useCallback(
        (point: Point<Series>, event: MouseEvent) => {
            onDoubleClick?.(point, event)
        },
        [onDoubleClick]
    )

    const handleTouchStart = useCallback(
        (point: Point<Series>, event: TouchEvent) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            onTouchStart?.(point, event)
        },
        [margin.left, margin.top, onTouchStart, showTooltipAt, tooltip]
    )

    const handleTouchMove = useCallback(
        (point: Point<Series>, event: TouchEvent) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            onTouchMove?.(point, event)
        },
        [margin.left, margin.top, onTouchMove, showTooltipAt, tooltip]
    )

    const handleTouchEnd = useCallback(
        (point: Point<Series>, event: TouchEvent) => {
            hideTooltip()
            onTouchEnd?.(point, event)
        },
        [onTouchEnd, hideTooltip]
    )

    return (
        <BaseMesh<Point<Series>>
            nodes={points}
            width={width}
            height={height}
            setCurrent={setCurrent}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            enableTouchCrosshair={enableTouchCrosshair}
            debug={debug}
        />
    )
}

export const Mesh = memo(NonMemoizedMesh) as typeof NonMemoizedMesh
