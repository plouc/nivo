import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveDendogram, svgDefaultProps as defaults } from '@nivo/dendogram'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/dendogram/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groups } from '../../data/components/dendogram/props'
import { generateLightDataSet } from '../../data/components/treemap/generator'

type Datum = ReturnType<typeof generateLightDataSet>

const initialProperties = {
    identity: 'name',
    layout: defaults.layout,
    linkThickness: defaults.linkThickness,

    margin: {
        top: 24,
        right: 24,
        bottom: 24,
        left: 24,
    },

    animate: defaults.animate,
    motionConfig: defaults.motionConfig,

    isInteractive: defaults.isInteractive,
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
                        onNodeClick={node => {
                            logAction({
                                type: 'click',
                                label: `[node] ${node.pathComponents.join(' / ')}`,
                                data: node,
                            })
                        }}
                        onLinkClick={link => {
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
