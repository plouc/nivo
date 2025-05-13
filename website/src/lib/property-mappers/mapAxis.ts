import omit from 'lodash/omit.js'
import isEmpty from 'lodash/isEmpty.js'
import { defaultAxisProps } from '@nivo/axes'
import { objectDiff } from '../objectDiff'

/**
 * Exclude default values from axis objects for simpler code snippets.
 * Also remove the `enable` property from the diff, as it's not part
 * of an axis config, it's just used for the demo, to toggle axes while
 * retaining the current config.
 */
export const mapAxis = (value: any) => {
    // There's a distinction between `null` and `undefined`,
    // `null` can be used to disable an axis which is enabled by default,
    // while `undefined` fallback to the default value.
    if (!value.enable) return null

    const omitKeys = ['enable']

    // If there's no legend, we can omit all legend related properties.
    if (!value.legend) {
        omitKeys.push('legend', 'legendPosition', 'legendOffset')
    }

    if (!value.truncateTickAt) {
        omitKeys.push('truncateTickAt')
    }

    const diff = objectDiff(omit(value, omitKeys), defaultAxisProps)
    if (isEmpty(diff)) return undefined

    return diff
}
