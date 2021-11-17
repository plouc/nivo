import { useMemo } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import { arc as d3Arc } from 'd3-shape'
import { degreesToRadians, useValueFormatter } from '@nivo/core'
import { Arc } from '@nivo/arcs'
import { useOrdinalColorScale } from '@nivo/colors'
import { castLinearScale, castBandScale, getScaleTicks } from '@nivo/scales'
import { commonDefaultProps, svgDefaultProps } from './props'
import {
    ComputedBar,
    RadialBarCommonProps,
    RadialBarDataProps,
    RadialBarCustomLayerProps,
    RadialBarTrackDatum,
    RadialBarDatum,
} from './types'

interface RadialBarGroup<D extends RadialBarDatum> {
    id: string
    total: number
    data: D[]
}

export const useRadialBar = <D extends RadialBarDatum = RadialBarDatum>({
    data,
    maxValue: maxValueDirective = svgDefaultProps.maxValue,
    valueFormat,
    startAngle = commonDefaultProps.startAngle,
    endAngle = commonDefaultProps.endAngle,
    innerRadiusRatio = commonDefaultProps.innerRadius,
    padding = commonDefaultProps.padding,
    padAngle = commonDefaultProps.padAngle,
    cornerRadius = commonDefaultProps.cornerRadius,
    width,
    height,
    colors = commonDefaultProps.colors,
    tracksColor = commonDefaultProps.tracksColor,
}: {
    data: RadialBarDataProps<D>['data']
    maxValue: RadialBarCommonProps<D>['maxValue']
    valueFormat?: RadialBarCommonProps<D>['valueFormat']
    startAngle: RadialBarCommonProps<D>['startAngle']
    innerRadiusRatio: RadialBarCommonProps<D>['innerRadius']
    padding: RadialBarCommonProps<D>['padding']
    padAngle: RadialBarCommonProps<D>['padAngle']
    cornerRadius: RadialBarCommonProps<D>['cornerRadius']
    endAngle: RadialBarCommonProps<D>['endAngle']
    width: number
    height: number
    colors: RadialBarCommonProps<D>['colors']
    tracksColor: RadialBarCommonProps<D>['tracksColor']
}) => {
    // using a hook, not because it's costly to compute, but because this is used as
    // a dependency for other hooks, and otherwise a new array would be created all
    // the time, forcing recomputing everything.
    const center: [number, number] = useMemo(() => [width / 2, height / 2], [width, height])
    const outerRadius = Math.min(...center)
    const innerRadius = outerRadius * Math.min(innerRadiusRatio, 1)

    const getColor = useOrdinalColorScale<ComputedBar<D>>(colors, 'category')

    // the way categories are being extracted is a bit fragile, because it's extracted from the data,
    // so if the first group doesn't contain the first expected category for example, then the order
    // of categories is going to be incorrect.
    // Maybe we could add an extra sort property, although this might be confusing.
    const { serieIds, categories, groups, maxValue } = useMemo(() => {
        const result: {
            serieIds: string[]
            categories: string[]
            groups: RadialBarGroup<D>[]
            maxValue: number
        } = {
            serieIds: [],
            categories: [],
            groups: [],
            maxValue: 0,
        }

        data.forEach(serie => {
            result.serieIds.push(serie.id)

            let groupTotalValue = 0
            serie.data.forEach(datum => {
                if (!result.categories.includes(datum.x)) {
                    result.categories.push(datum.x)
                }
                groupTotalValue += datum.y
            })

            result.groups.push({
                id: serie.id,
                total: groupTotalValue,
                data: serie.data,
            })
        })

        if (maxValueDirective === 'auto') {
            result.maxValue = Math.max(...result.groups.map(group => group.total))
        } else {
            result.maxValue = maxValueDirective
        }

        return result
    }, [data, maxValueDirective])

    const valueScale = useMemo(
        () =>
            castLinearScale<number, number>(
                scaleLinear<number, number>().domain([0, maxValue]).range([startAngle, endAngle])
            ),
        [maxValue, startAngle, endAngle]
    )

    const radiusScale = useMemo(
        () =>
            castBandScale<string>(
                scaleBand<string>()
                    .domain(serieIds)
                    .range([innerRadius, outerRadius])
                    .padding(padding)
            ),
        [serieIds, outerRadius, innerRadius, padding]
    )

    const arcGenerator = useMemo(
        () =>
            d3Arc<Arc>()
                .startAngle(d => d.startAngle)
                .endAngle(d => d.endAngle)
                .innerRadius(d => d.innerRadius)
                .outerRadius(d => d.outerRadius)
                .cornerRadius(cornerRadius)
                .padAngle(degreesToRadians(padAngle)),
        [cornerRadius, padAngle]
    )

    const formatValue = useValueFormatter<number>(valueFormat)

    const bars = useMemo(() => {
        const innerBars: ComputedBar<D>[] = []

        groups.forEach(group => {
            let currentValue = 0
            const arcInnerRadius = radiusScale(group.id) as number
            const arcOuterRadius = arcInnerRadius + radiusScale.bandwidth()

            group.data.forEach(datum => {
                const stackedValue = currentValue + datum.y

                const computedDatum: ComputedBar<D> = {
                    id: `${group.id}.${datum.x}`,
                    data: datum,
                    groupId: group.id,
                    category: datum.x,
                    value: datum.y,
                    formattedValue: formatValue(datum.y),
                    color: '',
                    stackedValue,
                    arc: {
                        startAngle: degreesToRadians(valueScale(currentValue)),
                        endAngle: degreesToRadians(valueScale(stackedValue)),
                        innerRadius: arcInnerRadius,
                        outerRadius: arcOuterRadius,
                    },
                }

                computedDatum.color = getColor(computedDatum)

                currentValue += datum.y

                innerBars.push(computedDatum)
            })
        })

        return innerBars
    }, [groups, radiusScale, valueScale, getColor, formatValue])

    const startAngleRadians = degreesToRadians(startAngle)
    const endAngleRadians = degreesToRadians(endAngle)

    const tracks: RadialBarTrackDatum[] = useMemo(() => {
        return getScaleTicks(radiusScale).map(value => {
            const trackRadius = radiusScale(value) as number

            return {
                id: value,
                color: tracksColor,
                arc: {
                    startAngle: startAngleRadians,
                    endAngle: endAngleRadians,
                    innerRadius: trackRadius,
                    outerRadius: trackRadius + radiusScale.bandwidth(),
                },
            }
        })
    }, [radiusScale, startAngleRadians, endAngleRadians, tracksColor])

    // Given the way categories are extracted, (please see the corresponding hook above),
    // legends order might be incorrect, also colors are extracted from bars, to avoid
    // duplicating the colors function, but if the color logic is custom for each bar,
    // this might lead to weird values for legends.
    // Maybe we could allow passing custom legend data to fix that.
    const legendData = useMemo(
        () =>
            categories.map(category => {
                const barWithCategory = bars.find(bar => bar.category === category)
                const color = barWithCategory ? barWithCategory.color : undefined

                return {
                    id: category,
                    label: category,
                    color,
                }
            }),
        [categories, bars]
    )

    const customLayerProps: RadialBarCustomLayerProps<D> = useMemo(
        () => ({
            center,
            outerRadius,
            innerRadius,
            bars,
            arcGenerator,
            radiusScale,
            valueScale,
        }),
        [center, outerRadius, innerRadius, bars, arcGenerator, radiusScale, valueScale]
    )

    return {
        center,
        outerRadius,
        innerRadius,
        bars,
        arcGenerator,
        radiusScale,
        valueScale,
        tracks,
        legendData,
        customLayerProps,
    }
}
