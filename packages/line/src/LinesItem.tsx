import { memo, useMemo } from 'react'
import { animated } from '@react-spring/web'
import { useAnimatedPath } from '@nivo/core'
import { LineGenerator, PointPosition } from './types'

interface LinesItemProps {
    points: readonly PointPosition[]
    lineGenerator: LineGenerator
    color: string
    thickness: number
}

const NonMemoizedLinesItem = ({ lineGenerator, points, color, thickness }: LinesItemProps) => {
    const path = useMemo(() => lineGenerator(points), [lineGenerator, points])
    const animatedPath = useAnimatedPath(path!)

    return <animated.path d={animatedPath} fill="none" strokeWidth={thickness} stroke={color} />
}

export const LinesItem = memo(NonMemoizedLinesItem)
