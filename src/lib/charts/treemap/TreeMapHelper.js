/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import _ from 'lodash'
import {
    treemap as Treemap,
    hierarchy,
    treemapBinary,
    treemapDice,
    treemapSlice,
    treemapSliceDice,
    treemapSquarify,
    treemapResquarify,
} from 'd3-hierarchy'

export const tilingMethods = {
    binary: treemapBinary,
    dice: treemapDice,
    slice: treemapSlice,
    sliceDice: treemapSliceDice,
    squarify: treemapSquarify,
    resquarify: treemapResquarify,
}

/**
 * @param {number}   width
 * @param {number}   height
 * @param {object}   _root
 * @param {boolean}  leavesOnly
 * @param {string}   tile
 * @param {number}   innerPadding
 * @param {number}   outerPadding
 * @param {function} identity
 * @param {function} value
 * @param {function} color
 */
export const computeTreeMap = ({
    width,
    height,
    root: _root,
    leavesOnly,
    tile,
    innerPadding,
    outerPadding,
    identity,
    value,
    color,
}) => {
    const treemap = Treemap()
        .size([width, height])
        .tile(tilingMethods[tile])
        .round(true)
        .paddingInner(innerPadding)
        .paddingOuter(outerPadding)

    const root = treemap(hierarchy(_root).sum(value))

    const nodes = leavesOnly ? root.leaves() : root.descendants()

    return nodes.map(d => {
        d.color = color({ ...d.data, depth: d.depth })

        d.data.key = d.ancestors().map(a => identity(a.data)).join('.')

        return d
    })
}
