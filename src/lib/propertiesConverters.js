/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import _ from 'lodash'
import { format } from 'd3-format'

export const getLabelGenerator = (_label, labelFormat) => {
    const getRawLabel = _.isFunction(_label) ? _label : d => _.get(d, _label)
    let formatter
    if (labelFormat) {
        formatter = _.isFunction(labelFormat) ? labelFormat : format(labelFormat)
    }

    if (formatter) return d => formatter(getRawLabel(d))
    return getRawLabel
}

export const getAccessorFor = directive => (_.isFunction(directive) ? directive : d => d[directive])
