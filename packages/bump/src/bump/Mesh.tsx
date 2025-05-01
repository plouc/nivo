import { MouseEvent } from 'react'
import { createElement, memo, useCallback } from 'react'
import { Margin } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { Mesh as BaseMesh } from '@nivo/voronoi'
import {
    BumpCommonProps,
    BumpDatum,
    BumpPoint,
    BumpPointMouseHandler,
    BumpSerieExtraProps,
} from './types'

interface MeshProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> {
    points: BumpPoint<Datum, ExtraProps>[]
    width: number
    height: number
    margin: Margin
    setActivePointIds: (ids: string[]) => void
    setActiveSerieIds: (ids: string[]) => void
    onMouseEnter?: BumpPointMouseHandler<Datum, ExtraProps>
    onMouseMove?: BumpPointMouseHandler<Datum, ExtraProps>
    onMouseLeave?: BumpPointMouseHandler<Datum, ExtraProps>
    onMouseDown?: BumpPointMouseHandler<Datum, ExtraProps>
    onMouseUp?: BumpPointMouseHandler<Datum, ExtraProps>
    onClick?: BumpPointMouseHandler<Datum, ExtraProps>
    onDoubleClick?: BumpPointMouseHandler<Datum, ExtraProps>
    tooltip: BumpCommonProps<Datum, ExtraProps>['pointTooltip']
    debug: boolean
}

const InnerMesh = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    points,
    width,
    height,
    margin,
    setActivePointIds,
    setActiveSerieIds,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    tooltip,
    debug,
}: MeshProps<Datum, ExtraProps>) => {
    const { showTooltipAt, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (point: BumpPoint<Datum, ExtraProps>, event: MouseEvent) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y ?? 0 + margin.top],
                'top'
            )
            setActivePointIds([point.id])
            setActiveSerieIds([point.serie.id])
            onMouseEnter?.(point, event)
        },
        [
            showTooltipAt,
            tooltip,
            margin.left,
            margin.top,
            setActivePointIds,
            setActiveSerieIds,
            onMouseEnter,
        ]
    )

    const handleMouseMove = useCallback(
        (point: BumpPoint<Datum, ExtraProps>, event: MouseEvent) => {
            showTooltipAt(
                createElement(tooltip, { point }),
                [point.x + margin.left, point.y ?? 0 + margin.top],
                'top'
            )
            setActivePointIds([point.id])
            setActiveSerieIds([point.serie.id])
            onMouseMove?.(point, event)
        },
        [
            showTooltipAt,
            tooltip,
            margin.left,
            margin.top,
            setActivePointIds,
            setActiveSerieIds,
            onMouseMove,
        ]
    )

    const handleMouseLeave = useCallback(
        (point: BumpPoint<Datum, ExtraProps>, event: MouseEvent) => {
            hideTooltip()
            setActivePointIds([])
            setActiveSerieIds([])
            onMouseLeave?.(point, event)
        },
        [hideTooltip, onMouseLeave, setActivePointIds, setActiveSerieIds]
    )

    const handleMouseDown = useCallback(
        (point: BumpPoint<Datum, ExtraProps>, event: MouseEvent) => {
            onMouseDown?.(point, event)
        },
        [onMouseDown]
    )

    const handleMouseUp = useCallback(
        (point: BumpPoint<Datum, ExtraProps>, event: MouseEvent) => {
            onMouseUp?.(point, event)
        },
        [onMouseUp]
    )

    const handleClick = useCallback(
        (point: BumpPoint<Datum, ExtraProps>, event: MouseEvent) => {
            onClick?.(point, event)
        },
        [onClick]
    )

    const handleDoubleClick = useCallback(
        (point: BumpPoint<Datum, ExtraProps>, event: MouseEvent) => {
            onDoubleClick?.(point, event)
        },
        [onDoubleClick]
    )

    return (
        <BaseMesh
            nodes={points}
            width={width}
            height={height}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            debug={debug}
        />
    )
}

export const Mesh = memo(InnerMesh) as typeof InnerMesh
