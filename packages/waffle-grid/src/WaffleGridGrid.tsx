import { GridLines } from '@nivo/axes'
import { WaffleGridAxisDataX, WaffleGridAxisDataY } from './types'

interface WaffleGridGridProps {
    enableX: boolean
    xAxis: WaffleGridAxisDataX
    enableY: boolean
    yAxis: WaffleGridAxisDataY
}

export const WaffleGridGrid = ({ enableX, xAxis, enableY, yAxis }: WaffleGridGridProps) => {
    const xLines: any[] = []
    xAxis.ticks.forEach((tick, index) => {
        if (index === 0) {
            xLines.push({
                key: index,
                x1: tick.x,
                x2: tick.x,
                y1: xAxis.y1,
                y2: xAxis.y2,
            })
        }

        const x = tick.x + tick.width
        xLines.push({
            key: index + 1,
            x1: x,
            x2: x,
            y1: xAxis.y1,
            y2: xAxis.y2,
        })
    })

    const yLines: any[] = []
    yAxis.ticks.forEach((tick, index) => {
        if (index === 0) {
            yLines.push({
                key: index,
                x1: yAxis.x1,
                x2: yAxis.x2,
                y1: tick.y,
                y2: tick.y,
            })
        }

        const y = tick.y + tick.height
        yLines.push({
            key: index + 1,
            x1: yAxis.x1,
            x2: yAxis.x2,
            y1: y,
            y2: y,
        })
    })

    return (
        <g>
            {enableX && <GridLines lines={xLines} />}
            {enableY && <GridLines lines={yLines} />}
        </g>
    )
}
