/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { ComponentProps, FunctionComponent, ReactNode, useCallback, MouseEvent } from 'react'
import { partial } from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import { withContainer, Container, SvgWrapper, useDimensions, useMotionConfig } from '@nivo/core'
import { InheritedColor, OrdinalColorScale } from '@nivo/colors'
import { BoxLegendSvg, LegendProp } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { applyDataToGrid, isWaffleDataCell, WaffleCell, WaffleDataCell } from './compute'
// import WaffleCellTooltip from './WaffleCellTooltip'
import { useWaffle, WaffleDatum, WaffleFillDirection } from './hooks'
import { WaffleCell as WaffleCellComponent } from './WaffleCell'

interface WaffleProps extends ComponentProps<typeof Container> {
    width: number
    height: number
    margin?: {
        top?: number
        right?: number
        bottom?: number
        left?: number
    }
    data: WaffleDatum[]
    total: number
    hiddenIds: Array<string | number>
    rows: number
    columns: number
    fillDirection?: WaffleFillDirection
    padding?: number
    colors?: OrdinalColorScale<WaffleDatum>
    emptyColor?: string
    emptyOpacity: number
    borderWidth?: number
    borderColor?: InheritedColor
    // tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // tooltip: PropTypes.func,
    cellComponent?: FunctionComponent<any>
    legends: LegendProp[]
}

export const waffleDefaults = {
    fillDirection: 'bottom' as WaffleFillDirection,
    padding: 1,
    colors: { scheme: 'nivo' } as OrdinalColorScale<any>,
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 1]] } as InheritedColor,
    defs: [],
    fill: [],
}

const Waffle = ({
    width,
    height,
    margin: partialMargin,
    data,
    total,
    hiddenIds = [],
    rows,
    columns,
    fillDirection = waffleDefaults.fillDirection,
    padding = waffleDefaults.padding,
    colors = waffleDefaults.colors,
    emptyColor = waffleDefaults.emptyColor,
    emptyOpacity = waffleDefaults.emptyOpacity,
    borderWidth = waffleDefaults.borderWidth,
    borderColor = waffleDefaults.borderColor,
    cellComponent = WaffleCellComponent,
    legends,
}: WaffleProps) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )
    const { animate, springConfig } = useMotionConfig()

    const {
        grid,
        computedData,
        legendData,
        getBorderColor,
        setCurrentCell,
    } = useWaffle({
        width: innerWidth,
        height: innerHeight,
        data,
        total,
        hiddenIds,
        rows,
        columns,
        fillDirection,
        padding,
        colors,
        emptyColor,
        borderColor,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip() as any

    const handleCellHover = useCallback(
        (cell: WaffleCell | WaffleDataCell, event: MouseEvent) => {
            setCurrentCell(cell)

            if (isWaffleDataCell(cell)) {
                showTooltipFromEvent(cell.data.id, event)
            }
        },
        [setCurrentCell]
    )

    const handleCellLeave = useCallback(
        (cell: WaffleCell | WaffleDataCell, event: MouseEvent) => {
            setCurrentCell(null)
            hideTooltip()
        },
        [setCurrentCell, hideTooltip]
    )

    let renderedCells: ReactNode

    if (!animate) {
        const computedCells = applyDataToGrid(grid.cells, computedData)

        renderedCells = computedCells.map(cell => {
            return React.createElement(cellComponent, {
                key: cell.position,
                position: cell.position,
                size: grid.cellSize,
                x: cell.x,
                y: cell.y,
                color: cell.color,
                fill: isWaffleDataCell(cell) ? cell.data.fill : undefined,
                opacity: isWaffleDataCell(cell) ? 1 : emptyOpacity,
                borderWidth,
                borderColor: getBorderColor(cell),
                data: isWaffleDataCell(cell) ? cell.data : undefined,
                onHover: partial(handleCellHover, cell),
                onLeave: partial(handleCellLeave, cell),
                // onClick,
            })
        })
    } else {
        renderedCells = (
            <TransitionMotion
                styles={
                    computedData.map(datum => ({
                        key: datum.id,
                        data: datum,
                        style: {
                            startAt: spring(datum.startAt, springConfig),
                            endAt: spring(datum.endAt, springConfig),
                        },
                    })) as any
                }
            >
                {(interpolatedStyles: any) => {
                    const animatedComputedCells = applyDataToGrid(
                        grid.cells,
                        interpolatedStyles.map((s: any) => ({
                            ...s.data,
                            startAt: Math.round(s.style.startAt),
                            endAt: Math.round(s.style.endAt),
                        }))
                    )

                    return (
                        <>
                            {animatedComputedCells.map(cell => {
                                return React.createElement(cellComponent, {
                                    key: cell.position,
                                    position: cell.position,
                                    size: grid.cellSize,
                                    x: cell.x,
                                    y: cell.y,
                                    color: cell.color,
                                    fill: isWaffleDataCell(cell) ? cell.data.fill : undefined,
                                    opacity: isWaffleDataCell(cell) ? 1 : emptyOpacity,
                                    borderWidth,
                                    borderColor: getBorderColor(cell),
                                    data: isWaffleDataCell(cell) ? cell.data : undefined,
                                    onHover: partial(handleCellHover, cell),
                                    onLeave: partial(handleCellLeave, cell),
                                    // onClick,
                                })
                            })}
                        </>
                    )
                }}
            </TransitionMotion>
        )
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            <g transform={`translate(${grid.origin.x}, ${grid.origin.y})`}>{renderedCells}</g>
            {legends.map((legend, i) => (
                <BoxLegendSvg
                    key={i}
                    {...legend}
                    containerWidth={width}
                    containerHeight={height}
                    data={legendData}
                />
            ))}
        </SvgWrapper>
    )
}

export default withContainer(Waffle)

/*
export class Waffle extends Component {
    static propTypes = WafflePropTypes

    handleCellHover = (showTooltip, cell, event) => {
        const { setCurrentCell, theme, tooltipFormat, tooltip } = this.props

        setCurrentCell(cell)

        if (!cell.data) return

        showTooltip(
            <WaffleCellTooltip
                position={cell.position}
                row={cell.row}
                column={cell.column}
                color={cell.color}
                data={cell.data}
                theme={theme}
                tooltipFormat={tooltipFormat}
                tooltip={tooltip}
            />,
            event
        )
    }

    render() {
        const {
            hiddenIds,

            // dimensions
            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            // styling
            cellComponent,
            emptyColor,
            emptyOpacity,
            borderWidth,
            getBorderColor,
            theme,
            defs,

            // motion
            animate,
            motionStiffness,
            motionDamping,

            // interactivity
            isInteractive,
            onClick,

            // computed
            cells,
            cellSize,
            origin,
            computedData,
            legendData,

            legends,
        } = this.props

        cells.forEach(cell => {
            cell.color = emptyColor
        })

        return (
            <Container
                isInteractive={isInteractive}
                theme={theme}
                animate={animate}
                motionDamping={motionDamping}
                motionStiffness={motionStiffness}
            >
                {({ showTooltip, hideTooltip }) => {
                    const onHover = partial(this.handleCellHover, showTooltip)
                    const onLeave = partial(this.handleCellLeave, hideTooltip)

                    let cellsRender
                    if (animate === true) {
                        const springConfig = {
                            stiffness: motionStiffness,
                            damping: motionDamping,
                        }

                        cellsRender = (
                            <TransitionMotion
                                styles={computedData.map(datum => ({
                                    key: datum.id,
                                    data: datum,
                                    style: {
                                        startAt: spring(datum.startAt, springConfig),
                                        endAt: spring(datum.endAt, springConfig),
                                    },
                                }))}
                            >
                                {interpolatedStyles => {
                                    const computedCells = applyDataToGrid(
                                        cells,
                                        interpolatedStyles.map(s => ({
                                            ...s.data,
                                            startAt: Math.round(s.style.startAt),
                                            endAt: Math.round(s.style.endAt),
                                        })),
                                        hiddenIds
                                    )

                                    return (
                                        <>
                                            {computedCells.map(cell =>
                                                React.createElement(cellComponent, {
                                                    key: cell.position,
                                                    position: cell.position,
                                                    size: cellSize,
                                                    x: cell.x,
                                                    y: cell.y,
                                                    color: cell.color,
                                                    fill: cell.data && cell.data.fill,
                                                    opacity: cell.data ? 1 : emptyOpacity,
                                                    borderWidth,
                                                    borderColor: getBorderColor(cell),
                                                    data: cell.data,
                                                    onHover: partial(onHover, cell),
                                                    onLeave,
                                                    onClick,
                                                })
                                            )}
                                        </>
                                    )
                                }}
                            </TransitionMotion>
                        )
                    } else {
                        const computedCells = applyDataToGrid(cells, computedData, hiddenIds)

                        cellsRender = (
                            <>
                                {computedCells.map(cell =>
                                    React.createElement(cellComponent, {
                                        key: cell.position,
                                        position: cell.position,
                                        size: cellSize,
                                        x: cell.x,
                                        y: cell.y,
                                        color: cell.color,
                                        fill: cell.data && cell.data.fill,
                                        opacity: cell.data ? 1 : emptyOpacity,
                                        borderWidth,
                                        borderColor: getBorderColor(cell),
                                        data: cell.data,
                                        onHover: partial(onHover, cell),
                                        onLeave,
                                        onClick,
                                    })
                                )}
                            </>
                        )
                    }

                    return (
                        <SvgWrapper
                            width={outerWidth}
                            height={outerHeight}
                            margin={margin}
                            defs={defs}
                            theme={theme}
                        >
                            <g transform={`translate(${origin.x}, ${origin.y})`}>{cellsRender}</g>
                            {legends.map((legend, i) => (
                                <BoxLegendSvg
                                    key={i}
                                    {...legend}
                                    containerWidth={width}
                                    containerHeight={height}
                                    data={legendData}
                                    theme={theme}
                                />
                            ))}
                        </SvgWrapper>
                    )
                }}
            </Container>
        )
    }
}

export default withContainer(enhance(Waffle))
*/
