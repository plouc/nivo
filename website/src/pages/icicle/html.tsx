import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { htmlDefaultProps, ResponsiveIcicleHtml } from '@nivo/icicle'
import { generateLibTree } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/icicle/meta.yml'
import {
    UnmappedIcicleHtmlProps,
    MappedIcicleHtmlProps,
    htmlMapper,
} from '../../data/components/icicle/mapper'
import { groups } from '../../data/components/icicle/props'

const generateData = () => generateLibTree()

const initialProperties: UnmappedIcicleHtmlProps = {
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    identity: 'name',
    value: 'loc',
    sort: 'input',
    valueFormat: { format: '>-.0s', enabled: true },
    orientation: htmlDefaultProps.orientation,
    gapX: 2,
    gapY: 2,
    borderRadius: 2,
    borderWidth: htmlDefaultProps.borderWidth,
    borderColor: htmlDefaultProps.borderColor,
    colors: { scheme: 'tableau10' },
    colorBy: htmlDefaultProps.colorBy,
    inheritColorFromParent: htmlDefaultProps.inheritColorFromParent,
    childColor: {
        from: 'color',
        modifiers: [['brighter', 0.3]],
    },
    enableLabels: true,
    label: htmlDefaultProps.label as string,
    labelBoxAnchor: 'top',
    labelPaddingX: 6,
    labelPaddingY: 6,
    labelAlign: 'end',
    labelBaseline: 'center',
    labelRotation: 270,
    labelSkipWidth: 12,
    labelSkipHeight: 32,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1.7]],
    },
    animate: htmlDefaultProps.animate,
    motionConfig: htmlDefaultProps.motionConfig,
    rectsTransitionMode: htmlDefaultProps.rectsTransitionMode,
    labelsTransitionMode: 'flow-down',
    isInteractive: true,
    enableZooming: htmlDefaultProps.enableZooming,
    zoomMode: htmlDefaultProps.zoomMode,
    'custom tooltip example': false,
    'showcase pattern usage': false,
}

const IcicleHtml = () => {
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
        <ComponentTemplate<
            UnmappedIcicleHtmlProps,
            MappedIcicleHtmlProps,
            ReturnType<typeof generateData>
        >
            name="IcicleHtml"
            meta={meta.IcicleHtml}
            icon="icicle"
            flavors={meta.flavors}
            currentFlavor="html"
            properties={groups}
            defaultProperties={htmlDefaultProps}
            initialProperties={initialProperties}
            propertiesMapper={htmlMapper}
            generateData={generateData}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveIcicleHtml
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node =>
                            logAction({
                                type: 'click',
                                label: `[node] ${node.id} - ${node.formattedValue} (${node.value} -> ${
                                    Math.round(node.percentage * 100) / 100
                                }%)`,
                                color: node.color,
                                data: node,
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default IcicleHtml
