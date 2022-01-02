import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveTreeMapCanvas, canvasDefaultProps as defaults } from '@nivo/treemap'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/treemap/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groups } from '../../data/components/treemap/props'
import { generateHeavyDataSet } from '../../data/components/treemap/generator'

type Datum = ReturnType<typeof generateHeavyDataSet>['root']

const initialProperties = {
    identity: defaults.identity,
    value: defaults.value,
    valueFormat: { format: '.02s', enabled: true },
    tile: defaults.tile,
    leavesOnly: true,
    innerPadding: 0,
    outerPadding: 0,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    enableLabel: true,
    label: defaults.label,
    labelSkipSize: 18,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 3]],
    },
    orientLabel: defaults.orientLabel,

    colors: { scheme: 'spectral' },
    colorBy: 'id',
    nodeOpacity: defaults.nodeOpacity,
    borderWidth: defaults.borderWidth,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },

    animate: defaults.animate,
    motionConfig: defaults.motionConfig,

    isInteractive: defaults.isInteractive,
}

const TreeMapCanvas = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/treemap-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="TreeMapCanvas"
            meta={meta.TreeMapCanvas}
            icon="treemap"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaults}
            propertiesMapper={mapper}
            generateData={generateHeavyDataSet}
            getTabData={data => data.root}
            getDataSize={data => data.nodeCount}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveTreeMapCanvas<Datum>
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

export default TreeMapCanvas
