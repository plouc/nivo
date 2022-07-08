import React from 'react'
import { defaultProps, ResponsiveIcicles } from '@nivo/icicles'
import { generateLibTree } from '@nivo/generators'
import { omit } from 'lodash'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/icicles/meta.yml'
import mapper from '../../data/components/icicles/mapper'
import { groups } from '../../data/components/icicles/props'
import { graphql, useStaticQuery } from 'gatsby'

const Tooltip = () => {
    /* return custom tooltip */
}

const generateData = () => generateLibTree()

const initialProperties = {
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },
    id: 'name',
    value: 'loc',
    valueFormat: { format: '', enabled: false },
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
    rectLabel: 'formattedValue',
    rectLabelsTextColor: {
        from: 'color',
        modifiers: [['darker', 1.4]],
    },
    animate: defaultProps.animate,
    motionConfig: defaultProps.motionConfig,
    defs: [],
    fill: [],
    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
    'showcase pattern usage': false,
    direction: 'bottom',
    rectLabelsSkipLength: defaultProps.rectLabelsSkipLength,
    rectLabelsSkipPercentage: defaultProps.rectLabelsSkipPercentage,
    rectLabelsOffset: defaultProps.rectLabelsOffset,
}

const Icicles = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    // TODO: change with icicles capture
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/sunburst.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Icicles"
            meta={meta.Icicles}
            icon="icicles"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            defaultProperties={defaultProps}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            generateData={generateData}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveIcicles
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node =>
                            logAction({
                                type: 'click',
                                label: `[icicles] ${node.id} - ${node.value}: ${
                                    Math.round(node.percentage * 100) / 100
                                }%`,
                                color: node.color,
                                // prevent cyclic dependency
                                data: {
                                    ...omit(node, ['parent']),
                                    parent: omit(node.parent, ['data', 'parent', 'children']),
                                },
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Icicles
