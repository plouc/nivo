import { createElement } from 'react'
import { Margin } from '@nivo/core'
import { Cell, Datum, CellComponent, WaffleHtmlProps } from './types'
import { useAnimatedCells } from './hooks'

interface WaffleCellsHtmlProps<D extends Datum> {
    cells: Cell<D>[]
    cellComponent: CellComponent<D>
    padding: number
    margin: Margin
    borderRadius: number
    borderWidth: number
    motionStagger: number
    testIdPrefix: WaffleHtmlProps<D>['testIdPrefix']
}

export const WaffleCellsHtml = <D extends Datum>({
    cells,
    cellComponent,
    padding,
    borderRadius,
    borderWidth,
    motionStagger,
    testIdPrefix,
    margin,
}: WaffleCellsHtmlProps<D>) => {
    const transition = useAnimatedCells<D>({
        cells,
        padding,
        motionStagger,
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
                    borderRadius,
                    borderWidth,
                    testIdPrefix,
                })
            })}
        </div>
    )
}
