/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { flatten } from '../../../DataUtils'
import { hierarchy, pack } from 'd3'

/**
 * This wrapper is responsible for computing bubble chart positions.
 * It's used for all Bubble related chart components.
 *
 * @returns {{ compute: (function) }}
 * @constructor
 */
const BubbleD3 = () => {
    const layout = pack()

    return {
        /**
         *
         * @param {number}   width
         * @param {number}   height
         * @param {object}   data
         * @param {string}   identityProperty
         * @param {function} valueAccessor
         * @param {number}   padding
         * @param {function} color
         * @returns {array}
         */
        compute({
            width,
            height,
            data: _data,
            identityProperty,
            valueAccessor,
            padding,
            color,
        }) {
            layout
                //.value(valueAccessor)
                //.sort(d => d.parentId)
                .size([width, height])
                .padding(padding)

            const data = hierarchy(_data)
            layout(data)

            //const flattened = flatten(data, identityProperty)
            const nodes = data.descendants().filter(d => !d.children).map(d => {
                if (d.depth > 1) {
                    d.color = color(d.parentId)
                } else {
                    d.color = color(d[identityProperty])
                }

                return d
            })

            return nodes
        },
    }
}

export default BubbleD3
