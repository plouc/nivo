/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { pack as Pack } from 'd3-hierarchy'

/**
 * Computing bubble chart positions.
 * It's used for all Bubble related chart components.
 *
 * @param {number}   width
 * @param {number}   height
 * @param {object}   _root
 * @param {boolean}  leavesOnly
 * @param {function} getIdentity
 * @param {number}   padding
 * @param {function} getColor
 * @returns {array}
 */
export const computeBubble = ({
    width,
    height,
    root: _root,
    leavesOnly,
    getIdentity,
    padding,
    getColor,
}) => {
    const pack = Pack()
    pack.size([width, height]).padding(padding)

    const root = pack(_root)

    const nodes = leavesOnly ? root.leaves() : root.descendants()

    return nodes.map(d => {
        d.color = getColor({ ...d.data, depth: d.depth })
        // if (d.depth > 1) {
        //     d.color = color(d.parentId)
        // } else {
        //     d.color = color(identity(d.data))
        // }

        d.data.key = d.ancestors().map(a => getIdentity(a.data)).join('.')

        return d
    })
}
