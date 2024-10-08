import { memo, useMemo } from 'react'
import { animated } from '@react-spring/web'
import { useAnimatedPath } from '@nivo/core'

const LinesItem = ({ lineGenerator, points, color, thickness }) => {
    const path = useMemo(() => lineGenerator(points), [lineGenerator, points])
    const animatedPath = useAnimatedPath(path)

    return <animated.path d={animatedPath} fill="none" strokeWidth={thickness} stroke={color} />
}

export default memo(LinesItem)
