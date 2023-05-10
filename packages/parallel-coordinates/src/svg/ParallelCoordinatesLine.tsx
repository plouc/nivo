import { useCallback, MouseEvent, createElement } from 'react'
import { Line } from 'd3-shape'
import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import {
    BaseDatum,
    ComputedDatum,
    Variable,
    TooltipComponent,
    DatumGroupKeys,
    IfGrouped,
    ComputedGroupDatum,
} from '../types'

export const ParallelCoordinatesLine = <
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined
>({
    datum,
    variables,
    lineGenerator,
    lineWidth,
    opacity,
    tooltip,
    testIdPrefix,
}: {
    datum: IfGrouped<Datum, GroupBy, ComputedGroupDatum<Datum>, ComputedDatum<Datum>>
    variables: readonly Variable<Datum>[]
    lineGenerator: Line<[number, number]>
    lineWidth: number
    opacity: number
    tooltip: TooltipComponent<Datum, GroupBy>
    testIdPrefix?: string
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const handleMouseHover = useCallback(
        (event: MouseEvent<SVGPathElement>) => {
            showTooltipFromEvent(createElement(tooltip, { datum, variables }), event)
        },
        [showTooltipFromEvent, datum, variables]
    )

    const { animate, config: springConfig } = useMotionConfig()
    const animatedPath = useAnimatedPath(lineGenerator(datum.points)!)
    const animatedProps = useSpring({
        color: datum.color,
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
            data-test-id={testIdPrefix ? `${testIdPrefix}.line_${datum.id}` : undefined}
        />
    )
}
