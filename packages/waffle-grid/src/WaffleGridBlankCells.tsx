import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig, useSpringConfig } from '@nivo/core'
import { WaffleGridCellData, WaffleGridCellComponent, WaffleGridSvgProps } from './types'

export const WaffleGridBlankCells = ({
    cells,
    cellComponent,
    motionConfig,
    staggeredDelay,
}: {
    cells: WaffleGridCellData[]
    cellComponent: WaffleGridCellComponent
    motionConfig: WaffleGridSvgProps['blankCellsMotionConfig']
    staggeredDelay: number
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
        keys: cell => cell.key,
        from: inOutTransition,
        enter: finalTransition,
        update: finalTransition,
        leave: inOutTransition,
        trail: animate ? staggeredDelay : undefined,
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

const inOutTransition = (cell: WaffleGridCellData) => ({
    x: cell.x + cell.size / 2,
    y: cell.y + cell.size / 2,
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
