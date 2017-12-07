/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { cloneDeep, uniq } from 'lodash'
import { sankey as d3Sankey } from 'd3-sankey'
import { Container, SvgWrapper } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import SankeyNodes from './SankeyNodes'
import SankeyLinks from './SankeyLinks'
import SankeyLabels from './SankeyLabels'
import { SankeyPropTypes, sankeyAlignmentFromProp } from './props'
import enhance from './enhance'

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
    nodeHoverOthersOpacity,
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
    linkHoverOthersOpacity,
    linkContract,
    getLinkColor, // computed
    setCurrentLink, // injected
    currentLink, // injected

    // labels
    enableLabels,
    getLabel,
    labelPosition,
    labelPadding,
    labelOrientation,
    getLabelTextColor, // computed

    // theming
    theme,
    getColor, // computed

    // tooltip
    nodeTooltip,
    linkTooltip,

    // motion
    animate,
    motionDamping,
    motionStiffness,

    // interactivity
    isInteractive,
    onClick,
    tooltipFormat,

    legends,
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
        node.label = getLabel(node)
        node.x = node.x0 + nodePaddingX
        node.y = node.y0
        node.width = Math.max(node.x1 - node.x0 - nodePaddingX * 2, 0)
        node.height = Math.max(node.y1 - node.y0, 0)
    })

    data.links.forEach(link => {
        link.color = getLinkColor(link)
    })

    const legendData = data.nodes.map(node => ({
        label: node.label,
        fill: node.color,
    }))

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    let isCurrentNode = () => false
    let isCurrentLink = () => false

    if (currentLink) {
        isCurrentNode = ({ id }) => id === currentLink.source.id || id === currentLink.target.id
        isCurrentLink = ({ source, target }) =>
            source.id === currentLink.source.id && target.id === currentLink.target.id
    }

    if (currentNode) {
        let currentNodeIds = [currentNode.id]
        data.links
            .filter(
                ({ source, target }) => source.id === currentNode.id || target.id === currentNode.id
            )
            .forEach(({ source, target }) => {
                currentNodeIds.push(source.id)
                currentNodeIds.push(target.id)
            })

        currentNodeIds = uniq(currentNodeIds)
        isCurrentNode = ({ id }) => currentNodeIds.includes(id)
        isCurrentLink = ({ source, target }) =>
            source.id === currentNode.id || target.id === currentNode.id
    }

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                    <SankeyLinks
                        links={data.links}
                        linkContract={linkContract}
                        linkOpacity={linkOpacity}
                        linkHoverOpacity={linkHoverOpacity}
                        linkHoverOthersOpacity={linkHoverOthersOpacity}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        setCurrentLink={setCurrentLink}
                        currentNode={currentNode}
                        currentLink={currentLink}
                        isCurrentLink={isCurrentLink}
                        onClick={onClick}
                        tooltip={linkTooltip}
                        theme={theme}
                        tooltipFormat={tooltipFormat}
                        {...motionProps}
                    />
                    <SankeyNodes
                        nodes={data.nodes}
                        nodePaddingX={nodePaddingX}
                        nodeOpacity={nodeOpacity}
                        nodeHoverOpacity={nodeHoverOpacity}
                        nodeHoverOthersOpacity={nodeHoverOthersOpacity}
                        nodeBorderWidth={nodeBorderWidth}
                        getNodeBorderColor={getNodeBorderColor}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        setCurrentNode={setCurrentNode}
                        currentNode={currentNode}
                        currentLink={currentLink}
                        isCurrentNode={isCurrentNode}
                        onClick={onClick}
                        tooltip={nodeTooltip}
                        theme={theme}
                        tooltipFormat={tooltipFormat}
                        {...motionProps}
                    />
                    {enableLabels && (
                        <SankeyLabels
                            nodes={data.nodes}
                            width={width}
                            labelPosition={labelPosition}
                            labelPadding={labelPadding}
                            labelOrientation={labelOrientation}
                            getLabelTextColor={getLabelTextColor}
                            theme={theme}
                            {...motionProps}
                        />
                    )}
                    {legends.map((legend, i) => (
                        <BoxLegendSvg
                            key={i}
                            {...legend}
                            containerWidth={width}
                            containerHeight={height}
                            data={legendData}
                        />
                    ))}
                </SvgWrapper>
            )}
        </Container>
    )
}

Sankey.propTypes = SankeyPropTypes

export default enhance(Sankey)
