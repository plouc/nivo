/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import cloneDeep from 'lodash/cloneDeep'
import uniq from 'lodash/uniq'
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

    margin,
    width,
    height,
    outerWidth,
    outerHeight,

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

    linkOpacity,
    linkHoverOpacity,
    linkHoverOthersOpacity,
    linkContract,
    linkBlendMode,
    enableLinkGradient,
    getLinkColor, // computed
    setCurrentLink, // injected
    currentLink, // injected

    enableLabels,
    getLabel,
    labelPosition,
    labelPadding,
    labelOrientation,
    getLabelTextColor, // computed

    theme,
    getColor, // computed

    nodeTooltip,
    linkTooltip,

    animate,
    motionDamping,
    motionStiffness,

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
        id: node.id,
        label: node.label,
        color: node.color,
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
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
                    <SankeyLinks
                        links={data.links}
                        linkContract={linkContract}
                        linkOpacity={linkOpacity}
                        linkHoverOpacity={linkHoverOpacity}
                        linkHoverOthersOpacity={linkHoverOthersOpacity}
                        linkBlendMode={linkBlendMode}
                        enableLinkGradient={enableLinkGradient}
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
                            theme={theme}
                        />
                    ))}
                </SvgWrapper>
            )}
        </Container>
    )
}

Sankey.propTypes = SankeyPropTypes

const enhancedSankey = enhance(Sankey)
enhancedSankey.displayName = 'Sankey'

export default enhancedSankey
