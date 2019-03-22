/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { cloneDeep } from 'lodash'
import { compose, defaultProps, withState, withPropsOnChange, pure } from 'recompose'
import { sankey as d3Sankey } from 'd3-sankey'
import {
    getLabelGenerator,
    getInheritedColorGenerator,
    withColors,
    withTheme,
    withDimensions,
    withMotion,
} from '@nivo/core'
import { SankeyDefaultProps, sankeyAlignmentFromProp } from './props'

const getId = d => d.id

export default Component =>
    compose(
        defaultProps(SankeyDefaultProps),
        withState('currentNode', 'setCurrentNode', null),
        withState('currentLink', 'setCurrentLink', null),
        withColors(),
        withColors({
            colorByKey: 'linkColorBy',
            destKey: 'getLinkColor',
            defaultColorBy: 'source.id',
        }),
        withTheme(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['nodeBorderColor'], ({ nodeBorderColor }) => ({
            getNodeBorderColor: getInheritedColorGenerator(nodeBorderColor),
        })),
        withPropsOnChange(['labelTextColor'], ({ labelTextColor }) => ({
            getLabelTextColor: getInheritedColorGenerator(labelTextColor),
        })),
        withPropsOnChange(['label', 'labelFormat'], ({ label, labelFormat }) => ({
            getLabel: getLabelGenerator(label, labelFormat),
        })),
        withPropsOnChange(['sort'], ({ sort }) => {
            let sortFunction
            if (sort === 'input') {
                sortFunction = null
            } else if (sort === 'ascending') {
                sortFunction = (a, b) => a.value - b.value
            } else if (sort === 'descending') {
                sortFunction = (a, b) => b.value - a.value
            }

            return { sortFunction }
        }),
        withPropsOnChange(['align'], ({ align }) => {
            return {
                alignFunction: sankeyAlignmentFromProp(align),
            }
        }),
        withPropsOnChange(
            [
                'data',
                'alignFunction',
                'sortFunction',
                'nodeThickness',
                'nodeSpacing',
                'nodeInnerPadding',
                'width',
                'height',
                'getColor',
                'getLinkColor',
                'getLabel',
            ],
            ({
                data: _data,
                alignFunction,
                sortFunction,
                nodeThickness,
                nodeSpacing,
                nodeInnerPadding,
                width,
                height,
                getColor,
                getLinkColor,
                getLabel,
            }) => {
                const sankey = d3Sankey()
                    .nodeAlign(alignFunction)
                    .nodeSort(sortFunction)
                    .nodeWidth(nodeThickness)
                    .nodePadding(nodeSpacing)
                    .size([width, height])
                    .nodeId(getId)

                // deep clone is required as the sankey diagram mutates data
                // we need a different identity for correct updates
                const data = cloneDeep(_data)
                sankey(data)

                data.nodes.forEach(node => {
                    node.color = getColor(node)
                    node.label = getLabel(node)
                    node.x = node.x0 + nodeInnerPadding
                    node.y = node.y0
                    node.width = Math.max(node.x1 - node.x0 - nodeInnerPadding * 2, 0)
                    node.height = Math.max(node.y1 - node.y0, 0)
                })

                data.links.forEach(link => {
                    link.color = getLinkColor(link)
                })

                return data
            }
        ),
        withPropsOnChange(['nodes'], ({ nodes }) => {
            return {
                legendData: nodes.map(node => ({
                    id: node.id,
                    label: node.label,
                    color: node.color,
                })),
            }
        }),
        pure
    )(Component)
