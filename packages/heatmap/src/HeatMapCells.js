/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

const HeatMapCells = ({
    cells,
    cellComponent,
    cellBorderWidth,
    getCellBorderColor,
    enableLabels,
    getLabelTextColor,
    handleCellHover,
    handleCellLeave,
    onClick,
}) => {
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
            onHover: handleCellHover ? event => handleCellHover(cell, event) : undefined,
            onLeave: handleCellLeave,
            onClick,
        })
    )
}

HeatMapCells.propTypes = {}

export default HeatMapCells
