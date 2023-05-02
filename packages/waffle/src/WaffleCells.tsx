import { createElement, useMemo, Fragment } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { line as d3Line, curveLinearClosed } from 'd3-shape'
import {
    Cell,
    ComputedDatum,
    Datum,
    EmptyCell,
    CellAnimatedProps,
    SvgProps,
    CellComponent,
} from './types'
import { useMergeCellsData } from './hooks'

interface WaffleCellsProps<RawDatum extends Datum> {
    cells: EmptyCell[]
    computedData: ComputedDatum<RawDatum>[]
    cellComponent: CellComponent<RawDatum>
    cellSize: number
    origin: {
        x: number
        y: number
    }
    borderWidth: number
    getBorderColor: (cell: Cell<RawDatum>) => string
    testIdPrefix: SvgProps<RawDatum>['testIdPrefix']
}

const getAnimatedCellProps =
    <RawDatum extends Datum>(origin: { x: number; y: number }, size: number) =>
    (cell: Cell<RawDatum>): CellAnimatedProps => ({
        x: origin.x + cell.x,
        y: origin.y + cell.y,
        fill: cell.color,
        size,
    })

export const WaffleCells = <RawDatum extends Datum>({
    cells: grid,
    computedData,
    cellComponent,
    cellSize,
    origin,
    borderWidth,
    getBorderColor,
    testIdPrefix,
}: WaffleCellsProps<RawDatum>) => {
    const { cells, polygons } = useMergeCellsData<RawDatum>(grid, computedData, cellSize)

    const line = useMemo(
        () =>
            d3Line()
                .x(point => origin.x + point[0])
                .y(point => origin.y + point[1])
                .curve(curveLinearClosed),
        [origin]
    )

    const { animate, config: springConfig } = useMotionConfig()
    const getProps = getAnimatedCellProps(origin, cellSize)
    const transition = useTransition<Cell<Datum>, CellAnimatedProps>(cells, {
        keys: cell => cell.key,
        initial: getProps,
        // from: getEndingAnimatedNodeProps,
        enter: getProps,
        update: getProps,
        // leave: getEndingAnimatedNodeProps,
        trail: animate ? 20 : undefined,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <g>
            {/*mergedCells.map(cell => {
                return (
                    <animated.rect
                        key={cell.position}
                        x={cell.x + origin.x}
                        y={cell.y + origin.y}
                        //opacity={cell.opacity}
                        width={cellSize}
                        height={cellSize}
                        fill={cell.color}
                        stroke={getBorderColor(cell)}
                        strokeWidth={borderWidth}
                    />
                )
            })*/}
            {transition((animatedProps, cell) => {
                return createElement(cellComponent, {
                    key: cell.key,
                    cell,
                    animatedProps,
                    borderWidth,
                    testIdPrefix,
                })
            })}
            {polygons.map(polygon => (
                <Fragment key={polygon.id}>
                    {polygon.polygons.map((polygon, index) => (
                        <path
                            key={index}
                            d={line(polygon)!}
                            fill="#000000"
                            fillOpacity={0.3}
                            stroke="black"
                        />
                    ))}
                </Fragment>
            ))}
        </g>
    )
}
