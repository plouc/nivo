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
    TreeSvgProps<any>,
    | 'identity'
    | 'mode'
    | 'layout'
    | 'nodeSize'
    | 'activeNodeSize'
    | 'inactiveNodeSize'
    | 'nodeColor'
    | 'linkThickness'
    | 'activeLinkThickness'
    | 'inactiveLinkThickness'
    | 'linkColor'
    | 'margin'
    | 'animate'
    | 'motionConfig'
    | 'isInteractive'
    | 'useMesh'
    | 'meshDetectionThreshold'
    | 'debugMesh'
    | 'highlightAncestorNodes'
    | 'highlightDescendantNodes'
    | 'highlightAncestorLinks'
    | 'highlightDescendantLinks'
> = {
    identity: 'name',
    mode: defaults.mode,
    layout: 'left-to-right',
    nodeSize: 12,
    activeNodeSize: 24,
    inactiveNodeSize: 12,
    nodeColor: { scheme: 'dark2' },
    linkThickness: 2,
    activeLinkThickness: 8,
    inactiveLinkThickness: 2,
    linkColor: defaults.linkColor,

    margin: {
        top: 24,
        right: 24,
        bottom: 24,
        left: 24,
    },

    animate: defaults.animate,
    motionConfig: 'stiff',

    isInteractive: defaults.isInteractive,
    useMesh: true,
    meshDetectionThreshold: 80,
    debugMesh: defaults.debugMesh,
    highlightAncestorNodes: defaults.highlightAncestorNodes,
    highlightDescendantNodes: defaults.highlightDescendantNodes,
    highlightAncestorLinks: defaults.highlightAncestorLinks,
    highlightDescendantLinks: defaults.highlightDescendantLinks,
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
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveTree<Datum>
                        data={data}
                        {...properties}
                        theme={theme}
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
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Tree
