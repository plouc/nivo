import isFunction from 'lodash/isFunction'
import get from 'lodash/get'
import { format } from 'd3-format'
import { useMemo } from 'react'

export const getLabelGenerator = (_label, labelFormat) => {
    const getRawLabel = isFunction(_label) ? _label : d => get(d, _label)
    let formatter
    if (labelFormat) {
        formatter = isFunction(labelFormat) ? labelFormat : format(labelFormat)
    }

    if (formatter) return d => formatter(getRawLabel(d))
    return getRawLabel
}

export const getPropertyAccessor = accessor =>
    isFunction(accessor) ? accessor : d => get(d, accessor)

export const usePropertyAccessor = accessor =>
    useMemo(() => getPropertyAccessor(accessor), [accessor])
