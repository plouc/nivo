import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { Cell, Datum, CellAnimatedProps, WaffleSvgProps, CellComponent } from './types'

interface WaffleCellsProps<D extends Datum> {
    cells: Cell<D>[]
    cellComponent: CellComponent<D>
    padding: number
    borderWidth: number
    motionStagger: number
    testIdPrefix: WaffleSvgProps<D>['testIdPrefix']
}

const getAnimatedCellProps =
    <D extends Datum>(padding: number) =>
    (cell: Cell<D>): CellAnimatedProps => ({
        x: cell.x + padding / 2,
        y: cell.y + padding / 2,
        fill: cell.color,
        size: cell.width - padding,
    })

export const WaffleCells = <D extends Datum>({
    cells,
    cellComponent,
    padding,
    borderWidth,
    motionStagger,
    testIdPrefix,
}: WaffleCellsProps<D>) => {
    const { animate, config: springConfig } = useMotionConfig()
    const getProps = getAnimatedCellProps<D>(padding)
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
                    padding,
                    animatedProps,
                    borderWidth,
                    testIdPrefix,
                })
            })}
        </g>
    )
}
