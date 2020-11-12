import { animated } from '@react-spring/web'
// @ts-ignore
// import { useMotionConfig } from '@nivo/core'
import { Cell, ComputedDatum, Datum, EmptyCell } from './types'
import { useMergeCellsData } from './hooks'

interface CellsSvgProps<RawDatum extends Datum> {
    cells: EmptyCell[]
    computedData: ComputedDatum<RawDatum>[]
    cellSize: number
    origin: {
        x: number
        y: number
    }
    borderWidth: number
    getBorderColor: (cell: Cell<RawDatum>) => string
}

export const CellsSvg = <RawDatum extends Datum>({
    cells,
    computedData,
    cellSize,
    origin,
    borderWidth,
    getBorderColor,
}: CellsSvgProps<RawDatum>) => {
    const mergedCells = useMergeCellsData<RawDatum>(cells, computedData)

    return (
        <g>
            {mergedCells.map(cell => {
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
            })}
        </g>
    )
}
