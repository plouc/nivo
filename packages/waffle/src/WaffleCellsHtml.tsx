import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig, Margin } from '@nivo/core'
import { Cell, Datum, CellAnimatedProps, CellComponent, WaffleHtmlProps } from './types'

interface WaffleCellsHtmlProps<D extends Datum> {
    cells: Cell<D>[]
    cellComponent: CellComponent<D>
    padding: number
    margin: Margin
    borderWidth: number
    motionStagger: number
    testIdPrefix: WaffleHtmlProps<D>['testIdPrefix']
}

const getAnimatedCellProps =
    <D extends Datum>(padding: number) =>
    (cell: Cell<D>): CellAnimatedProps => ({
        x: cell.x + padding / 2,
        y: cell.y + padding / 2,
        fill: cell.color,
        size: cell.width - padding,
        opacity: cell.opacity,
    })

export const WaffleCellsHtml = <D extends Datum>({
    cells,
    cellComponent,
    padding,
    borderWidth,
    motionStagger,
    testIdPrefix,
    margin,
}: WaffleCellsHtmlProps<D>) => {
    const { animate, config: springConfig } = useMotionConfig()
    const getProps = getAnimatedCellProps<D>(padding)
    const transition = useTransition<Cell<D>, CellAnimatedProps>(cells, {
        keys: cell => cell.key,
        initial: getProps,
        // from: getEndingAnimatedNodeProps,
        enter: getProps,
        update: getProps,
        // leave: getEndingAnimatedNodeProps,
        trail: animate ? motionStagger : undefined,
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
                    padding,
                    animatedProps,
                    borderWidth,
                    testIdPrefix,
                })
            })}
        </div>
    )
}
