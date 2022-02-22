import { memo, useMemo } from 'react'
import { animated } from '@react-spring/web'
import { useAnimatedPath } from '@nivo/core'
import { LineDatum, LineGenerator, LinePointDatum } from './types'

const NonMemoizedLinesItem = <Datum extends LineDatum>({
    lineGenerator,
    points,
    color,
    thickness,
}: {
    lineGenerator: LineGenerator<Datum>
    points: LinePointDatum<Datum>[]
    color: string
    thickness: number
}) => {
    const path = useMemo(() => lineGenerator(points), [lineGenerator, points])
    const animatedPath = useAnimatedPath(path!)

    return <animated.path d={animatedPath} fill="none" strokeWidth={thickness} stroke={color} />
}

export const LinesItem = memo(NonMemoizedLinesItem) as typeof NonMemoizedLinesItem
