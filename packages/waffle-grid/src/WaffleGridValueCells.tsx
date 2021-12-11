import { createElement } from 'react'
import { useTransition, config } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { WaffleGridCellData, WaffleGridCellComponent } from './types'

export const WaffleGridValueCells = ({
    cells,
    cellComponent,
}: {
    cells: WaffleGridCellData[]
    cellComponent: WaffleGridCellComponent
}) => {
    const { animate, config: defaultSpringConfig } = useMotionConfig()

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
        from: cell => ({
            x: cell.x + cell.size / 2 - Math.random() * 200,
            y: cell.y + cell.size / 2 - Math.random() * 200,
            radius: cell.size / 2,
            color: cell.color,
            opacity: 0,
        }),
        enter: cell => ({
            x: cell.x + cell.size / 2,
            y: cell.y + cell.size / 2,
            radius: cell.size / 2,
            color: cell.color,
            opacity: 1,
        }),
        update: cell => ({
            x: cell.x + cell.size / 2,
            y: cell.y + cell.size / 2,
            radius: cell.size / 2,
            color: cell.color,
            opacity: 1,
        }),
        leave: cell => ({
            x: cell.x + cell.size / 2 + Math.random() * 200,
            y: cell.y + cell.size / 2 + Math.random() * 200,
            radius: cell.size / 2,
            color: cell.color,
            opacity: 0,
        }),
        trail: animate ? 2 : undefined,
        config: config.gentle,
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
