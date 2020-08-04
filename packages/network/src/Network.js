/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, useCallback } from 'react'
import { withContainer, useDimensions, SvgWrapper, useTheme, useMotionConfig } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { NetworkPropTypes, NetworkDefaultProps } from './props'
import { useNetwork, useNodeColor, useLinkThickness } from './hooks'
import AnimatedNodes from './AnimatedNodes'
import StaticNodes from './StaticNodes'
import AnimatedLinks from './AnimatedLinks'
import StaticLinks from './StaticLinks'
import NetworkNodeTooltip from './NetworkNodeTooltip'

const Network = props => {
    const {
        width,
        height,
        margin: partialMargin,

        nodes: rawNodes,
        links: rawLinks,

        linkDistance,
        repulsivity,
        distanceMin,
        distanceMax,
        iterations,

        layers,

        nodeColor,
        nodeBorderWidth,
        nodeBorderColor,

        linkThickness,
        linkColor,
        tooltip,
        isInteractive,
    } = props

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { animate } = useMotionConfig()
    const theme = useTheme()
    const getColor = useNodeColor(nodeColor)
    const getBorderColor = useInheritedColor(nodeBorderColor, theme)
    const getLinkThickness = useLinkThickness(linkThickness)
    const getLinkColor = useInheritedColor(linkColor, theme)

    const [nodes, links] = useNetwork({
        nodes: rawNodes,
        links: rawLinks,
        linkDistance,
        repulsivity,
        distanceMin,
        distanceMax,
        iterations,
        center: [innerWidth / 2, innerHeight / 2],
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleNodeHover = useCallback(
        (node, event) => {
            showTooltipFromEvent(<NetworkNodeTooltip node={node} tooltip={tooltip} />, event)
        },
        [showTooltipFromEvent, tooltip]
    )

    const handleNodeLeave = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

    const layerById = {
        links: React.createElement(animate === true ? AnimatedLinks : StaticLinks, {
            key: 'links',
            links,
            linkThickness: getLinkThickness,
            linkColor: getLinkColor,
        }),
        nodes: React.createElement(animate === true ? AnimatedNodes : StaticNodes, {
            key: 'nodes',
            nodes,
            color: getColor,
            borderWidth: nodeBorderWidth,
            borderColor: getBorderColor,
            handleNodeHover: isInteractive ? handleNodeHover : undefined,
            handleNodeLeave: isInteractive ? handleNodeLeave : undefined,
        }),
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>
                            {layer({
                                ...props,
                                innerWidth,
                                innerHeight,
                                nodes,
                                links,
                            })}
                        </Fragment>
                    )
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

Network.propTypes = NetworkPropTypes
Network.defaultProps = NetworkDefaultProps

export default withContainer(Network)
