/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

/**
 * This wrapper is responsible for computing treemap chart positions.
 * It's used for all TreeMap related chart components.
 *
 * @returns {{ compute: (function) }}
 * @constructor
 */
const TreeMapD3 = () => {
    const treemap = d3.layout.treemap();
    const fisheye = d3.fisheye.circular();

    return {
        /**
         *
         * @param {number}   width
         * @param {number}   height
         * @param {object}   root
         * @param {string}   mode
         * @param {number}   padding
         * @param {boolean}  enableFisheye
         * @param {string}   identityProperty
         * @param {function} valueAccessor
         * @param {function} color
         */
        compute({
            width, height,
            root,
            mode, padding,
            enableFisheye,
            identityProperty, valueAccessor,
            color
        }) {

            treemap
                .size([width, height])
                .sticky(true)
                .value(valueAccessor)
                .mode(mode)
                .round(true)
                .padding(padding)
            ;

            const nodes = treemap.nodes(root)
                .map(node => {
                    node.isRoot = node.depth === 0;
                    node.isLeaf = node.children === undefined || node.children.length === 0;

                    if (enableFisheye) {
                        const distorted = fisheye(node);

                        node.x  = distorted.x;
                        node.y  = distorted.y;
                    }

                    return node;
                })
            ;

            return nodes;
        }
    }
};


export default TreeMapD3;
