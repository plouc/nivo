import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { svgDefaultProps, ResponsiveIcicle } from '@nivo/icicle'
import { generateLibTree } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/icicle/meta.yml'
import mapper from '../../data/components/icicle/mapper'
import { groups } from '../../data/components/icicle/props'

const generateData = () => generateLibTree()

const initialProperties = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    identity: 'name',
    value: 'loc',
    valueFormat: { format: '', enabled: false },
    orientation: svgDefaultProps.orientation,
    padding: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: { theme: 'background' },
    colors: { scheme: 'nivo' },
    colorBy: 'id',
    inheritColorFromParent: true,
    childColor: {
        from: 'color',
        modifiers: [['brighter', 0.1]],
    },
    enableRectLabels: true,
    rectLabel: 'id',
    rectLabelsTextColor: {
        from: 'color',
        modifiers: [['darker', 1.4]],
    },
    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
    defs: [],
    fill: [],
    isInteractive: true,
    enableZooming: svgDefaultProps.enableZooming,
    zoomMode: svgDefaultProps.zoomMode,
    'custom tooltip example': false,
    tooltip: null,
    'showcase pattern usage': false,
    rectLabelsSkipWidth: 32,
    rectLabelsSkipHeight: 32,
    rectLabelsOffsetX: svgDefaultProps.rectLabelsOffsetX,
    rectLabelsOffsetY: svgDefaultProps.rectLabelsOffsetY,
}

const Icicle = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/icicle.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Icicle"
            meta={meta.Icicle}
            icon="icicle"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            defaultProperties={svgDefaultProps}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            generateData={generateData}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveIcicle
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node =>
                            logAction({
                                type: 'click',
                                label: `[node] ${node.id} - ${node.value}: ${
                                    Math.round(node.percentage * 100) / 100
                                }%`,
                                color: node.color,
                                // prevent cyclic dependency
                                data: node,
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Icicle
