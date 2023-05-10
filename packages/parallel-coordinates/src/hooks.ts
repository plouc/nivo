import { useMemo, useRef, useEffect } from 'react'
import { line } from 'd3-shape'
import { scaleLinear, scalePoint } from 'd3-scale'
import { curveFromProp } from '@nivo/core'
import { OrdinalColorScaleConfig, useOrdinalColorScale } from '@nivo/colors'
import { castPointScale, castLinearScale, ScalePoint } from '@nivo/scales'
import {
    Variable,
    VariableWithScale,
    CommonProps,
    ComputedDatum,
    BaseDatum,
    BaseGroup,
    Group,
    CustomLayerProps,
    GroupLegend,
    DatumLegend,
    DatumGroupKeys,
    IfGrouped,
    ComputedGroupDatum,
} from './types'
import { commonDefaultProps } from './defaults'

/**
 * Compute groups.
 *
 * Please note that we assume that `groupBy` is defined, and correct, at this stage.
 *
 * If `predefinedGroups` is provided, we'll use it as a base, otherwise
 * we're going to scan each datum and extract their group, and then
 * make those unique to define the available groups.
 */
const computeGroups = <Datum extends BaseDatum>({
    data,
    groupBy,
    predefinedGroups,
    getColor,
}: {
    data: readonly Datum[]
    groupBy: DatumGroupKeys<Datum>
    predefinedGroups?: readonly BaseGroup[]
    getColor: (group: BaseGroup) => string
}): Group[] => {
    let groups: Group[]

    if (predefinedGroups !== undefined) {
        groups = predefinedGroups.map(group => ({
            id: group.id,
            label: group.label || group.id,
            color: getColor(group),
        }))
    } else {
        const groupsSet = new Set<string>()
        for (const datum of data) {
            groupsSet.add(datum[groupBy] as string)
        }

        groups = Array.from(groupsSet, groupId => {
            const group: BaseGroup = {
                id: groupId,
                label: groupId,
            }

            return {
                ...group,
                color: getColor(group),
            }
        })
    }

    return groups
}

/**
 * Compute the scale for each variable.
 *
 * We only support linear scales.
 *
 * Each scale domain will be computed automatically if `min`/`max` = `'auto'`,
 * otherwise, we'll use the provided values.
 */
const computeVariablesScales = <Datum extends BaseDatum>({
    width,
    height,
    data,
    variables,
    layout,
}: {
    width: number
    height: number
    data: readonly Datum[]
    variables: readonly Variable<Datum>[]
    layout: CommonProps<Datum>['layout']
}): readonly VariableWithScale<Datum>[] => {
    // Depending on the layout, the range might need to be switched.
    const range = layout === 'horizontal' ? [height, 0] : [0, width]

    return variables.map(variable => {
        const allValues: number[] = data.map(datum => datum[variable.value] as number)

        const min =
            variable.min !== undefined && variable.min !== 'auto'
                ? variable.min
                : Math.min(...allValues!)
        const max =
            variable.max !== undefined && variable.max !== 'auto'
                ? variable.max
                : Math.max(...allValues!)

        const scale = castLinearScale(scaleLinear().rangeRound(range).domain([min, max]))

        return { ...variable, scale }
    })
}

const computeDataVariables = <Datum extends BaseDatum>({
    data,
    groupBy,
    groups,
    variablesScale,
    variablesWithScale,
    layout,
    getColor,
}: {
    data: readonly Datum[]
    groupBy?: DatumGroupKeys<Datum>
    groups: Group[] | undefined
    variablesScale: ScalePoint<string>
    variablesWithScale: readonly VariableWithScale<Datum>[]
    layout: CommonProps<Datum>['layout']
    getColor: (datum: Datum) => string
}): ComputedDatum<Datum>[] | ComputedGroupDatum<Datum>[] => {
    return data.map((datum, index) => {
        const points: [number, number][] = variablesWithScale.map(variable => [
            layout === 'horizontal'
                ? variablesScale(variable.id)!
                : variable.scale(datum[variable.value] as number),
            layout === 'horizontal'
                ? variable.scale(datum[variable.value] as number)
                : variablesScale(variable.id)!,
        ])

        let group: Group | undefined = undefined
        if (groupBy !== undefined) {
            const datumGroup = datum[groupBy]
            group = groups?.find(candidateGroup => candidateGroup.id === datumGroup)
        }

        const computedDatum: ComputedDatum<Datum> = {
            id: datum.id,
            index,
            points,
            data: datum,
            color: group ? group.color : getColor(datum),
        }

        if (!group) return computedDatum

        return {
            ...computedDatum,
            group,
        } as ComputedGroupDatum<Datum>
    })
}

export const useParallelCoordinates = <
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined = undefined
>({
    width,
    height,
    data,
    variables,
    groupBy,
    groups: predefinedGroups,
    layout = commonDefaultProps.layout,
    curve = commonDefaultProps.curve,
    colors = commonDefaultProps.colors as OrdinalColorScaleConfig<
        IfGrouped<Datum, GroupBy, BaseGroup, Datum>
    >,
    forwardLegendData,
}: {
    width: number
    height: number
    data: readonly Datum[]
    variables: readonly Variable<Datum>[]
    groupBy?: CommonProps<Datum, GroupBy>['groupBy']
    groups?: CommonProps<Datum, GroupBy>['groups']
    layout: CommonProps<Datum, GroupBy>['layout']
    curve: CommonProps<Datum, GroupBy>['curve']
    colors: CommonProps<Datum, GroupBy>['colors']
    forwardLegendData?: CommonProps<Datum, GroupBy>['forwardLegendData']
}) => {
    // If no groups, we'll use the data to define the color, otherwise the groups,
    // meaning that `id` refers to either `Datum.id` or `Group.id`.
    const getColor = useOrdinalColorScale(colors, 'id')

    const groups = useMemo(() => {
        if (groupBy === undefined) return undefined

        return computeGroups<Datum>({
            data,
            groupBy,
            predefinedGroups,
            getColor: getColor as (group: BaseGroup) => string,
        })
    }, [data, groupBy, predefinedGroups, getColor])

    const variablesScale = useMemo(() => {
        const variableIds = variables.map(({ id }) => id)
        return castPointScale(
            scalePoint()
                .range(layout === 'horizontal' ? [0, width] : [height, 0])
                .domain(variableIds)
        )
    }, [variables, layout, width, height])

    const variablesWithScale = useMemo(
        () =>
            computeVariablesScales<Datum>({
                width,
                height,
                data,
                variables,
                layout,
            }),
        [width, height, data, variables, layout]
    )

    const computedData = useMemo(
        () =>
            computeDataVariables<Datum>({
                data,
                groupBy,
                groups,
                variablesScale,
                variablesWithScale,
                layout,
                getColor,
            }),
        [data, groupBy, groups, variablesScale, variablesWithScale, layout, getColor]
    )

    const legendData = useMemo(() => {
        if (!groups) {
            return computedData.map(datum => ({
                id: datum.id,
                label: datum.id,
                color: datum.color,
                data: datum,
            })) as DatumLegend<Datum>[]
        }

        return groups.map(group => ({
            id: group.id,
            label: group.label || group.id,
            color: group.color,
            data: group,
        })) as GroupLegend[]
    }, [groups, computedData])

    // Forward the legends data if `forwardLegendData` is defined.
    const forwardLegendDataRef = useRef(forwardLegendData)
    useEffect(() => {
        if (typeof forwardLegendDataRef.current !== 'function') return
        forwardLegendDataRef.current(
            legendData as IfGrouped<Datum, GroupBy, GroupLegend[], DatumLegend<Datum>[]>
        )
    }, [forwardLegendDataRef, legendData])

    const lineGenerator = useMemo(
        () => line<[number, number]>().curve(curveFromProp(curve)),
        [curve]
    )

    const customLayerContext: CustomLayerProps<Datum> = useMemo(
        () => ({
            computedData,
            variables,
            lineGenerator,
        }),
        [computedData, variables, lineGenerator]
    )

    return {
        variablesScale,
        variablesWithScale,
        computedData,
        lineGenerator,
        legendData,
        customLayerContext,
    }
}
