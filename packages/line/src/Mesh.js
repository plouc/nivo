import { createElement, memo, useCallback } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { Mesh as BaseMesh } from '@nivo/voronoi'

const Mesh = ({
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
}) => {
    const { showTooltipAt, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (point, event) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            onMouseEnter && onMouseEnter(point, event)
        },
        [showTooltipAt, tooltip, onMouseEnter, margin]
    )

    const handleMouseMove = useCallback(
        (point, event) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            onMouseMove && onMouseMove(point, event)
        },
        [showTooltipAt, tooltip, margin.left, margin.top, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (point, event) => {
            hideTooltip()
            onMouseLeave && onMouseLeave(point, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const handleMouseDown = useCallback(
        (point, event) => {
            onMouseDown && onMouseDown(point, event)
        },
        [onMouseDown]
    )

    const handleMouseUp = useCallback(
        (point, event) => {
            onMouseUp && onMouseUp(point, event)
        },
        [onMouseUp]
    )

    const handleClick = useCallback(
        (point, event) => {
            onClick && onClick(point, event)
        },
        [onClick]
    )

    const handleDoubleClick = useCallback(
        (point, event) => {
            onDoubleClick && onDoubleClick(point, event)
        },
        [onDoubleClick]
    )

    const handleTouchStart = useCallback(
        (point, event) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            onTouchStart && onTouchStart(point, event)
        },
        [margin.left, margin.top, onTouchStart, showTooltipAt, tooltip]
    )

    const handleTouchMove = useCallback(
        (point, event) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            onTouchMove && onTouchMove(point, event)
        },
        [margin.left, margin.top, onTouchMove, showTooltipAt, tooltip]
    )

    const handleTouchEnd = useCallback(
        (point, event) => {
            hideTooltip()
            onTouchEnd && onTouchEnd(point, event)
        },
        [onTouchEnd, hideTooltip]
    )

    return (
        <BaseMesh
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

export default memo(Mesh)
