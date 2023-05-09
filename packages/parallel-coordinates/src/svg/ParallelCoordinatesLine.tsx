import { useCallback, MouseEvent } from 'react'
import { Line } from 'd3-shape'
import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { ParallelCoordinatesLineTooltip } from '../ParallelCoordinatesLineTooltip'
import { BaseDatum, ComputedDatum, Variable } from '../types'

export const ParallelCoordinatesLine = <Datum extends BaseDatum>({
    data,
    variables,
    lineGenerator,
    lineWidth,
    opacity,
    testIdPrefix,
}: {
    data: ComputedDatum<Datum>
    variables: readonly Variable<Datum>[]
    lineGenerator: Line<[number, number]>
    lineWidth: number
    opacity: number
    testIdPrefix?: string
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const handleMouseHover = useCallback(
        (event: MouseEvent<SVGPathElement>) => {
            showTooltipFromEvent(
                <ParallelCoordinatesLineTooltip<Datum> data={data} variables={variables} />,
                event
            )
        },
        [showTooltipFromEvent, data, variables]
    )

    const { animate, config: springConfig } = useMotionConfig()
    const animatedPath = useAnimatedPath(lineGenerator(data.points)!)
    const animatedProps = useSpring({
        color: data.color,
        opacity,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            d={animatedPath}
            stroke={animatedProps.color}
            strokeWidth={lineWidth}
            strokeLinecap="round"
            opacity={animatedProps.opacity}
            fill="none"
            onMouseEnter={handleMouseHover}
            onMouseMove={handleMouseHover}
            onMouseLeave={hideTooltip}
            data-test-id={testIdPrefix ? `${testIdPrefix}.line_${data.id}` : undefined}
        />
    )
}
