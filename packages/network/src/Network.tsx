import { Fragment, ReactNode, createElement, useMemo } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { svgDefaultProps } from './defaults'
import { useNetwork } from './hooks'
import { NetworkLinks } from './NetworkLinks'
import { NetworkNodes } from './NetworkNodes'
import { NetworkNodeAnnotations } from './NetworkNodeAnnotations'
import {
    InputNode,
    LayerId,
    NodeTooltip,
    NetworkSvgProps,
    InputLink,
    CustomLayerProps,
} from './types'

type InnerNetworkProps<Node extends InputNode, Link extends InputLink> = Omit<
    NetworkSvgProps<Node, Link>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerNetwork = <Node extends InputNode, Link extends InputLink>({
    width,
    height,
    margin: partialMargin,

    data: { nodes: rawNodes, links: rawLinks },

    linkDistance = svgDefaultProps.linkDistance,
    centeringStrength = svgDefaultProps.centeringStrength,
    repulsivity = svgDefaultProps.repulsivity,
    distanceMin = svgDefaultProps.distanceMin,
    distanceMax = svgDefaultProps.distanceMax,
    iterations = svgDefaultProps.iterations,

    layers = svgDefaultProps.layers,

    nodeComponent = svgDefaultProps.nodeComponent,
    nodeSize = svgDefaultProps.nodeSize,
    activeNodeSize = svgDefaultProps.activeNodeSize,
    inactiveNodeSize = svgDefaultProps.inactiveNodeSize,
    nodeColor = svgDefaultProps.nodeColor,
    nodeBorderWidth = svgDefaultProps.nodeBorderWidth,
    nodeBorderColor = svgDefaultProps.nodeBorderColor,

    linkComponent = svgDefaultProps.linkComponent,
    linkThickness = svgDefaultProps.linkThickness,
    linkColor = svgDefaultProps.linkColor,
    linkBlendMode = svgDefaultProps.linkBlendMode,

    annotations = svgDefaultProps.annotations as NonNullable<
        NetworkSvgProps<Node, Link>['annotations']
    >,

    isInteractive = svgDefaultProps.isInteractive,
    defaultActiveNodeIds = svgDefaultProps.defaultActiveNodeIds,
    nodeTooltip = svgDefaultProps.nodeTooltip as NodeTooltip<Node>,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,

    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerNetworkProps<Node, Link>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, links, activeNodeIds, setActiveNodeIds } = useNetwork<Node, Link>({
        center: [innerWidth / 2, innerHeight / 2],
        nodes: rawNodes,
        links: rawLinks,
        linkDistance,
        centeringStrength,
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
        isInteractive,
        defaultActiveNodeIds,
    })

    const layerById: Record<LayerId, ReactNode> = {
        links: null,
        nodes: null,
        annotations: null,
    }

    if (layers.includes('links') && links !== null) {
        layerById.links = (
            <NetworkLinks<Node, Link>
                key="links"
                links={links}
                linkComponent={linkComponent}
                blendMode={linkBlendMode}
            />
        )
    }

    if (layers.includes('nodes') && nodes !== null) {
        layerById.nodes = (
            <NetworkNodes<Node, Link>
                key="nodes"
                nodes={nodes}
                nodeComponent={nodeComponent}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                tooltip={nodeTooltip}
                setActiveNodeIds={setActiveNodeIds}
                isInteractive={isInteractive}
            />
        )
    }

    if (layers.includes('annotations') && nodes !== null) {
        layerById.annotations = (
            <NetworkNodeAnnotations<Node, Link>
                key="annotations"
                nodes={nodes}
                annotations={annotations}
            />
        )
    }

    const customLayerProps: CustomLayerProps<Node, Link> = useMemo(
        () => ({
            nodes: nodes || [],
            links: links || [],
            activeNodeIds,
            setActiveNodeIds,
        }),
        [nodes, links, activeNodeIds, setActiveNodeIds]
    )

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
                    return <Fragment key={i}>{createElement(layer, customLayerProps)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const Network = <Node extends InputNode = InputNode, Link extends InputLink = InputLink>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: NetworkSvgProps<Node, Link>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerNetwork<Node, Link> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
