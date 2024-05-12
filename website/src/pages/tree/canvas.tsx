import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import {
    ResponsiveTreeCanvas,
    TreeSvgProps,
    svgDefaultProps as defaults,
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
    | 'meshDetectionRadius'
    | 'debugMesh'
    | 'highlightAncestorNodes'
    | 'highlightDescendantNodes'
    | 'highlightAncestorLinks'
    | 'highlightDescendantLinks'
    | 'nodeTooltipPosition'
    | 'nodeTooltipAnchor'
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
    motionConfig: 'stiff',

    isInteractive: defaults.isInteractive,
    isCollapsible: defaults.isCollapsible,
    meshDetectionRadius: 80,
    debugMesh: defaults.debugMesh,
    highlightAncestorNodes: defaults.highlightAncestorNodes,
    highlightDescendantNodes: defaults.highlightDescendantNodes,
    highlightAncestorLinks: defaults.highlightAncestorLinks,
    highlightDescendantLinks: defaults.highlightDescendantLinks,
    nodeTooltipPosition: defaults.nodeTooltipPosition,
    nodeTooltipAnchor: defaults.nodeTooltipAnchor,

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
}

const TreeCanvas = () => {
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
            name="TreeCanvas"
            meta={meta.TreeCanvas}
            icon="tree"
            flavors={meta.flavors}
            currentFlavor="canvas"
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
                    <ResponsiveTreeCanvas<Datum>
                        data={data}
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
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default TreeCanvas
