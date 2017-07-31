/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export const HIERARCHICAL_NODE_TYPE_ROOT = 'root'
export const HIERARCHICAL_NODE_TYPE_INTERMEDIATE = 'intermediate'
export const HIERARCHICAL_NODE_TYPE_LEAF = 'leaf'

export const getHierarchicalNodeType = node => {
    if (node.depth === 0) {
        return HIERARCHICAL_NODE_TYPE_ROOT
    } else if (!node.children || node.children.length === 0) {
        return HIERARCHICAL_NODE_TYPE_LEAF
    }

    return HIERARCHICAL_NODE_TYPE_INTERMEDIATE
}
