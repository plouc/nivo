/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { uniq } from 'lodash'
import { SvgWrapper, useDimensions, withContainer } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import { SankeyDefaultProps, SankeyPropTypes } from './props'
import { useSankey } from './hooks'
import SankeyNodes from './SankeyNodes'
import SankeyLinks from './SankeyLinks'
import SankeyLabels from './SankeyLabels'

const Sankey = ({
    data,
    layout,
    sort,
    align,
    width,
    height,
    margin: partialMargin,
    colors,
    nodeThickness,
    nodeSpacing,
    nodeInnerPadding,
    nodeBorderColor,
    nodeOpacity,
    nodeHoverOpacity,
    nodeHoverOthersOpacity,
    nodeBorderWidth,
    linkOpacity,
    linkHoverOpacity,
    linkHoverOthersOpacity,
    linkContract,
    linkBlendMode,
    enableLinkGradient,
    enableLabels,
    labelPosition,
    labelPadding,
    labelOrientation,
    label,
    labelFormat,
    labelTextColor,
    nodeTooltip,
    linkTooltip,
    isInteractive,
    onClick,
    tooltipFormat,
    legends,
    layers,
}) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        nodes,
        links,
        legendData,
        getNodeBorderColor,
        currentNode,
        setCurrentNode,
        currentLink,
        setCurrentLink,
        getLabelTextColor,
    } = useSankey({
        data,
        layout,
        width: innerWidth,
        height: innerHeight,
        sort,
        align,
        colors,
        nodeThickness,
        nodeSpacing,
        nodeInnerPadding,
        nodeBorderColor,
        label,
        labelFormat,
        labelTextColor,
    })

    let isCurrentNode = () => false
    let isCurrentLink = () => false

    if (currentLink) {
        isCurrentNode = ({ id }) => id === currentLink.source.id || id === currentLink.target.id
        isCurrentLink = ({ source, target }) =>
            source.id === currentLink.source.id && target.id === currentLink.target.id
    }

    if (currentNode) {
        let currentNodeIds = [currentNode.id]
        links
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

    const layerProps = {
        links,
        nodes,
        margin,
        width,
        height,
        outerWidth,
        outerHeight,
    }

    const layerById = {
        links: (
            <SankeyLinks
                key="links"
                links={links}
                layout={layout}
                linkContract={linkContract}
                linkOpacity={linkOpacity}
                linkHoverOpacity={linkHoverOpacity}
                linkHoverOthersOpacity={linkHoverOthersOpacity}
                linkBlendMode={linkBlendMode}
                enableLinkGradient={enableLinkGradient}
                setCurrentLink={setCurrentLink}
                currentNode={currentNode}
                currentLink={currentLink}
                isCurrentLink={isCurrentLink}
                isInteractive={isInteractive}
                onClick={onClick}
                tooltip={linkTooltip}
                tooltipFormat={tooltipFormat}
            />
        ),
        nodes: (
            <SankeyNodes
                key="nodes"
                nodes={nodes}
                nodeOpacity={nodeOpacity}
                nodeHoverOpacity={nodeHoverOpacity}
                nodeHoverOthersOpacity={nodeHoverOthersOpacity}
                nodeBorderWidth={nodeBorderWidth}
                getNodeBorderColor={getNodeBorderColor}
                setCurrentNode={setCurrentNode}
                currentNode={currentNode}
                currentLink={currentLink}
                isCurrentNode={isCurrentNode}
                isInteractive={isInteractive}
                onClick={onClick}
                tooltip={nodeTooltip}
                tooltipFormat={tooltipFormat}
            />
        ),
        labels: null,
        legends: legends.map((legend, i) => (
            <BoxLegendSvg
                key={`legend${i}`}
                {...legend}
                containerWidth={innerWidth}
                containerHeight={innerHeight}
                data={legendData}
            />
        )),
    }

    if (enableLabels) {
        layerById.labels = (
            <SankeyLabels
                key="labels"
                nodes={nodes}
                layout={layout}
                width={innerWidth}
                height={innerHeight}
                labelPosition={labelPosition}
                labelPadding={labelPadding}
                labelOrientation={labelOrientation}
                getLabelTextColor={getLabelTextColor}
            />
        )
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{layer(layerProps)}</Fragment>
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

Sankey.propTypes = SankeyPropTypes

const WrappedSankey = withContainer(Sankey)
WrappedSankey.defaultProps = SankeyDefaultProps

export default WrappedSankey
