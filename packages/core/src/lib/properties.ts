import { isString, isFunction } from 'lodash'
import get from 'lodash/get'
import { format } from 'd3-format'
import { useMemo } from 'react'
import { PropertyAccessor, DatumPropertyAccessor } from './types'

export const getLabelGenerator = <Datum>(
    _label: PropertyAccessor<Datum, string>,
    labelFormat?: PropertyAccessor<Datum, string>
): DatumPropertyAccessor<Datum, string> => {
    const getRawLabel = isFunction(_label) ? _label : (d: Datum) => get(d, _label)
    if (isString(labelFormat)) {
        const formatter = format(labelFormat)
        if (formatter) return (d: Datum) => formatter(getRawLabel(d))
    }
    if (isFunction(labelFormat)) {
        return (d: Datum) => labelFormat(getRawLabel(d))
    }
    return getRawLabel
}

export const getPropertyAccessor = <Datum, Value>(
    accessor: PropertyAccessor<Datum, Value>
): DatumPropertyAccessor<Datum, Value> =>
    isFunction(accessor) ? accessor : (d: Datum) => get(d, accessor)

export const usePropertyAccessor = <Datum, Value>(
    accessor: PropertyAccessor<Datum, Value>
): DatumPropertyAccessor<Datum, Value> => useMemo(() => getPropertyAccessor(accessor), [accessor])
