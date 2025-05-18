import { LegendProps, legendDefaults } from '@nivo/legends'
import { objectDiff } from '../objectDiff'

/**
 * Exclude default values from legend objects for simpler code snippets.
 * Some charts extend the legend object with additional properties, hence the generic type.
 */
export const mapLegends = <L extends LegendProps>(
    value: readonly L[] | undefined
): readonly L[] | undefined => {
    if (value === undefined) return value

    return value.map(legend => {
        return objectDiff(legend, legendDefaults) as L
    })
}
