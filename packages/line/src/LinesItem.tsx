import { memo, useMemo, AriaAttributes } from 'react'
import { animated } from '@react-spring/web'
import { useAnimatedPath } from '@nivo/core'
import { LineGenerator } from './types'

export const NonMemoizedLinesItem = ({
    lineGenerator,
    points,
    color,
    thickness,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaHidden,
    ariaDisabled,
}: {
    lineGenerator: LineGenerator
    points: { x: number; y: number }[]
    color: string
    thickness: number
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
    ariaHidden?: AriaAttributes['aria-hidden']
    ariaDisabled?: AriaAttributes['aria-disabled']
}) => {
    const path = useMemo(() => lineGenerator(points), [lineGenerator, points])
    const animatedPath = useAnimatedPath(path!)

    return (
        <animated.path
            d={animatedPath}
            fill="none"
            strokeWidth={thickness}
            stroke={color}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-hidden={ariaHidden}
            aria-disabled={ariaDisabled}
        />
    )
}

export const LinesItem = memo(NonMemoizedLinesItem) as typeof NonMemoizedLinesItem
