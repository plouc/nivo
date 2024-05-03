import { createElement, Fragment, ReactNode, useMemo } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { DefaultDatum, LayerId, TreeSvgProps, CustomLayerProps } from './types'
import { svgDefaultProps } from './defaults'
import { useTree } from './hooks'
import { Links } from './Links'
import { Nodes } from './Nodes'
import { Mesh } from './Mesh'

type InnerTreeProps<Datum> = Omit<
    TreeSvgProps<Datum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerTree = <Datum,>({
    width,
    height,
    margin: partialMargin,
    data,
    identity,
    mode = svgDefaultProps.mode,
    layout = svgDefaultProps.layout,
    nodeSize = svgDefaultProps.nodeSize,
    activeNodeSize,
    inactiveNodeSize,
    nodeColor = svgDefaultProps.nodeColor,
    nodeComponent = svgDefaultProps.nodeComponent,
    linkThickness = svgDefaultProps.linkThickness,
    activeLinkThickness,
    inactiveLinkThickness,
    linkColor = svgDefaultProps.linkColor,
    linkComponent = svgDefaultProps.linkComponent,
    layers = svgDefaultProps.layers,
    isInteractive = svgDefaultProps.isInteractive,
    useMesh = svgDefaultProps.useMesh,
    meshDetectionThreshold = svgDefaultProps.meshDetectionThreshold,
    debugMesh = svgDefaultProps.debugMesh,
    highlightAncestorNodes = svgDefaultProps.highlightAncestorNodes,
    highlightDescendantNodes = svgDefaultProps.highlightDescendantNodes,
    highlightAncestorLinks = svgDefaultProps.highlightAncestorLinks,
    highlightDescendantLinks = svgDefaultProps.highlightDescendantLinks,
    onNodeMouseEnter,
    onNodeMouseMove,
    onNodeMouseLeave,
    onNodeClick,
    nodeTooltip,
    onLinkMouseEnter,
    onLinkMouseMove,
    onLinkMouseLeave,
    onLinkClick,
    linkTooltip,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerTreeProps<Datum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, links, linkGenerator, setCurrentNode } = useTree<Datum>({
        data,
        identity,
        layout,
        mode,
        width: innerWidth,
        height: innerHeight,
        nodeSize,
        activeNodeSize,
        inactiveNodeSize,
        nodeColor,
        highlightAncestorNodes,
        highlightDescendantNodes,
        linkThickness,
        activeLinkThickness,
        inactiveLinkThickness,
        linkColor,
        highlightAncestorLinks,
        highlightDescendantLinks,
    })

    const layerById: Record<LayerId, ReactNode> = {
        links: null,
        nodes: null,
        labels: null,
        mesh: null,
    }

    if (layers.includes('links')) {
        layerById.links = (
            <Links<Datum>
                key="links"
                links={links}
                linkComponent={linkComponent}
                linkGenerator={linkGenerator}
                isInteractive={isInteractive}
                onMouseEnter={onLinkMouseEnter}
                onMouseMove={onLinkMouseMove}
                onMouseLeave={onLinkMouseLeave}
                onClick={onLinkClick}
                tooltip={linkTooltip}
            />
        )
    }

    if (layers.includes('nodes')) {
        layerById.nodes = (
            <Nodes<Datum>
                key="nodes"
                nodes={nodes}
                nodeComponent={nodeComponent}
                isInteractive={isInteractive}
                onMouseEnter={onNodeMouseEnter}
                onMouseMove={onNodeMouseMove}
                onMouseLeave={onNodeMouseLeave}
                onClick={onNodeClick}
                setCurrentNode={setCurrentNode}
                tooltip={nodeTooltip}
            />
        )
    }

    if (layers.includes('mesh') && isInteractive && useMesh) {
        layerById.mesh = (
            <Mesh<Datum>
                key="mesh"
                nodes={nodes}
                width={innerWidth}
                height={innerHeight}
                margin={margin}
                detectionThreshold={meshDetectionThreshold}
                debug={debugMesh}
                onMouseEnter={onNodeMouseEnter}
                onMouseMove={onNodeMouseMove}
                onMouseLeave={onNodeMouseLeave}
                onClick={onNodeClick}
                setCurrentNode={setCurrentNode}
            />
        )
    }

    const customLayerProps: CustomLayerProps<Datum> = useMemo(
        () => ({
            nodes,
            links,
            innerWidth,
            innerHeight,
        }),
        [nodes, links, innerWidth, innerHeight]
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

export const Tree = <Datum = DefaultDatum,>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: TreeSvgProps<Datum>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerTree<Datum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
