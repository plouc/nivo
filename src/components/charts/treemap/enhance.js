/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { treemap as d3Treemap } from 'd3-hierarchy'
import cloneDeep from 'lodash/cloneDeep'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { withHierarchy, withDimensions, withTheme, withMotion, withColors } from '../../../hocs'
import { getAccessorFor, getLabelGenerator } from '../../../lib/propertiesConverters'
import { treeMapTileFromProp } from '../../../props'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { computeNodePath } from '../../../lib/hierarchy'
import { bindDefs } from '../../../lib/defs'
import * as props from './props'

const commonEnhancers = [
    withHierarchy(),
    withDimensions(),
    withColors({ defaultColorBy: 'depth' }),
    withTheme(),
    withMotion(),
    withPropsOnChange(['identity'], ({ identity }) => ({
        getIdentity: getAccessorFor(identity),
    })),
    withPropsOnChange(['borderColor'], ({ borderColor }) => ({
        getBorderColor: getInheritedColorGenerator(borderColor),
    })),
    withPropsOnChange(['label', 'labelFormat'], ({ label, labelFormat }) => ({
        getLabel: getLabelGenerator(label, labelFormat),
    })),
    withPropsOnChange(['labelTextColor'], ({ labelTextColor }) => ({
        getLabelTextColor: getInheritedColorGenerator(labelTextColor),
    })),
    withPropsOnChange(
        ['width', 'height', 'tile', 'innerPadding', 'outerPadding'],
        ({ width, height, tile, innerPadding, outerPadding }) => ({
            treemap: d3Treemap()
                .size([width, height])
                .tile(treeMapTileFromProp(tile))
                .round(true)
                .paddingInner(innerPadding)
                .paddingOuter(outerPadding),
        })
    ),
    withPropsOnChange(
        ['root', 'treemap', 'leavesOnly', 'getIdentity', 'getColor'],
        ({ root: _root, treemap, leavesOnly, getIdentity, getColor }) => {
            const root = cloneDeep(_root)

            treemap(root)

            let nodes = leavesOnly ? root.leaves() : root.descendants()
            nodes = nodes.map(d => {
                d.path = computeNodePath(d, getIdentity)

                d.nodeHeight = d.height

                d.x = d.x0
                d.y = d.y0
                d.width = d.x1 - d.x0
                d.height = d.y1 - d.y0
                d.data.color = d.color = getColor({ ...d.data, depth: d.depth })

                d.data.id = d.id = getIdentity(d.data)
                d.data.value = d.value

                return d
            })

            return { nodes }
        }
    ),

    withPropsOnChange(
        ['enableLabel', 'nodes', 'getLabel', 'labelSkipSize'],
        ({ enableLabel, nodes, getLabel, labelSkipSize }) => {
            if (!enableLabel) return

            const nodesWithLabel = nodes.map(node => {
                if (
                    node.nodeHeight > 0 ||
                    (labelSkipSize !== 0 && Math.min(node.width, node.height) <= labelSkipSize)
                )
                    return node
                return { ...node, label: getLabel(node.data) }
            })

            return { nodes: nodesWithLabel }
        }
    ),
]

const svgEnhancers = [
    withPropsOnChange(['nodes', 'defs', 'fill'], ({ nodes, defs, fill }) => {
        return {
            defs: bindDefs(defs, nodes, fill, { targetKey: 'fill' }),
        }
    }),
]

export default Component => {
    const implPropTypes = props[`${Component.displayName}PropTypes`]
    const implDefaultProps = props[`${Component.displayName}DefaultProps`]

    Component.propTypes = implPropTypes

    switch (Component.displayName) {
        case 'TreeMap':
        case 'TreeMapPlaceholders':
            return compose(
                ...[
                    defaultProps(implDefaultProps),
                    ...commonEnhancers,
                    ...svgEnhancers,
                    withMotion(),
                    pure,
                ]
            )(Component)

        case 'TreeMapHtml':
            return compose(
                ...[defaultProps(implDefaultProps), ...commonEnhancers, withMotion(), pure]
            )(Component)

        case 'TreeMapCanvas':
            return compose(...[defaultProps(implDefaultProps), ...commonEnhancers, pure])(Component)
    }

    return Component
}
