import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import {
    ResponsiveDendogram,
    DendogramSvgProps,
    svgDefaultProps as defaults,
    ComputedLink,
    ComputedNode,
} from '@nivo/dendogram'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/dendogram/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groups } from '../../data/components/dendogram/props'
import { generateLightDataSet } from '../../data/components/treemap/generator'

type Datum = ReturnType<typeof generateLightDataSet>

const initialProperties: Pick<
    DendogramSvgProps<any>,
    | 'identity'
    | 'layout'
    | 'nodeSize'
    | 'nodeColor'
    | 'linkThickness'
    | 'linkColor'
    | 'margin'
    | 'animate'
    | 'motionConfig'
    | 'isInteractive'
    | 'useMesh'
    | 'meshDetectionThreshold'
    | 'debugMesh'
> = {
    identity: 'name',
    layout: 'left-to-right',
    nodeSize: defaults.nodeSize,
    nodeColor: { scheme: 'dark2' },
    linkThickness: 2,
    linkColor: defaults.linkColor,

    margin: {
        top: 24,
        right: 24,
        bottom: 24,
        left: 24,
    },

    animate: defaults.animate,
    motionConfig: defaults.motionConfig,

    isInteractive: defaults.isInteractive,
    useMesh: true,
    meshDetectionThreshold: 60,
    debugMesh: true,
}

const TreeMap = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/treemap.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Dendogram"
            meta={meta.Dendogram}
            icon="dendogram"
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
                    <ResponsiveDendogram<Datum>
                        data={data}
                        {...properties}
                        theme={theme}
                        onNodeClick={(node: ComputedNode<Datum>) => {
                            logAction({
                                type: 'click',
                                label: `[node] ${node.pathComponents.join(' / ')}`,
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

export default TreeMap
