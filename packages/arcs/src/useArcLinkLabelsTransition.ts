import { SpringValue, useTransition, to } from 'react-spring'
import { line } from 'd3-shape'
import { useMotionConfig, useTheme } from '@nivo/core'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { DatumWithArcAndColor, Point } from './types'
import { computeArcLink } from './links'
import { useFilteredDataBySkipAngle } from './utils'
import { useMemo } from 'react'

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
    linkColor: string
    textColor: string
    opacity: number
}

const useTransitionPhases = <Datum extends DatumWithArcAndColor>({
    offset,
    diagonalLength,
    straightLength,
    getLinkColor,
    getTextColor,
}: Pick<AnimatedProps, 'offset' | 'diagonalLength' | 'straightLength'> & {
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
                linkColor: getLinkColor(d),
                textColor: getTextColor(d),
                opacity: 0,
            }),
        }),
        [diagonalLength, straightLength, getLinkColor, getTextColor]
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
    // textOffset,
    // label,
    linkColor,
    textColor,
}: {
    data: Datum[]
    offset?: number
    diagonalLength: number
    straightLength: number
    skipAngle?: number
    textOffset: number
    // @todo come up with proper typing for label accessors, probably in `core`
    label: any
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
    }
}
