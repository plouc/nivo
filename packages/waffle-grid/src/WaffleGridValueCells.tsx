import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig, useSpringConfig } from '@nivo/core'
import { WaffleGridCellData, WaffleGridCellComponent, WaffleGridSvgProps } from './types'

export const WaffleGridValueCells = ({
    cells,
    cellComponent,
    motionConfig,
}: {
    cells: WaffleGridCellData[]
    cellComponent: WaffleGridCellComponent
    motionConfig: WaffleGridSvgProps['valueCellsMotionConfig']
}) => {
    const { animate, config: defaultSpringConfig } = useMotionConfig()
    const springConfig = useSpringConfig(motionConfig || defaultSpringConfig)

    const transitions = useTransition<
        WaffleGridCellData,
        {
            x: number
            y: number
            radius: number
            color: string
            opacity: number
        }
    >(cells, {
        keys: cell => cell.index,
        from: inTransition,
        enter: finalTransition,
        update: finalTransition,
        leave: outTransition,
        trail: animate ? 2 : undefined,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transitions((style, cell) =>
                createElement(cellComponent, {
                    cell,
                    style,
                })
            )}
        </>
    )
}

const inTransition = (cell: WaffleGridCellData) => ({
    x: cell.x + cell.size / 2 - Math.random() * 200,
    y: cell.y + cell.size / 2 - Math.random() * 200,
    radius: cell.size / 2,
    color: cell.color,
    opacity: 0,
})
const finalTransition = (cell: WaffleGridCellData) => ({
    x: cell.x + cell.size / 2,
    y: cell.y + cell.size / 2,
    radius: cell.size / 2,
    color: cell.color,
    opacity: 1,
})
const outTransition = (cell: WaffleGridCellData) => ({
    x: cell.x + cell.size / 2 + Math.random() * 200,
    y: cell.y + cell.size / 2 + Math.random() * 200,
    radius: cell.size / 2,
    color: cell.color,
    opacity: 0,
})
