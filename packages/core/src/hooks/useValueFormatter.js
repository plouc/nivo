import { useMemo } from 'react'
import { format as d3Format } from 'd3-format'
import { timeFormat as d3TimeFormat } from 'd3-time-format'

export const getValueFormatter = format => {
    // user defined function
    if (typeof format === 'function') return format

    if (typeof format === 'string') {
        // time format specifier
        if (format.indexOf('time:') === 0) {
            return d3TimeFormat(format.slice('5'))
        }

        // standard format specifier
        return d3Format(format)
    }

    // no formatting
    return v => `${v}`
}

export const useValueFormatter = format => useMemo(() => getValueFormatter(format), [format])
