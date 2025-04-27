import { memo, useMemo } from 'react'
import { animated } from '@react-spring/web'
import { useAnimatedPath } from '@nivo/core'
import { LineGenerator } from './types'

export const NonMemoizedLinesItem = ({
    lineGenerator,
    points,
    color,
    thickness,
}: {
    lineGenerator: LineGenerator
    points: { x: number; y: number }[]
    color: string
    thickness: number
}) => {
    const path = useMemo(() => lineGenerator(points), [lineGenerator, points])
    const animatedPath = useAnimatedPath(path!)

    return <animated.path d={animatedPath} fill="none" strokeWidth={thickness} stroke={color} />
}

export const LinesItem = memo(NonMemoizedLinesItem) as typeof NonMemoizedLinesItem
