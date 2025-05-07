import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { svgDefaultProps, ResponsiveIcicleHtml } from '@nivo/icicle'
import { generateLibTree } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/icicle/meta.yml'
import mapper, {
    UnmappedIcicleSvgProps,
    MappedIcicleSvgProps,
} from '../../data/components/icicle/mapper'
import { groups } from '../../data/components/icicle/props'

const generateData = () => generateLibTree()

const initialProperties: UnmappedIcicleSvgProps = {
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    identity: 'name',
    value: 'loc',
    sort: 'input',
    valueFormat: { format: '', enabled: false },
    orientation: svgDefaultProps.orientation,
    gapX: 2,
    gapY: 2,
    borderRadius: 2,
    borderWidth: svgDefaultProps.borderWidth,
    borderColor: svgDefaultProps.borderColor,
    colors: { scheme: 'tableau10' },
    colorBy: svgDefaultProps.colorBy,
    inheritColorFromParent: svgDefaultProps.inheritColorFromParent,
    childColor: {
        from: 'color',
        modifiers: [['brighter', 0.3]],
    },
    enableLabels: true,
    label: svgDefaultProps.label,
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
    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
    rectsTransitionMode: svgDefaultProps.rectsTransitionMode,
    labelsTransitionMode: 'flow-down',
    defs: [],
    fill: [],
    isInteractive: true,
    enableZooming: svgDefaultProps.enableZooming,
    zoomMode: svgDefaultProps.zoomMode,
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
            UnmappedIcicleSvgProps,
            MappedIcicleSvgProps,
            ReturnType<typeof generateData>
        >
            name="IcicleHtml"
            meta={meta.IcicleHtml}
            icon="icicle"
            flavors={meta.flavors}
            currentFlavor="html"
            properties={groups}
            defaultProperties={svgDefaultProps}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
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
                                label: `[node] ${node.id} - ${node.value}: ${
                                    Math.round(node.percentage * 100) / 100
                                }%`,
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
