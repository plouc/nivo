/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback } from 'react'
import { SvgWrapper, withContainer, useDimensions } from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { useTooltip } from '@nivo/tooltip'
import { HeatMapPropTypes, HeatMapDefaultProps } from './props'
import { useHeatMap } from './hooks'
import HeatMapCells from './HeatMapCells'
import HeatMapCellRect from './HeatMapCellRect'
import HeatMapCellCircle from './HeatMapCellCircle'
import HeatMapCellTooltip from './HeatMapCellTooltip'

const HeatMap = ({
    data,
    keys,
    indexBy,
    minValue,
    maxValue,
    width,
    height,
    margin: partialMargin,
    forceSquare,
    padding,
    sizeVariation,
    cellShape,
    cellOpacity,
    cellBorderWidth,
    cellBorderColor,
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX,
    enableGridY,
    enableLabels,
    labelTextColor,
    colors,
    nanColor,
    isInteractive,
    onClick,
    hoverTarget,
    cellHoverOpacity,
    cellHoverOthersOpacity,
    tooltipFormat,
    tooltip,
}) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        cells,
        xScale,
        yScale,
        offsetX,
        offsetY,
        setCurrentCellId,
        getCellBorderColor,
        getLabelTextColor,
    } = useHeatMap({
        data,
        keys,
        indexBy,
        minValue,
        maxValue,
        width: innerWidth,
        height: innerHeight,
        padding,
        forceSquare,
        sizeVariation,
        colors,
        nanColor,
        cellOpacity,
        cellBorderColor,
        labelTextColor,
        hoverTarget,
        cellHoverOpacity,
        cellHoverOthersOpacity,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleCellHover = useCallback(
        (cell, event) => {
            setCurrentCellId(cell.id)
            showTooltipFromEvent(
                <HeatMapCellTooltip cell={cell} format={tooltipFormat} tooltip={tooltip} />,
                event
            )
        },
        [setCurrentCellId, showTooltipFromEvent, tooltipFormat, tooltip]
    )

    const handleCellLeave = useCallback(() => {
        setCurrentCellId(null)
        hideTooltip()
    }, [setCurrentCellId, hideTooltip])

    let cellComponent
    if (cellShape === 'rect') {
        cellComponent = HeatMapCellRect
    } else if (cellShape === 'circle') {
        cellComponent = HeatMapCellCircle
    } else {
        cellComponent = cellShape
    }

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={Object.assign({}, margin, {
                top: margin.top + offsetY,
                left: margin.left + offsetX,
            })}
        >
            <Grid
                width={innerWidth - offsetX * 2}
                height={innerHeight - offsetY * 2}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
            />
            <Axes
                xScale={xScale}
                yScale={yScale}
                width={innerWidth - offsetX * 2}
                height={innerHeight - offsetY * 2}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
            <HeatMapCells
                cells={cells}
                cellComponent={cellComponent}
                cellBorderWidth={cellBorderWidth}
                getCellBorderColor={getCellBorderColor}
                enableLabels={enableLabels}
                getLabelTextColor={getLabelTextColor}
                handleCellHover={isInteractive ? handleCellHover : undefined}
                handleCellLeave={isInteractive ? handleCellLeave : undefined}
                onClick={isInteractive ? onClick : undefined}
            />
        </SvgWrapper>
    )
}

HeatMap.propTypes = HeatMapPropTypes

const WrappedHeatMap = withContainer(HeatMap)
WrappedHeatMap.defaultProps = HeatMapDefaultProps

export default WrappedHeatMap
