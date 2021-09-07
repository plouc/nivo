import { Fragment, ReactNode, useCallback } from 'react'
import { Container, useDimensions, SvgWrapper, useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { svgDefaultProps } from './props'
import { useNetwork, useNodeColor, useLinkThickness } from './hooks'
import { NetworkNodes } from './NetworkNodes'
import { NetworkLinks } from './NetworkLinks'
import NetworkNodeTooltip from './NetworkNodeTooltip'
import { NetworkLayerId, NetworkSvgProps } from './types'

type InnerNetworkProps = Omit<
    NetworkSvgProps,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerNetwork = (props: InnerNetworkProps) => {
    const {
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

        nodeColor = svgDefaultProps.nodeColor,
        nodeBorderWidth = svgDefaultProps.nodeBorderWidth,
        nodeBorderColor = svgDefaultProps.nodeBorderColor,

        linkThickness = svgDefaultProps.linkThickness,
        linkColor = svgDefaultProps.linkColor,

        tooltip = svgDefaultProps.tooltip,
        isInteractive = svgDefaultProps.isInteractive,
        onClick,

        role = svgDefaultProps.role,
    } = props

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

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

    const layerById: Record<NetworkLayerId, ReactNode> = {
        links: null,
        nodes: null,
    }

    if (layers.includes('links')) {
        layerById.links = (
            <NetworkLinks
                key="links"
                links={links}
                linkThickness={getLinkThickness}
                linkColor={getLinkColor}
            />
        )
    }

    if (layers.includes('crap')) {
        layerById.nodes = (
            <NetworkNodes
                key="nodes"
                nodes={nodes}
                color={getColor}
                borderWidth={nodeBorderWidth}
                borderColor={getBorderColor}
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

export const Network = ({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: NetworkSvgProps) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerNetwork isInteractive={isInteractive} {...otherProps} />
    </Container>
)
