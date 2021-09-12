import { Fragment, ReactNode, useCallback, createElement } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { svgDefaultProps } from './defaults'
import { useNetwork } from './hooks'
import { NetworkNodes } from './NetworkNodes'
import { NetworkLinks } from './NetworkLinks'
import { NetworkInputNode, NetworkLayerId, NetworkSvgProps } from './types'

type InnerNetworkProps<N extends NetworkInputNode> = Omit<
    NetworkSvgProps<N>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerNetwork = <N extends NetworkInputNode>({
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

    nodeComponent = svgDefaultProps.nodeComponent,
    nodeColor = svgDefaultProps.nodeColor,
    nodeBorderWidth = svgDefaultProps.nodeBorderWidth,
    nodeBorderColor = svgDefaultProps.nodeBorderColor,

    linkComponent = svgDefaultProps.linkComponent,
    linkThickness = svgDefaultProps.linkThickness,
    linkColor = svgDefaultProps.linkColor,

    isInteractive = svgDefaultProps.isInteractive,
    nodeTooltip = svgDefaultProps.nodeTooltip,
    onClick,

    role = svgDefaultProps.role,
}: InnerNetworkProps<N>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const [nodes, links] = useNetwork<N>({
        nodes: rawNodes,
        links: rawLinks,
        linkDistance,
        repulsivity,
        distanceMin,
        distanceMax,
        iterations,
        center: [innerWidth / 2, innerHeight / 2],
        nodeColor,
        nodeBorderWidth,
        nodeBorderColor,
        linkThickness,
        linkColor,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleNodeHover = useCallback(
        (node, event) => {
            showTooltipFromEvent(createElement(nodeTooltip, { node }), event)
        },
        [showTooltipFromEvent, nodeTooltip]
    )

    const handleNodeLeave = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

    const layerById: Record<NetworkLayerId, ReactNode> = {
        links: null,
        nodes: null,
    }

    if (layers.includes('links') && links !== null) {
        layerById.links = (
            <NetworkLinks<N> key="links" links={links} linkComponent={linkComponent} />
        )
    }

    if (layers.includes('nodes') && nodes !== null) {
        layerById.nodes = (
            <NetworkNodes<N>
                key="nodes"
                nodes={nodes}
                nodeComponent={nodeComponent}
                onClick={isInteractive ? onClick : undefined}
                onMouseEnter={isInteractive ? handleNodeHover : undefined}
                onMouseMove={isInteractive ? handleNodeHover : undefined}
                onMouseLeave={isInteractive ? handleNodeLeave : undefined}
            />
        )
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} role={role}>
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

export const Network = <N extends NetworkInputNode = NetworkInputNode>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: NetworkSvgProps<N>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerNetwork<N> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
