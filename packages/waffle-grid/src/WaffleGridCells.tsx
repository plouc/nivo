import { createElement, useMemo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig, useSpringConfig } from '@nivo/core'
import { WaffleGridCellData, WaffleGridCellComponent, WaffleGridCellsMotion } from './types'
import { svgDefaultProps } from './defaults'

type WaffleGridCellsProps = {
    cells: WaffleGridCellData[]
    cellComponent: WaffleGridCellComponent
} & Partial<WaffleGridCellsMotion>

export const WaffleGridCells = ({
    cells,
    cellComponent,
    config: motionConfig,
    staggeredDelay = svgDefaultProps.cellsMotionStaggeredDelay,
    positionOffsetIn = svgDefaultProps.cellsMotionPositionOffsetIn,
    randomizePositionOffsetIn = svgDefaultProps.cellsMotionRandomizePositionOffsetIn,
    positionOffsetOut = svgDefaultProps.cellsMotionPositionOffsetOut,
    randomizePositionOffsetOut = svgDefaultProps.cellsMotionRandomizePositionOffsetOut,
}: WaffleGridCellsProps) => {
    const { animate, config: defaultSpringConfig } = useMotionConfig()
    const springConfig = useSpringConfig(motionConfig || defaultSpringConfig)

    const transitionIn = useMemo(() => {
        const getOffset = getOffsetFunction(randomizePositionOffsetIn)

        return (cell: WaffleGridCellData) => ({
            x: cell.x + cell.size / 2 + getOffset(positionOffsetIn[0]),
            y: cell.y + cell.size / 2 + getOffset(positionOffsetIn[1]),
            radius: cell.size / 2,
            color: cell.color,
            opacity: 0,
        })
    }, [positionOffsetIn, randomizePositionOffsetIn])

    const transitionOut = useMemo(() => {
        const getOffset = getOffsetFunction(randomizePositionOffsetOut)

        return (cell: WaffleGridCellData) => ({
            x: cell.x + cell.size / 2 + getOffset(positionOffsetOut[0]),
            y: cell.y + cell.size / 2 + getOffset(positionOffsetOut[1]),
            radius: cell.size / 2,
            color: cell.color,
            opacity: 0,
        })
    }, [positionOffsetIn, randomizePositionOffsetOut])

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
        from: transitionIn,
        enter: finalTransition,
        update: finalTransition,
        leave: transitionOut,
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

const getOffsetFunction = (randomize: boolean) => {
    if (!randomize) return (offset: number) => offset
    return (offset: number) => Math.random() * offset
}

const finalTransition = (cell: WaffleGridCellData) => ({
    x: cell.x + cell.size / 2,
    y: cell.y + cell.size / 2,
    radius: cell.size / 2,
    color: cell.color,
    opacity: 1,
})
