import { createElement } from 'react'
import { Cell, Datum, WaffleSvgProps, CellComponent } from './types'
import { useAnimatedCells } from './hooks'

interface WaffleCellsProps<D extends Datum> {
    cells: Cell<D>[]
    cellComponent: CellComponent<D>
    padding: number
    borderWidth: number
    motionStagger: number
    testIdPrefix: WaffleSvgProps<D>['testIdPrefix']
}

export const WaffleCells = <D extends Datum>({
    cells,
    cellComponent,
    padding,
    borderWidth,
    motionStagger,
    testIdPrefix,
}: WaffleCellsProps<D>) => {
    const transition = useAnimatedCells<D>({
        cells,
        padding,
        motionStagger,
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
