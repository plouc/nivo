import { BoxPlotDatum, BoxPlotCommonProps, BoxPlotSummary } from '../types'
import { defaultProps } from '../props'

/** stratify an array of raw data objects into an array of arrays;
 * each array will create one box plot */
export const stratifyData = <RawDatum extends BoxPlotDatum>({
    data,
    groups = defaultProps.groups,
    getGroup,
    subGroups = defaultProps.subGroups,
    getSubGroup,
}: {
    data: RawDatum[]
    groups?: BoxPlotCommonProps<RawDatum>['groups']
    getGroup: ((datum: RawDatum) => string) | null
    subGroups?: BoxPlotCommonProps<RawDatum>['subGroups']
    getSubGroup: ((datum: RawDatum) => string) | null
}) => {
    const groupsMap = {} as BoxPlotDatum
    if (groups) {
        groups.map((g, i) => (groupsMap[g] = i))
    }
    const subGroupsMap = {} as BoxPlotDatum
    if (subGroups) {
        subGroups.map((sg, i) => (subGroupsMap[sg] = i))
    }

    const nGroups = Math.max(1, groups ? groups.length : 1)
    const nSubGroups = Math.max(1, subGroups ? subGroups.length : 1)
    const n = nGroups * nSubGroups
    const result = Array(n)
        .fill([])
        .map(() => Array<RawDatum>())
    data.forEach((d: RawDatum) => {
        const groupIndex = getGroup ? Number(groupsMap[getGroup(d)]) : 0
        const subGroupIndex = getSubGroup ? Number(subGroupsMap[getSubGroup(d)] ?? 0) : 0
        const index = groupIndex * nSubGroups + subGroupIndex
        if (index >= 0) {
            result[index].push(d)
        }
    })
    return result
}

const getQuantile = (values: number[], quantile = 0.5) => {
    const realIndex = (values.length - 1) * Math.max(0, Math.min(1, quantile))
    const intIndex = Math.floor(realIndex)
    if (realIndex === intIndex) return values[intIndex]
    const v1 = values[intIndex],
        v2 = values[intIndex + 1]
    return v1 + (v2 - v1) * (realIndex - intIndex)
}

const getMean = (values: number[]) => {
    const sum = values.reduce((acc, x) => acc + x, 0)
    return sum / values.length
}

const isPrecomputedDistribution = <RawDatum>(
    datum: RawDatum | Omit<BoxPlotSummary, 'groupIndex' | 'subGroupIndex'>
): datum is Omit<BoxPlotSummary, 'groupIndex' | 'subGroupIndex'> => {
    const preComputedKeys = ['values', 'extrema', 'mean', 'quantiles', 'group', 'subGroup', 'n']
    return preComputedKeys.every(k => k in datum)
}

export const summarizeDistribution = <RawDatum extends BoxPlotDatum>({
    data,
    getValue,
    groups,
    subGroups,
    groupIndex,
    subGroupIndex,
    quantiles,
}: {
    data: RawDatum[]
    getValue: (datum: RawDatum) => unknown
    groups: string[] | null
    subGroups: string[] | null
    groupIndex: number
    subGroupIndex: number
    quantiles: number[]
}) => {
    // accept a precomputed summary representation if it has all the required keys
    if (data.length === 1 && isPrecomputedDistribution(data[0])) {
        return {
            groupIndex: groupIndex,
            subGroupIndex: subGroupIndex,
            ...data[0],
        } as BoxPlotSummary
    }
    // compute the summary representation from raw data using quantiles
    const values = data.map(v => Number(getValue(v))) as number[]
    values.sort((a, b) => a - b)
    return {
        group: groups ? groups[groupIndex] : '',
        groupIndex: groupIndex,
        subGroup: subGroups ? subGroups[subGroupIndex] : '',
        subGroupIndex: subGroupIndex,
        n: values.length,
        extrema: [values[0], values[values.length - 1]],
        quantiles: quantiles,
        values: quantiles.map(q => getQuantile(values, q)),
        mean: getMean(values),
    } as BoxPlotSummary
}
