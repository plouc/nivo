import { createElement, MouseEvent, useMemo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import {
    CellComponent,
    ComputedCell,
    HeatMapDatum,
    HeatMapSvgProps,
    CellAnimatedProps,
} from './types'
import { HeatMapCellRect } from './HeatMapCellRect'
import { HeatMapCellCircle } from './HeatMapCellCircle'

interface HeatMapCellsProps<Datum extends HeatMapDatum, ExtraProps extends object> {
    cells: ComputedCell<Datum>[]
    cellComponent: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['cellComponent']>
    borderRadius: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['borderRadius']>
    borderWidth: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['borderWidth']>
    isInteractive: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['isInteractive']>
    setActiveCell: (cell: ComputedCell<Datum> | null) => void
    onMouseEnter: HeatMapSvgProps<Datum, ExtraProps>['onMouseEnter']
    onMouseMove: HeatMapSvgProps<Datum, ExtraProps>['onMouseMove']
    onMouseLeave: HeatMapSvgProps<Datum, ExtraProps>['onMouseLeave']
    onClick: HeatMapSvgProps<Datum, ExtraProps>['onClick']
    tooltip: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['tooltip']>
    enableLabels: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['enableLabels']>
}

const enterTransition = <Datum extends HeatMapDatum>(cell: ComputedCell<Datum>) => ({
    x: cell.x,
    y: cell.y,
    width: cell.width,
    height: cell.height,
    color: cell.color,
    opacity: 0,
    borderColor: cell.borderColor,
    labelTextColor: cell.labelTextColor,
    scale: 0,
})

const regularTransition = <Datum extends HeatMapDatum>(cell: ComputedCell<Datum>) => ({
    x: cell.x,
    y: cell.y,
    width: cell.width,
    height: cell.height,
    color: cell.color,
    opacity: cell.opacity,
    borderColor: cell.borderColor,
    labelTextColor: cell.labelTextColor,
    scale: 1,
})

const exitTransition = <Datum extends HeatMapDatum>(cell: ComputedCell<Datum>) => ({
    x: cell.x,
    y: cell.y,
    width: cell.width,
    height: cell.height,
    color: cell.color,
    opacity: 0,
    borderColor: cell.borderColor,
    labelTextColor: cell.labelTextColor,
    scale: 0,
})

export const HeatMapCells = <Datum extends HeatMapDatum, ExtraProps extends object>({
    cells,
    cellComponent,
    borderRadius,
    borderWidth,
    isInteractive,
    setActiveCell,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    enableLabels,
}: HeatMapCellsProps<Datum, ExtraProps>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<ComputedCell<Datum>, CellAnimatedProps>(cells, {
        keys: (cell: ComputedCell<Datum>) => cell.id,
        initial: regularTransition,
        from: enterTransition,
        enter: regularTransition,
        update: regularTransition,
        leave: exitTransition,
        config: springConfig,
        immediate: !animate,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useMemo(() => {
        if (!isInteractive) return undefined

        return (cell: ComputedCell<Datum>) => (event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { cell }), event)
            setActiveCell(cell)
            onMouseEnter?.(cell, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, setActiveCell, onMouseEnter])

    const handleMouseMove = useMemo(() => {
        if (!isInteractive) return undefined

        return (cell: ComputedCell<Datum>) => (event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { cell }), event)
            onMouseMove?.(cell, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, onMouseMove])

    const handleMouseLeave = useMemo(() => {
        if (!isInteractive) return undefined

        return (cell: ComputedCell<Datum>) => (event: MouseEvent) => {
            hideTooltip()
            setActiveCell(null)
            onMouseLeave?.(cell, event)
        }
    }, [isInteractive, hideTooltip, setActiveCell, onMouseLeave])

    const handleClick = useMemo(() => {
        if (!isInteractive) return undefined

        return (cell: ComputedCell<Datum>) => (event: MouseEvent) => {
            onClick?.(cell, event)
        }
    }, [isInteractive, onClick])

    let Cell: CellComponent<Datum>
    if (cellComponent === 'rect') {
        Cell = HeatMapCellRect
    } else if (cellComponent === 'circle') {
        Cell = HeatMapCellCircle
    } else {
        Cell = cellComponent
    }

    return (
        <>
            {transition((animatedProps, cell) =>
                createElement(Cell, {
                    cell,
                    borderRadius,
                    borderWidth,
                    animatedProps,
                    enableLabels,
                    onMouseEnter: handleMouseEnter,
                    onMouseMove: handleMouseMove,
                    onMouseLeave: handleMouseLeave,
                    onClick: handleClick,
                })
            )}
        </>
    )
}
