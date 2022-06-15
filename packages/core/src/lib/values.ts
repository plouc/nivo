import { isString } from 'lodash'
import { format as d3Format } from 'd3-format'
import { timeFormat as d3TimeFormat } from 'd3-time-format'
import { ValueFormat } from './types'

export const getValueFormatter = <Value>(
    format?: ValueFormat<Value>
): ((value: Value) => string) => {
    if (!format) {
        return (value: Value) => `${value}`
    }
    if (isString(format)) {
        // time format specifier
        if (format.indexOf('time:') === 0) {
            // @ts-ignore
            return d3TimeFormat(format.slice(5))
        }
        // standard format specifier
        // @ts-ignore
        return d3Format(format)
    }
    // user defined function
    return format
}
