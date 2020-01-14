/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isFunction, get } from 'lodash'
import { format } from 'd3-format'

export const getLabelGenerator = (_label: any, labelFormat?: any) => {
    const getRawLabel = isFunction(_label) ? _label : (d: any) => get(d, _label)

    let formatter: any
    if (labelFormat) {
        formatter = isFunction(labelFormat) ? labelFormat : format(labelFormat)
    }

    if (formatter) {
        return (d: any) => formatter(getRawLabel(d))
    }

    return getRawLabel
}

export const getAccessorFor = (directive: any) =>
    isFunction(directive) ? directive : (d: any) => d[directive]

export const getAccessorOrValue = (value: any) => (isFunction(value) ? value : () => value)
