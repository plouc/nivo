import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig, Margin } from '@nivo/core'
import {
    Cell,
    ComputedDatum,
    Datum,
    EmptyCell,
    CellAnimatedProps,
    HtmlCellComponent,
    TooltipComponent,
} from './types'
import { useMergeCellsData } from './hooks'

interface WaffleCellsHtmlProps<RawDatum extends Datum> {
    cells: EmptyCell[]
    computedData: ComputedDatum<RawDatum>[]
    cellComponent: HtmlCellComponent<RawDatum>
    cellSize: number
    margin: Margin
    origin: {
        x: number
        y: number
    }
    borderWidth: number
    getBorderColor: (cell: Cell<RawDatum>) => string
    testIdPrefix?: string
    isInteractive: boolean
    tooltip: TooltipComponent<RawDatum>
}

const getAnimatedCellProps =
    <RawDatum extends Datum>(origin: { x: number; y: number }, size: number) =>
    (cell: Cell<RawDatum>): CellAnimatedProps => ({
        x: origin.x + cell.x,
        y: origin.y + cell.y,
        fill: cell.color,
        size,
    })

export const WaffleCellsHtml = <RawDatum extends Datum>({
    cells: grid,
    computedData,
    cellComponent,
    cellSize,
    origin,
    borderWidth,
    getBorderColor,
    testIdPrefix,
    margin,
    isInteractive,
    tooltip,
}: WaffleCellsHtmlProps<RawDatum>) => {
    const { cells } = useMergeCellsData<RawDatum>(grid, computedData, cellSize)

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
        <div
            style={{
                position: 'absolute',
                top: margin.top,
                left: margin.left,
            }}
        >
            {transition((animatedProps, cell) => {
                return createElement(cellComponent, {
                    key: cell.key,
                    cell,
                    animatedProps,
                    borderWidth,
                    tooltip,
                    testIdPrefix,
                })
            })}
        </div>
    )
}
