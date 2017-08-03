/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
 * This wrapper is responsible for computing treemap chart positions.
 * It's used for all TreeMap related chart components.
 *
 * @returns {{ compute: (function) }}
 * @constructor
 */
const TreeMapHelper = () => {
    const treemap = Treemap()

    return {
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
        compute({
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
        }) {
            treemap
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
        },
    }
}

export default TreeMapHelper
