import { useEffect, useMemo, useRef } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import { arc as d3Arc, stack as d3Stack } from 'd3-shape'
import { degreesToRadians, usePropertyAccessor, useValueFormatter } from '@nivo/core'
import { castBandScale, castLinearScale } from '@nivo/scales'
import { useOrdinalColorScale } from '@nivo/colors'
import {
    PolarBarDatum,
    PolarBarDataProps,
    PolarBarCommonProps,
    PolarBarComputedDatum,
    PolarBarCustomLayerProps,
} from './types'
import { defaultProps } from './defaults'

export const usePolarBar = <RawDatum extends PolarBarDatum>({
    data,
    indexBy = defaultProps.indexBy,
    keys = defaultProps.keys,
    adjustValueRange = defaultProps.adjustValueRange,
    valueFormat,
    width,
    height,
    startAngle = defaultProps.startAngle,
    endAngle = defaultProps.endAngle,
    innerRadius: innerRadiusRatio = defaultProps.innerRadius,
    cornerRadius = defaultProps.cornerRadius,
    colors = defaultProps.colors,
    forwardLegendData,
}: Pick<
    Partial<PolarBarCommonProps<RawDatum>>,
    | 'adjustValueRange'
    | 'valueFormat'
    | 'startAngle'
    | 'endAngle'
    | 'innerRadius'
    | 'cornerRadius'
    | 'colors'
    | 'forwardLegendData'
> & {
    data: PolarBarDataProps<RawDatum>['data']
    indexBy?: PolarBarCommonProps<RawDatum>['indexBy']
    keys?: PolarBarCommonProps<RawDatum>['keys']
    width: number
    height: number
}) => {
    const getIndex = usePropertyAccessor<RawDatum, string>(indexBy)
    const indices = useMemo(() => data.map(getIndex), [data, getIndex])

    const [rawSeries, maxStackedValue] = useMemo(() => {
        const stack = d3Stack<RawDatum>().keys(keys)
        const _rawSeries = stack(data)
        const _maxStackedValue = Math.max(..._rawSeries.flatMap(layer => layer.map(([, y1]) => y1)))

        return [_rawSeries, _maxStackedValue]
    }, [data, keys])

    const center: [number, number] = useMemo(() => [width / 2, height / 2], [width, height])

    const outerRadius = Math.min(...center)
    const innerRadius = outerRadius * Math.min(innerRadiusRatio, 1)

    const angleScale = useMemo(() => {
        return castBandScale<string>(
            scaleBand<string>().domain(indices).range([startAngle, endAngle])
        )
    }, [indices, startAngle, endAngle])

    const radiusScale = useMemo(() => {
        const scale = castLinearScale<number, number>(
            scaleLinear<number, number>()
                .domain([0, maxStackedValue])
                .range([innerRadius, outerRadius])
        )

        if (adjustValueRange) {
            scale.nice()
        }

        return scale
    }, [innerRadius, outerRadius, maxStackedValue, adjustValueRange])

    const formatValue = useValueFormatter<number>(valueFormat)

    const getColor = useOrdinalColorScale(colors, 'key')

    const arcs = useMemo(() => {
        return rawSeries
            .map(series => {
                const key = series.key

                return series.map((datum, indexIndex) => {
                    const index = indices[indexIndex]
                    const value = datum.data[key] as number
                    const startAngle = degreesToRadians(angleScale(index) ?? 0)

                    const arc: PolarBarComputedDatum = {
                        index,
                        key,
                        id: `${index}.${key}`,
                        value,
                        formattedValue: formatValue(value),
                        color: '',
                        arc: {
                            startAngle,
                            endAngle: startAngle + degreesToRadians(angleScale.bandwidth()),
                            innerRadius: radiusScale(datum[0]),
                            outerRadius: radiusScale(datum[1]),
                        },
                    }
                    arc.color = getColor(arc)

                    return arc
                })
            })
            .flat()
    }, [indices, rawSeries, angleScale, radiusScale, formatValue, getColor])

    const arcGenerator = useMemo(
        () =>
            d3Arc<PolarBarComputedDatum['arc']>()
                .startAngle(d => d.startAngle)
                .endAngle(d => d.endAngle)
                .innerRadius(d => d.innerRadius)
                .outerRadius(d => d.outerRadius)
                .cornerRadius(cornerRadius),
        [cornerRadius]
    )

    // Colors are extracted from the computed arcs, to avoid
    // duplicating the colors function, but if the color logic is custom for each arc,
    // this might lead to inconsistent values for the legends.
    // Maybe we could allow passing custom legend data to fix that.
    const legendData = useMemo(
        () =>
            keys.map(key => {
                const arcWithKey = arcs.find(arc => arc.key === key)
                const color = arcWithKey ? arcWithKey.color : 'transparent'

                return {
                    id: key,
                    label: key,
                    color,
                }
            }),
        [keys, arcs]
    )

    const forwardLegendDataRef = useRef(forwardLegendData)
    useEffect(() => {
        if (typeof forwardLegendDataRef.current !== 'function') return
        forwardLegendDataRef.current(legendData)
    }, [forwardLegendDataRef, legendData])

    const customLayerProps: PolarBarCustomLayerProps = useMemo(
        () => ({
            center,
            innerRadius,
            outerRadius,
            arcs,
            arcGenerator,
            radiusScale,
            angleScale,
        }),
        [center, innerRadius, outerRadius, arcs, arcGenerator, radiusScale, angleScale]
    )

    return {
        center,
        innerRadius,
        outerRadius,
        angleScale,
        radiusScale,
        arcGenerator,
        arcs,
        legendData,
        customLayerProps,
    }
}
