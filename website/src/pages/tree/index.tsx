import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ResponsiveTree, svgDefaultProps as defaults, ComputedLink, ComputedNode } from '@nivo/tree'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/tree/meta.yml'
import { MappedTreeSvgProps } from '../../data/components/tree/mapper'
import { groups } from '../../data/components/tree/props'
import { generateLightDataSet } from '../../data/components/treemap/generator'

type Datum = ReturnType<typeof generateLightDataSet>

const initialProperties: MappedTreeSvgProps<Datum> = {
    identity: 'name',
    mode: defaults.mode,
    layout: defaults.layout,
    nodeSize: 12,
    activeNodeSize: 24,
    inactiveNodeSize: 12,
    nodeColor: { scheme: 'tableau10' },
    fixNodeColorAtDepth: 1,
    linkCurve: defaults.linkCurve,
    linkThickness: 2,
    activeLinkThickness: 8,
    inactiveLinkThickness: 2,
    linkColor: { from: 'target.color', modifiers: [['opacity', 0.4]] },
    enableLabel: defaults.enableLabel,
    labelsPosition: defaults.labelsPosition,
    orientLabel: defaults.orientLabel,
    labelOffset: defaults.labelOffset,
    margin: {
        top: 90,
        right: 90,
        bottom: 90,
        left: 90,
    },
    animate: defaults.animate,
    motionConfig: defaults.motionConfig,
    isInteractive: defaults.isInteractive,
    useMesh: true,
    meshDetectionRadius: 80,
    debugMesh: defaults.debugMesh,
    highlightAncestorNodes: defaults.highlightAncestorNodes,
    highlightDescendantNodes: defaults.highlightDescendantNodes,
    highlightAncestorLinks: defaults.highlightAncestorLinks,
    highlightDescendantLinks: defaults.highlightDescendantLinks,
    nodeTooltipPosition: defaults.nodeTooltipPosition,
    nodeTooltipAnchor: defaults.nodeTooltipAnchor,
    linkTooltipAnchor: defaults.linkTooltipAnchor,
}

const Tree = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/tree.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<MappedTreeSvgProps<Datum>, MappedTreeSvgProps<Datum>, Datum>
            name="Tree"
            meta={meta.Tree}
            icon="tree"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaults}
            generateData={generateLightDataSet}
            enableDiceRoll={false}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveTree<Datum>
                        {...properties}
                        data={data}
                        ref={chartRef as Ref<SVGSVGElement>}
                        debounceResize={200}
                        theme={{
                            ...theme,
                            labels: {
                                ...theme.labels,
                                text: {
                                    ...theme.labels?.text,
                                    outlineWidth: 2,
                                    outlineColor: theme.background,
                                },
                            },
                        }}
                        onNodeClick={(node: ComputedNode<Datum>) => {
                            logAction({
                                type: 'click',
                                label: `[node] ${node.path.join(' / ')}`,
                                data: node,
                                color: node.color,
                            })
                        }}
                        onLinkClick={(link: ComputedLink<Datum>) => {
                            logAction({
                                type: 'click',
                                label: `[link] ${link.source.id} > ${link.target.id}`,
                                data: link,
                                color: link.color,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Tree
