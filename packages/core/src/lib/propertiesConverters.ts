import { isString, isFunction } from 'lodash'
import get from 'lodash/get'
import { format } from 'd3-format'
import { useMemo } from 'react'

const isStr = (x?: string | Object): x is string => {
    return isString(x)
}
const isFun = (x?: string | ((d: Object) => string)): x is ((d: Object) => string) => {
    return isFunction(x)
}

export const getLabelGenerator = (
    _label: string | ((d: Object) => string),
    labelFormat?: string | ((d: Object) => string)
) => {
    const getRawLabel = isFunction(_label) ? _label : (d: any) => get(d, _label)
    let formatter = null as any
    if (isStr(labelFormat)) {
        formatter = format(labelFormat)
    } else if (isFun(labelFormat)) {
        return (d: any) => labelFormat(getRawLabel(d))
    }
    if (formatter) return (d: Object) => formatter(getRawLabel(d))
    return getRawLabel
}

export const getPropertyAccessor = (accessor: string | ((d: any) => any)) =>
    isFunction(accessor) ? accessor : (d: any) => get(d, accessor)

export const usePropertyAccessor = (accessor: string | ((d: any) => any)) =>
    useMemo(() => getPropertyAccessor(accessor), [accessor])
