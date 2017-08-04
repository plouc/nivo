/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear, scaleBand, scalePoint } from 'd3-scale'

export default class Scale extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['linear', 'point', 'band']).isRequired,
        padding: PropTypes.number,
        dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
        aggregate: PropTypes.array,
        maxOf: PropTypes.array,
    }

    static create({ type, axis, dataKey: key, aggregate, maxOf, padding }, data, width, height) {
        let mapper
        if (Array.isArray(aggregate)) {
            mapper = d => _.sum(aggregate.map(k => d[k]))
        } else if (Array.isArray(maxOf)) {
            mapper = d => _.max(maxOf.map(k => d[k]))
        } else if (_.isFunction(key)) {
            mapper = key
        } else {
            mapper = d => d[key]
        }

        const range = [axis === 'y' ? height : 0, axis === 'x' ? width : 0]

        let scale
        switch (type) {
            case 'linear':
                scale = scaleLinear().rangeRound(range).domain([0, _.max(data.map(mapper))])
                break

            case 'band':
                scale = scaleBand().rangeRound(range).domain(data.map(mapper))

                if (padding !== undefined) {
                    scale.padding(padding)
                }
                break

            case 'point':
                scale = scalePoint().range(range).domain(data.map(mapper))
                break
        }

        return scale
    }

    render() {
        return null
    }
}
