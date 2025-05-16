import React, { Ref } from 'react'
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

const generateData = () =>
    generateLibTree(undefined, undefined, undefined, {
        withColors: false,
        idKey: 'id',
        valueKey: 'value',
    })

const initialProperties: UnmappedIcicleHtmlProps = {
    margin: {
        top: 3,
        right: 3,
        bottom: 3,
        left: 3,
    },
    sort: 'input',
    valueFormat: { format: '>-.0s', enabled: true },
    orientation: htmlDefaultProps.orientation,
    gapX: htmlDefaultProps.gapX,
    gapY: htmlDefaultProps.gapY,
    borderRadius: htmlDefaultProps.borderRadius,
    borderWidth: htmlDefaultProps.borderWidth,
    borderColor: htmlDefaultProps.borderColor,
    colors: htmlDefaultProps.colors,
    colorBy: htmlDefaultProps.colorBy,
    inheritColorFromParent: htmlDefaultProps.inheritColorFromParent,
    childColor: htmlDefaultProps.childColor,
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
    labelTextColor: htmlDefaultProps.labelTextColor,
    animate: htmlDefaultProps.animate,
    motionConfig: htmlDefaultProps.motionConfig,
    rectsTransitionMode: htmlDefaultProps.rectsTransitionMode,
    labelsTransitionMode: htmlDefaultProps.labelsTransitionMode,
    isInteractive: htmlDefaultProps.isInteractive,
    enableZooming: htmlDefaultProps.enableZooming,
    zoomMode: htmlDefaultProps.zoomMode,
    isFocusable: htmlDefaultProps.isFocusable,
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
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveIcicleHtml
                        data={data}
                        {...properties}
                        theme={theme}
                        ref={chartRef as Ref<HTMLDivElement>}
                        debounceResize={200}
                        nodeAriaLabel={node => `"${node.id}" node with a value of: ${node.value}`}
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
