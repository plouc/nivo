import { createElement } from 'react'

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
        createElement(cellComponent, {
            key: cell.id,
            data: cell,
            label: cell.label,
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
