import { useMemo } from 'react'
import { SpringValue, useTransition, to } from 'react-spring'
import { line } from 'd3-shape'
import { useMotionConfig, useTheme } from '@nivo/core'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { DatumWithArcAndColor, Point } from '../types'
import { useFilteredDataBySkipAngle } from '../utils'
import { computeArcLink, computeArcLinkTextAnchor } from './compute'

const lineGenerator = line<Point>()
    .x(d => d.x)
    .y(d => d.y)

type AnimatedProps = {
    startAngle: number
    endAngle: number
    innerRadius: number
    outerRadius: number
    offset: number
    diagonalLength: number
    straightLength: number
    textOffset: number
    linkColor: string
    textColor: string
    opacity: number
}

const useTransitionPhases = <Datum extends DatumWithArcAndColor>({
    offset,
    diagonalLength,
    straightLength,
    textOffset,
    getLinkColor,
    getTextColor,
}: Pick<AnimatedProps, 'offset' | 'diagonalLength' | 'straightLength' | 'textOffset'> & {
    getLinkColor: (datum: Datum) => string
    getTextColor: (datum: Datum) => string
}): Record<'enter' | 'update' | 'leave', (datum: Datum) => AnimatedProps> =>
    useMemo(
        () => ({
            enter: (datum: Datum) => ({
                startAngle: datum.arc.startAngle,
                endAngle: datum.arc.endAngle,
                innerRadius: datum.arc.innerRadius,
                outerRadius: datum.arc.outerRadius,
                offset,
                diagonalLength: 0,
                straightLength: 0,
                textOffset,
                linkColor: getLinkColor(datum),
                textColor: getTextColor(datum),
                opacity: 0,
            }),
            update: (d: Datum) => ({
                startAngle: d.arc.startAngle,
                endAngle: d.arc.endAngle,
                innerRadius: d.arc.innerRadius,
                outerRadius: d.arc.outerRadius,
                offset,
                diagonalLength,
                straightLength,
                textOffset,
                linkColor: getLinkColor(d),
                textColor: getTextColor(d),
                opacity: 1,
            }),
            leave: (d: Datum) => ({
                startAngle: d.arc.startAngle,
                endAngle: d.arc.endAngle,
                innerRadius: d.arc.innerRadius,
                outerRadius: d.arc.outerRadius,
                offset,
                diagonalLength: 0,
                straightLength: 0,
                textOffset,
                linkColor: getLinkColor(d),
                textColor: getTextColor(d),
                opacity: 0,
            }),
        }),
        [diagonalLength, straightLength, textOffset, getLinkColor, getTextColor]
    )

const interpolateLink = (
    startAngleValue: SpringValue<AnimatedProps['startAngle']>,
    endAngleValue: SpringValue<AnimatedProps['endAngle']>,
    innerRadiusValue: SpringValue<AnimatedProps['innerRadius']>,
    outerRadiusValue: SpringValue<AnimatedProps['outerRadius']>,
    offsetValue: SpringValue<AnimatedProps['offset']>,
    diagonalLengthValue: SpringValue<AnimatedProps['diagonalLength']>,
    straightLengthValue: SpringValue<AnimatedProps['straightLength']>
) =>
    to(
        [
            startAngleValue,
            endAngleValue,
            innerRadiusValue,
            outerRadiusValue,
            offsetValue,
            diagonalLengthValue,
            straightLengthValue,
        ],
        (
            startAngle,
            endAngle,
            innerRadius,
            outerRadius,
            offset,
            diagonalLengthAnimated,
            straightLengthAnimated
        ) => {
            const { points } = computeArcLink(
                {
                    startAngle,
                    endAngle,
                    innerRadius,
                    outerRadius,
                },
                offset,
                diagonalLengthAnimated,
                straightLengthAnimated
            )

            return lineGenerator(points)
        }
    )

const interpolateTextAnchor = (
    startAngleValue: SpringValue<AnimatedProps['startAngle']>,
    endAngleValue: SpringValue<AnimatedProps['endAngle']>,
    innerRadiusValue: SpringValue<AnimatedProps['innerRadius']>,
    outerRadiusValue: SpringValue<AnimatedProps['outerRadius']>
) =>
    to(
        [startAngleValue, endAngleValue, innerRadiusValue, outerRadiusValue],
        (startAngle, endAngle, innerRadius, outerRadius) => {
            return computeArcLinkTextAnchor({
                startAngle,
                endAngle,
                innerRadius,
                outerRadius,
            })
        }
    )

/**
 * Interpolating the text position involves almost the same computation
 * as `interpolateLink`, unfortunately `react-spring` does not support
 * multiple output values from a single interpolation.
 *
 * We should revise this if `react-spring` adds this feature at some point.
 */
const interpolateTextPosition = (
    startAngleValue: SpringValue<AnimatedProps['startAngle']>,
    endAngleValue: SpringValue<AnimatedProps['endAngle']>,
    innerRadiusValue: SpringValue<AnimatedProps['innerRadius']>,
    outerRadiusValue: SpringValue<AnimatedProps['outerRadius']>,
    offsetValue: SpringValue<AnimatedProps['offset']>,
    diagonalLengthValue: SpringValue<AnimatedProps['diagonalLength']>,
    straightLengthValue: SpringValue<AnimatedProps['straightLength']>,
    textOffsetValue: SpringValue<AnimatedProps['textOffset']>
) =>
    to(
        [
            startAngleValue,
            endAngleValue,
            innerRadiusValue,
            outerRadiusValue,
            offsetValue,
            diagonalLengthValue,
            straightLengthValue,
            textOffsetValue,
        ],
        (
            startAngle,
            endAngle,
            innerRadius,
            outerRadius,
            offset,
            diagonalLengthAnimated,
            straightLengthAnimated,
            textOffset
        ) => {
            const { points, side } = computeArcLink(
                {
                    startAngle,
                    endAngle,
                    innerRadius,
                    outerRadius,
                },
                offset,
                diagonalLengthAnimated,
                straightLengthAnimated
            )

            const position = points[2]
            if (side === 'before') {
                position.x -= textOffset
            } else {
                position.x += textOffset
            }

            return `translate(${position.x},${position.y})`
        }
    )

/**
 * This hook can be used to animate a group of arc link labels,
 * if you just want to compute the labels, please use `useArcLinkLabels`.
 */
export const useArcLinkLabelsTransition = <Datum extends DatumWithArcAndColor>({
    data,
    offset = 0,
    diagonalLength,
    straightLength,
    skipAngle = 0,
    textOffset,
    linkColor,
    textColor,
}: {
    data: Datum[]
    offset?: number
    diagonalLength: number
    straightLength: number
    skipAngle?: number
    textOffset: number
    linkColor: InheritedColorConfig<Datum>
    textColor: InheritedColorConfig<Datum>
}) => {
    const { animate, config: springConfig } = useMotionConfig()

    const theme = useTheme()
    const getLinkColor = useInheritedColor<Datum>(linkColor, theme)
    const getTextColor = useInheritedColor<Datum>(textColor, theme)

    const filteredData = useFilteredDataBySkipAngle<Datum>(data, skipAngle)
    const transitionPhases = useTransitionPhases<Datum>({
        offset,
        diagonalLength,
        straightLength,
        textOffset,
        getLinkColor,
        getTextColor,
    })

    const transition = useTransition<Datum, AnimatedProps>(filteredData, {
        key: datum => datum.id,
        initial: transitionPhases.update,
        from: transitionPhases.enter,
        enter: transitionPhases.update,
        update: transitionPhases.update,
        leave: transitionPhases.leave,
        config: springConfig,
        immediate: !animate,
    })

    return {
        transition,
        interpolateLink,
        interpolateTextAnchor,
        interpolateTextPosition,
    }
}
