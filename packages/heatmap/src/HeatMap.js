/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { SvgWrapper, withContainer, useTheme, useDimensions } from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { useTooltip } from '@nivo/tooltip'
import { HeatMapPropTypes, HeatMapDefaultProps } from './props'
import { useHeatMap } from './hooks'
import computeNodes from './computeNodes'
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
    const theme = useTheme()

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleNodeHover = (node, event) => {
        setCurrentNode(node)
        showTooltipFromEvent(
            <HeatMapCellTooltip
                node={node}
                theme={theme}
                format={tooltipFormat}
                tooltip={tooltip}
            />,
            event
        )
    }

    const handleNodeLeave = () => {
        setCurrentNode(null)
        hideTooltip()
    }

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        getIndex,
        xScale,
        yScale,
        cellWidth,
        cellHeight,
        offsetX,
        offsetY,
        sizeScale,
        currentNode,
        setCurrentNode,
        colorScale,
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
        cellBorderColor,
        labelTextColor,
    })

    let cellComponent
    if (cellShape === 'rect') {
        cellComponent = HeatMapCellRect
    } else if (cellShape === 'circle') {
        cellComponent = HeatMapCellCircle
    } else {
        cellComponent = cellShape
    }

    const nodes = computeNodes({
        data,
        keys,
        getIndex,
        xScale,
        yScale,
        sizeScale,
        cellOpacity,
        cellWidth,
        cellHeight,
        colorScale,
        nanColor,
        getLabelTextColor,
        currentNode,
        hoverTarget,
        cellHoverOpacity,
        cellHoverOthersOpacity,
    })

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
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
            <HeatMapCells
                nodes={nodes}
                cellComponent={cellComponent}
                cellBorderWidth={cellBorderWidth}
                getCellBorderColor={getCellBorderColor}
                enableLabels={enableLabels}
                getLabelTextColor={getLabelTextColor}
                handleNodeHover={handleNodeHover}
                handleNodeLeave={handleNodeLeave}
                onClick={onClick}
            />
        </SvgWrapper>
    )
}

HeatMap.propTypes = HeatMapPropTypes

const WrappedHeatMap = withContainer(HeatMap)
WrappedHeatMap.defaultProps = HeatMapDefaultProps

export default WrappedHeatMap
