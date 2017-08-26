/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { sankey as d3Sankey } from 'd3-sankey'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { withColors, withTheme, withDimensions, withMotion } from '../../../hocs'
import { sankeyAlignmentPropType, sankeyAlignmentFromProp } from '../../../props'
import SvgWrapper from '../SvgWrapper'
import SankeyNodes from './SankeyNodes'
import SankeyLinks from './SankeyLinks'
import SankeyLabels from './SankeyLabels'
import Container from '../Container'

const getId = d => d.id

const Sankey = ({
    data: _data,

    align,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    // nodes
    nodeOpacity,
    nodeHoverOpacity,
    nodeWidth,
    nodePaddingX,
    nodePaddingY,
    nodeBorderWidth,
    getNodeBorderColor, // computed
    setCurrentNode, // injected
    currentNode, // injected

    // links
    linkOpacity,
    linkHoverOpacity,
    linkContract,
    getLinkColor, // computed
    setCurrentLink, // injected
    currentLink, // injected

    // labels
    enableLabels,
    labelPosition,
    labelPadding,
    labelOrientation,
    getLabelTextColor, // computed

    // theming
    theme,
    getColor, // computed

    // motion
    animate,
    motionDamping,
    motionStiffness,

    // interactivity
    isInteractive,
}) => {
    const sankey = d3Sankey()
        .nodeAlign(sankeyAlignmentFromProp(align))
        .nodeWidth(nodeWidth)
        .nodePadding(nodePaddingY)
        .size([width, height])
        .nodeId(getId)

    // deep clone is required as the sankey diagram mutates data
    const data = cloneDeep(_data)
    sankey(data)

    data.nodes.forEach(node => {
        node.color = getColor(node)
        node.x = node.x0 + nodePaddingX
        node.y = node.y0
        node.width = Math.max(node.x1 - node.x0 - nodePaddingX * 2, 0)
        node.height = Math.max(node.y1 - node.y0, 0)
    })

    data.links.forEach(link => {
        link.color = getLinkColor(link)
    })

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) =>
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                    <SankeyLinks
                        links={data.links}
                        linkContract={linkContract}
                        linkOpacity={linkOpacity}
                        linkHoverOpacity={linkHoverOpacity}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        theme={theme}
                        {...motionProps}
                    />
                    <SankeyNodes
                        nodes={data.nodes}
                        nodePaddingX={nodePaddingX}
                        nodeOpacity={nodeOpacity}
                        nodeHoverOpacity={nodeHoverOpacity}
                        nodeBorderWidth={nodeBorderWidth}
                        getNodeBorderColor={getNodeBorderColor}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        theme={theme}
                        {...motionProps}
                    />
                    {enableLabels &&
                        <SankeyLabels
                            nodes={data.nodes}
                            width={width}
                            labelPosition={labelPosition}
                            labelPadding={labelPadding}
                            labelOrientation={labelOrientation}
                            getLabelTextColor={getLabelTextColor}
                            theme={theme}
                            {...motionProps}
                        />}
                </SvgWrapper>}
        </Container>
    )
}

Sankey.propTypes = {
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            })
        ).isRequired,
        links: PropTypes.arrayOf(
            PropTypes.shape({
                source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            })
        ).isRequired,
    }).isRequired,

    align: sankeyAlignmentPropType.isRequired,

    // nodes
    nodeOpacity: PropTypes.number.isRequired,
    nodeHoverOpacity: PropTypes.number.isRequired,
    nodeWidth: PropTypes.number.isRequired,
    nodePaddingX: PropTypes.number.isRequired,
    nodePaddingY: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    nodeBorderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // links
    linkOpacity: PropTypes.number.isRequired,
    linkHoverOpacity: PropTypes.number.isRequired,
    linkContract: PropTypes.number.isRequired,

    // labels
    enableLabels: PropTypes.bool.isRequired,
    labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
    labelPadding: PropTypes.number.isRequired,
    labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    getLabelTextColor: PropTypes.func.isRequired, // computed

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
}

export const SankeyDefaultProps = {
    align: 'center',

    // nodes
    nodeOpacity: 0.65,
    nodeHoverOpacity: 1,
    nodeWidth: 12,
    nodePaddingX: 0,
    nodePaddingY: 12,
    nodeBorderWidth: 1,
    nodeBorderColor: 'inherit:darker(0.5)',

    // links
    linkOpacity: 0.2,
    linkHoverOpacity: 0.4,
    linkContract: 0,

    // labels
    enableLabels: true,
    labelPosition: 'inside',
    labelPadding: 9,
    labelOrientation: 'horizontal',
    labelTextColor: 'inherit:darker(0.8)',

    // interactivity
    isInteractive: true,
}

const enhance = compose(
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
    pure
)

export default enhance(Sankey)
