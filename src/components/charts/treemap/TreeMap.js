/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import _ from 'lodash'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { treeMapPropTypes, treeMapDefaultProps } from './TreeMapProps'
import TreeMapPlaceholders from './TreeMapPlaceholders'
import TreeMapNode from './TreeMapNode'

const createNodesRenderer = ({
    borderWidth,
    getBorderColor,
    enableLabels,
    getLabel,
    orientLabels,
    labelSkipSize,
    getLabelTextColor,
}) => (nodes, { showTooltip, hideTooltip, theme }) =>
    nodes.map(node => {
        const hasLabel =
            enableLabels &&
            (labelSkipSize === 0 || Math.min(node.style.width, node.style.height) > labelSkipSize)

        return (
            <TreeMapNode
                key={node.key}
                id={node.data.id}
                value={node.data.value}
                dataColor={node.data.color}
                {...node.style}
                borderWidth={borderWidth}
                borderColor={getBorderColor({ ...node.data, color: node.style.color })}
                hasLabel={hasLabel}
                label={hasLabel ? getLabel(node.data) : ''}
                orientLabel={orientLabels}
                labelTextColor={getLabelTextColor({ ...node.data, color: node.style.color })}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                theme={theme}
            />
        )
    })

const TreeMap = props => (
    <TreeMapPlaceholders {...props} namespace="svg">
        {createNodesRenderer(props)}
    </TreeMapPlaceholders>
)

TreeMap.propTypes = _.omit(treeMapPropTypes, ['children', 'namespace'])

export const TreeMapDefaultProps = _.omit(treeMapDefaultProps, [])

const enhance = compose(
    defaultProps(TreeMapDefaultProps),
    withPropsOnChange(['label', 'labelFormat'], ({ label, labelFormat }) => ({
        getLabel: getLabelGenerator(label, labelFormat),
    })),
    withPropsOnChange(['borderColor'], ({ borderColor }) => ({
        getBorderColor: getInheritedColorGenerator(borderColor),
    })),
    withPropsOnChange(['labelTextColor'], ({ labelTextColor }) => ({
        getLabelTextColor: getInheritedColorGenerator(labelTextColor),
    })),
    pure
)

const enhancedTreeMap = enhance(TreeMap)
enhancedTreeMap.displayName = 'enhance(TreeMap)'

export default enhancedTreeMap
