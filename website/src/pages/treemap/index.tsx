import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveTreeMap, svgDefaultProps as defaults } from '@nivo/treemap'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/treemap/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groups } from '../../data/components/treemap/props'
import { generateLightDataSet } from '../../data/components/treemap/generator'

type Datum = ReturnType<typeof generateLightDataSet>

const initialProperties = {
    identity: 'name',
    value: 'loc',
    valueFormat: { format: '.02s', enabled: true },
    tile: defaults.tile,
    leavesOnly: defaults.leavesOnly,
    innerPadding: defaults.innerPadding,
    outerPadding: defaults.outerPadding,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    enableLabel: true,
    label: defaults.label,
    labelSkipSize: 12,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1.2]],
    },
    orientLabel: defaults.orientLabel,
    enableParentLabel: defaults.enableParentLabel,
    parentLabel: defaults.parentLabel,
    parentLabelSize: defaults.parentLabelSize,
    parentLabelPosition: 'left',
    parentLabelPadding: defaults.parentLabelPadding,
    parentLabelTextColor: {
        from: 'color',
        modifiers: [['darker', 2]],
    },

    colors: defaults.colors,
    colorBy: defaults.colorBy,
    nodeOpacity: defaults.nodeOpacity,
    borderWidth: defaults.borderWidth,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.1]],
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
            name="TreeMap"
            meta={meta.TreeMap}
            icon="treemap"
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
                    <ResponsiveTreeMap<Datum>
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[node] ${node.pathComponents.join(' / ')}: ${
                                    node.formattedValue
                                }`,
                                color: node.color,
                                data: node,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default TreeMap
