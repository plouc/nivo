/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import { flatten } from '../../../DataUtils';


/**
 * This wrapper is responsible for computing bubble chart positions.
 * It's used for all Bubble related chart components.
 *
 * @returns {{ compute: (function) }}
 * @constructor
 */
const BubbleD3 = () => {
    const layout  = d3.layout.pack();

    return {
        /**
         *
         * @param {number}   width
         * @param {number}   height
         * @param {object}   root
         * @param {string}   identityProperty
         * @param {function} valueAccessor
         * @param {number}   padding
         * @param {function} color
         */
        compute({
            width, height,
            root,
            identityProperty, valueAccessor,
            padding,
            color
        }) {
            layout
                .value(valueAccessor)
                .sort(null)
                .size([width, height])
                .padding(padding)
            ;

            const flattened = flatten(root, identityProperty);
            const nodes     = layout.nodes(flattened)
                .filter(d => !d.children)
                .map(d => {
                    d.color = color(d.parentId);

                    return d;
                })
            ;

            return nodes;
        }
    }
};


export default BubbleD3;
