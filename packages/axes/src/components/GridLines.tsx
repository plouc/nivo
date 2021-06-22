import { memo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { GridLine } from './GridLine'
import { Line } from '../types'

export const GridLines = memo(({ lines }: { lines: Line[] }) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<Line, Record<'opacity' | 'x1' | 'x2' | 'y1' | 'y2', number>>(
        lines,
        {
            keys: line => line.key,
            initial: line => ({
                opacity: 1,
                x1: line.x1,
                x2: line.x2,
                y1: line.y1,
                y2: line.y2,
            }),
            from: line => ({
                opacity: 0,
                x1: line.x1,
                x2: line.x2,
                y1: line.y1,
                y2: line.y2,
            }),
            enter: line => ({
                opacity: 1,
                x1: line.x1,
                x2: line.x2,
                y1: line.y1,
                y2: line.y2,
            }),
            update: line => ({
                opacity: 1,
                x1: line.x1,
                x2: line.x2,
                y1: line.y1,
                y2: line.y2,
            }),
            leave: {
                opacity: 0,
            },
            config: springConfig,
            immediate: !animate,
        }
    )

    return (
        <g>
            {transition((animatedProps, line) => (
                <GridLine {...line} key={line.key} animatedProps={animatedProps} />
            ))}
        </g>
    )
})
