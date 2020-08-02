/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { pack } from 'd3-hierarchy'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withStateHandlers from 'recompose/withStateHandlers'
import pure from 'recompose/pure'
import {
    withHierarchy,
    withDimensions,
    withTheme,
    withMotion,
    getAccessorFor,
    getLabelGenerator,
    bindDefs,
} from '@nivo/core'
import { getOrdinalColorScale, getInheritedColorGenerator } from '@nivo/colors'
import { computeNodes, computeZoom } from './compute'
import * as props from './props'

const commonEnhancers = [
    withHierarchy(),
    withDimensions(),
    withTheme(),
    withPropsOnChange(['colors', 'colorBy'], ({ colors, colorBy }) => ({
        getColor: getOrdinalColorScale(colors, colorBy),
    })),
    withPropsOnChange(['width', 'height', 'padding'], ({ width, height, padding }) => ({
        pack: pack().size([width, height]).padding(padding),
    })),

    withPropsOnChange(['identity'], ({ identity }) => ({
        getIdentity: getAccessorFor(identity),
    })),

    // border
    withPropsOnChange(['borderColor', 'theme'], ({ borderColor, theme }) => ({
        getBorderColor: getInheritedColorGenerator(borderColor, theme),
    })),

    // labels
    withPropsOnChange(['label', 'labelFormat'], ({ label, labelFormat }) => ({
        getLabel: getLabelGenerator(label, labelFormat),
    })),
    withPropsOnChange(['labelTextColor', 'theme'], ({ labelTextColor, theme }) => ({
        getLabelTextColor: getInheritedColorGenerator(labelTextColor, theme),
    })),

    // zoom
    withStateHandlers(
        ({ currentNodePath = null }) => ({
            currentNodePath,
        }),
        {
            zoomToNode: ({ currentNodePath }) => path => {
                if (path === currentNodePath) return { currentNodePath: null }
                return { currentNodePath: path }
            },
        }
    ),

    withPropsOnChange(
        ['root', 'pack', 'leavesOnly', 'getIdentity', 'getColor'],
        ({ root, pack, leavesOnly, getIdentity, getColor }) => {
            const nodes = computeNodes({ root, pack, leavesOnly, getIdentity, getColor })

            return { nodes }
        }
    ),

    withPropsOnChange(
        ['enableLabel', 'nodes', 'getLabel', 'labelSkipRadius'],
        ({ enableLabel, nodes, getLabel, labelSkipRadius }) => {
            if (!enableLabel) return
            const nodesWithLabel = nodes.map(node => {
                if (node.height !== 0 || (labelSkipRadius > 0 && node.r < labelSkipRadius))
                    return node
                return { ...node, label: getLabel(node) }
            })

            return { nodes: nodesWithLabel }
        }
    ),

    withPropsOnChange(
        ['nodes', 'isZoomable', 'currentNodePath'],
        ({ nodes, isZoomable, currentNodePath, width, height }) => {
            if (currentNodePath && isZoomable) {
                return {
                    nodes: computeZoom(nodes, currentNodePath, width, height),
                }
            }
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
        case 'Bubble':
            return compose(
                ...[
                    defaultProps(implDefaultProps),
                    ...commonEnhancers,
                    ...svgEnhancers,
                    withMotion(),
                    pure,
                ]
            )(Component)

        case 'BubbleHtml':
            return compose(
                ...[defaultProps(implDefaultProps), ...commonEnhancers, withMotion(), pure]
            )(Component)

        case 'BubbleCanvas':
            return compose(...[defaultProps(implDefaultProps), ...commonEnhancers, pure])(Component)
    }

    return Component
}
