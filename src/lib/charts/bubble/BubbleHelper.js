/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { hierarchy, pack as Pack } from 'd3'

const computePath = node => {}

/**
 * This wrapper is responsible for computing bubble chart positions.
 * It's used for all Bubble related chart components.
 *
 * @returns {{ compute: (function) }}
 * @constructor
 */
const BubbleHelper = () => {
    const pack = Pack()

    return {
        /**
         *
         * @param {number}   width
         * @param {number}   height
         * @param {object}   _root
         * @param {boolean}  leavesOnly
         * @param {function} identity
         * @param {function} value
         * @param {number}   padding
         * @param {function} color
         * @returns {array}
         */
        compute({
            width,
            height,
            root: _root,
            leavesOnly,
            identity,
            value,
            padding,
            color,
        }) {
            pack.size([width, height]).padding(padding)

            const root = hierarchy(_root).sum(value)

            pack(root)

            const nodes = leavesOnly ? root.leaves() : root.descendants()

            return nodes.map(d => {
                d.color = color(d.depth)
                /*
                     if (d.depth > 1) {
                     d.color = color(d.parentId)
                     } else {
                     d.color = color(identity(d.data))
                     }
                     */

                d.data.key = d.ancestors().map(a => identity(a.data)).join('.')

                return d
            })
        },
    }
}

export default BubbleHelper
