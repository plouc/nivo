import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import {
    ResponsiveTree,
    TreeSvgProps,
    svgDefaultProps as defaults,
    ComputedLink,
    ComputedNode,
} from '@nivo/tree'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/tree/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groups } from '../../data/components/tree/props'
import { generateLightDataSet } from '../../data/components/treemap/generator'

type Datum = ReturnType<typeof generateLightDataSet>

const initialProperties: Pick<
    TreeSvgProps<Datum>,
    | 'identity'
    | 'mode'
    | 'layout'
    | 'nodeSize'
    | 'activeNodeSize'
    | 'inactiveNodeSize'
    | 'nodeColor'
    | 'fixNodeColorAtDepth'
    | 'linkCurve'
    | 'linkThickness'
    | 'activeLinkThickness'
    | 'inactiveLinkThickness'
    | 'linkColor'
    | 'enableLabel'
    | 'labelsPosition'
    | 'orientLabel'
    | 'labelOffset'
    | 'margin'
    | 'animate'
    | 'motionConfig'
    | 'isInteractive'
    | 'isCollapsible'
    | 'useMesh'
    | 'meshDetectionRadius'
    | 'debugMesh'
    | 'highlightAncestorNodes'
    | 'highlightDescendantNodes'
    | 'highlightAncestorLinks'
    | 'highlightDescendantLinks'
    | 'nodeTooltipAnchor'
    | 'nodeTooltipPosition'
    | 'linkTooltipAnchor'
> = {
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
    motionConfig: 'gentle',

    isInteractive: defaults.isInteractive,
    isCollapsible: defaults.isCollapsible,
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

const sampleData: Datum = {
    name: 'root',
    children: [
        { name: 'A' },
        { name: 'B' },
        { name: 'C', children: [{ name: '0' }, { name: '1' }, { name: '2' }] },
    ],
}

const Tree = () => {
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
        <ComponentTemplate
            name="Tree"
            meta={meta.Tree}
            icon="tree"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaults}
            propertiesMapper={mapper}
            generateData={generateLightDataSet}
            enableDiceRoll={false}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveTree<Datum>
                        data={sampleData}
                        {...properties}
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
                        motionConfig="wobbly"
                        // useMesh={false}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Tree
