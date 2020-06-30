/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback } from 'react'
import { useTooltip } from '@nivo/tooltip'

const HeatMapCells = ({
    cells,
    cellComponent,
    cellBorderWidth,
    getCellBorderColor,
    enableLabels,
    getLabelTextColor,
    tooltip,
    setCurrentCellId,
    onClick,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleCellHover = useCallback(
        (cell, event) => {
            setCurrentCellId(cell.id)
            showTooltipFromEvent(tooltip(cell), event)
        },
        [setCurrentCellId, showTooltipFromEvent, tooltip]
    )

    const handleCellLeave = useCallback(() => {
        setCurrentCellId(null)
        hideTooltip()
    }, [setCurrentCellId, hideTooltip])

    return cells.map(cell =>
        React.createElement(cellComponent, {
            key: cell.id,
            data: cell,
            value: cell.value,
            x: cell.x,
            y: cell.y,
            width: cell.width,
            height: cell.height,
            color: cell.color,
            opacity: cell.opacity,
            borderWidth: cellBorderWidth,
            borderColor: getCellBorderColor(cell),
            enableLabel: enableLabels,
            textColor: getLabelTextColor(cell),
            onHover: tooltip ? event => handleCellHover(cell, event) : undefined,
            onLeave: handleCellLeave,
            onClick,
        })
    )
}

HeatMapCells.propTypes = {}

export default HeatMapCells
