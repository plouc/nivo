/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import _ from 'lodash'

const recursiveFlattener = (stack, node, identityProperty, parentId) => {
    if (node.children) {
        node.children.forEach(child => {
            recursiveFlattener(
                stack,
                child,
                identityProperty,
                node[identityProperty]
            )
        })
    } else {
        stack.push(_.assign({}, node, { parentId }))
    }
}

export const flatten = (root, identityProperty) => {
    const nodes = []

    recursiveFlattener(nodes, root, identityProperty)

    return { children: nodes }
}
