/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import _ from 'lodash'
import { format } from 'd3'

export const convertLabel = (_label, labelFormat) => {
    if (_.isFunction(_label)) {
        return _label
    }

    const label = d => _.get(d, _label)

    let formatter
    if (labelFormat) {
        formatter = format(labelFormat)
    }

    return data => {
        let labelOutput = label(data)

        if (formatter) {
            labelOutput = formatter(labelOutput)
        }

        return labelOutput
    }
}

export const convertGetter = _property => {
    if (_.isFunction(_property)) {
        return _property
    }

    return d => _.get(d, _property)
}

export const getAccessorFor = directive =>
    _.isFunction(directive) ? directive : d => d[directive]
