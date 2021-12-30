import { Fragment, ReactNode, useCallback, createElement } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { svgDefaultProps } from './defaults'
import { useNetwork } from './hooks'
import { NetworkLinks } from './NetworkLinks'
import { NetworkNodes } from './NetworkNodes'
import { NetworkNodeAnnotations } from './NetworkNodeAnnotations'

import { InputNode, LayerId, NodeTooltip, NetworkSvgProps, ComputedNode } from './types'

type InnerNetworkProps<Node extends InputNode> = Omit<
    NetworkSvgProps<Node>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerNetwork = <Node extends InputNode>({
    width,
    height,
    margin: partialMargin,

    data: { nodes: rawNodes, links: rawLinks },

    linkDistance = svgDefaultProps.linkDistance,
    repulsivity = svgDefaultProps.repulsivity,
    distanceMin = svgDefaultProps.distanceMin,
    distanceMax = svgDefaultProps.distanceMax,
    iterations = svgDefaultProps.iterations,

    layers = svgDefaultProps.layers,

    nodeComponent = svgDefaultProps.nodeComponent as NonNullable<
        NetworkSvgProps<Node>['nodeComponent']
    >,
    nodeSize = svgDefaultProps.nodeSize,
    activeNodeSize = svgDefaultProps.activeNodeSize,
    inactiveNodeSize = svgDefaultProps.inactiveNodeSize,
    nodeColor = svgDefaultProps.nodeColor,
    nodeBlendMode = svgDefaultProps.nodeBlendMode,
    nodeBorderWidth = svgDefaultProps.nodeBorderWidth,
    nodeBorderColor = svgDefaultProps.nodeBorderColor,

    linkComponent = svgDefaultProps.linkComponent as NonNullable<
        NetworkSvgProps<Node>['linkComponent']
    >,
    linkThickness = svgDefaultProps.linkThickness,
    linkColor = svgDefaultProps.linkColor,
    linkBlendMode = svgDefaultProps.linkBlendMode,

    annotations = svgDefaultProps.annotations as NonNullable<NetworkSvgProps<Node>['annotations']>,

    isInteractive = svgDefaultProps.isInteractive,
    nodeTooltip = svgDefaultProps.nodeTooltip as NodeTooltip<Node>,
    onClick,

    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerNetworkProps<Node>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, links, setActiveNodeIds } = useNetwork<Node>({
        center: [innerWidth / 2, innerHeight / 2],
        nodes: rawNodes,
        links: rawLinks,
        linkDistance,
        repulsivity,
        distanceMin,
        distanceMax,
        iterations,
        nodeSize,
        activeNodeSize,
        inactiveNodeSize,
        nodeColor,
        nodeBorderWidth,
        nodeBorderColor,
        linkThickness,
        linkColor,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleNodeHover = useCallback(
        (node: ComputedNode<Node>, event) => {
            showTooltipFromEvent(createElement(nodeTooltip, { node }), event)
            setActiveNodeIds([node.id])
        },
        [showTooltipFromEvent, nodeTooltip, setActiveNodeIds]
    )

    const handleNodeLeave = useCallback(() => {
        hideTooltip()
        setActiveNodeIds([])
    }, [hideTooltip, setActiveNodeIds])

    const layerById: Record<LayerId, ReactNode> = {
        links: null,
        nodes: null,
        annotations: null,
    }

    if (layers.includes('links') && links !== null) {
        layerById.links = (
            <NetworkLinks<Node>
                key="links"
                links={links}
                linkComponent={linkComponent}
                blendMode={linkBlendMode}
            />
        )
    }

    if (layers.includes('nodes') && nodes !== null) {
        layerById.nodes = (
            <NetworkNodes<Node>
                key="nodes"
                nodes={nodes}
                nodeComponent={nodeComponent}
                blendMode={nodeBlendMode}
                onClick={isInteractive ? onClick : undefined}
                onMouseEnter={isInteractive ? handleNodeHover : undefined}
                onMouseMove={isInteractive ? handleNodeHover : undefined}
                onMouseLeave={isInteractive ? handleNodeLeave : undefined}
            />
        )
    }

    if (layers.includes('annotations') && nodes !== null) {
        layerById.annotations = (
            <NetworkNodeAnnotations<Node>
                key="annotations"
                nodes={nodes}
                annotations={annotations}
            />
        )
    }

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>
                            {createElement(layer, {
                                // ...props,
                                // innerWidth,
                                // innerHeight,
                                nodes: nodes || [],
                                links: links || [],
                            })}
                        </Fragment>
                    )
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const Network = <Node extends InputNode = InputNode>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: NetworkSvgProps<Node>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerNetwork<Node> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
