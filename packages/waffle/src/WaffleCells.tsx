import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { Cell, Datum, CellAnimatedProps, SvgProps, CellComponent } from './types'

interface WaffleCellsProps<D extends Datum> {
    cells: Cell<D>[]
    cellComponent: CellComponent<D>
    cellSize: number
    borderWidth: number
    motionStagger: number
    testIdPrefix: SvgProps<D>['testIdPrefix']
}

const getAnimatedCellProps =
    <D extends Datum>(size: number) =>
    (cell: Cell<D>): CellAnimatedProps => ({
        x: cell.x,
        y: cell.y,
        fill: cell.color,
        size,
    })

export const WaffleCells = <D extends Datum>({
    cells,
    cellComponent,
    cellSize,
    borderWidth,
    motionStagger,
    testIdPrefix,
}: WaffleCellsProps<D>) => {
    const { animate, config: springConfig } = useMotionConfig()
    const getProps = getAnimatedCellProps<D>(cellSize)
    const transition = useTransition<Cell<D>, CellAnimatedProps>(cells, {
        keys: cell => cell.key,
        initial: getProps,
        // // from: getEndingAnimatedNodeProps,
        enter: getProps,
        update: getProps,
        // // leave: getEndingAnimatedNodeProps,
        trail: animate ? motionStagger : undefined,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <g>
            {transition((animatedProps, cell) => {
                return createElement(cellComponent, {
                    key: cell.key,
                    cell,
                    animatedProps,
                    borderWidth,
                    testIdPrefix,
                })
            })}
        </g>
    )
}
