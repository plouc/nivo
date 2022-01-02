import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveTreeMapHtml, htmlDefaultProps as defaults } from '@nivo/treemap'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/treemap/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groups } from '../../data/components/treemap/props'
import { generateLightDataSet } from '../../data/components/treemap/generator'

interface Datum {
    name: string
    loc?: number
    color: string
    children?: Datum[]
}

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
        modifiers: [['darker', 2]],
    },
    orientLabel: defaults.orientLabel,
    enableParentLabel: defaults.enableParentLabel,
    parentLabel: defaults.parentLabel,
    parentLabelSize: defaults.parentLabelSize,
    parentLabelPosition: defaults.parentLabelPosition,
    parentLabelPadding: defaults.parentLabelPadding,
    parentLabelTextColor: {
        from: 'color',
        modifiers: [['darker', 3]],
    },

    colors: { scheme: 'yellow_orange_red' },
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

const TreeMapHtml = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/treemap-html.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="TreeMapHtml"
            meta={meta.TreeMapHtml}
            icon="treemap"
            flavors={meta.flavors}
            currentFlavor="html"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaults}
            propertiesMapper={mapper}
            generateData={generateLightDataSet}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveTreeMapHtml<Datum>
                        data={data.root}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[node] ${node.id}: ${node.formattedValue}`,
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

export default TreeMapHtml
