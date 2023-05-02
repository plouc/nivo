import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig, Margin } from '@nivo/core'
import { Cell, Datum, CellAnimatedProps, CellComponent, HtmlProps } from './types'

interface WaffleCellsHtmlProps<D extends Datum> {
    cells: Cell<D>[]
    cellComponent: CellComponent<D>
    cellSize: number
    margin: Margin
    borderWidth: number
    testIdPrefix: HtmlProps<D>['testIdPrefix']
}

const getAnimatedCellProps =
    <D extends Datum>(size: number) =>
    (cell: Cell<D>): CellAnimatedProps => ({
        x: cell.x,
        y: cell.y,
        fill: cell.color,
        size,
    })

export const WaffleCellsHtml = <D extends Datum>({
    cells,
    cellComponent,
    cellSize,
    borderWidth,
    testIdPrefix,
    margin,
}: WaffleCellsHtmlProps<D>) => {
    const { animate, config: springConfig } = useMotionConfig()
    const getProps = getAnimatedCellProps<D>(cellSize)
    const transition = useTransition<Cell<D>, CellAnimatedProps>(cells, {
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
                    testIdPrefix,
                })
            })}
        </div>
    )
}
