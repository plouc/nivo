/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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

        // standard fromat specifier
        return d3Format(format)
    }

    // no formatting
    return v => v
}

export const useValueFormatter = format => useMemo(() => getValueFormatter(format), [format])
