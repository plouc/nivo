import { LegendProps, legendDefaults } from '@nivo/legends'
import { objectDiff } from '../objectDiff'

/**
 * Exclude default values from legend objects for simpler code snippets.
 */
export const mapLegends = (
    value: readonly LegendProps[] | undefined
): readonly LegendProps[] | undefined => {
    if (value === undefined) return value

    return value.map(legend => {
        return objectDiff(legend, legendDefaults) as LegendProps
    })
}
