import { useState, useMemo } from 'react'
import { scaleOrdinal, scaleLinear } from 'd3-scale'
import { useTheme, getAccessorFor, guessQuantizeColorScale } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'

const computeX = (column, cellWidth, padding) => {
    return column * cellWidth + cellWidth * 0.5 + padding * column + padding
}
const computeY = (row, cellHeight, padding) => {
    return row * cellHeight + cellHeight * 0.5 + padding * row + padding
}

export const useHeatMap = ({
    data,
    keys,
    indexBy,
    minValue: _minValue = 'auto',
    maxValue: _maxValue = 'auto',
    width,
    height,
    padding,
    forceSquare,
    sizeVariation,
    colors,
    cellBorderColor,
    labelTextColor,
}) => {
    const [currentNode, setCurrentNode] = useState(null)

    const getIndex = useMemo(() => getAccessorFor(indexBy), [indexBy])
    const indices = useMemo(() => data.map(getIndex), [data, getIndex])

    const layoutConfig = useMemo(() => {
        const columns = keys.length
        const rows = data.length

        let cellWidth = Math.max((width - padding * (columns + 1)) / columns, 0)
        let cellHeight = Math.max((height - padding * (rows + 1)) / rows, 0)

        let offsetX = 0
        let offsetY = 0
        if (forceSquare === true) {
            const cellSize = Math.min(cellWidth, cellHeight)
            cellWidth = cellSize
            cellHeight = cellSize

            offsetX = (width - ((cellWidth + padding) * columns + padding)) / 2
            offsetY = (height - ((cellHeight + padding) * rows + padding)) / 2
        }

        return {
            cellWidth,
            cellHeight,
            offsetX,
            offsetY,
        }
    }, [data, keys, width, height, padding, forceSquare])

    const scales = useMemo(() => {
        return {
            x: scaleOrdinal(
                keys.map((key, i) => computeX(i, layoutConfig.cellWidth, padding))
            ).domain(keys),
            y: scaleOrdinal(
                indices.map((d, i) => computeY(i, layoutConfig.cellHeight, padding))
            ).domain(indices),
        }
    }, [indices, keys, layoutConfig, padding])

    const values = useMemo(() => {
        let minValue = _minValue
        let maxValue = _maxValue
        if (minValue === 'auto' || maxValue === 'auto') {
            const allValues = data.reduce((acc, row) => acc.concat(keys.map(key => row[key])), [])

            if (minValue === 'auto') minValue = Math.min(...allValues)
            if (maxValue === 'auto') maxValue = Math.max(...allValues)
        }

        return {
            min: Math.min(minValue, maxValue),
            max: Math.max(maxValue, minValue),
        }
    }, [data, keys, _minValue, _maxValue])

    const sizeScale = useMemo(() => {
        if (sizeVariation > 0) {
            return scaleLinear()
                .range([1 - sizeVariation, 1])
                .domain([values.min, values.max])
        }
    }, [sizeVariation, values])

    const theme = useTheme()
    const colorScale = useMemo(
        () => guessQuantizeColorScale(colors).domain([values.min, values.max]),
        [colors, values]
    )
    const getCellBorderColor = useInheritedColor(cellBorderColor, theme)
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)

    return {
        getIndex,
        xScale: scales.x,
        yScale: scales.y,
        ...layoutConfig,
        sizeScale,
        currentNode,
        setCurrentNode,
        colorScale,
        getCellBorderColor,
        getLabelTextColor,
    }
}
