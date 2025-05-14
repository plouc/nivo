import React, { Ref } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { svgDefaultProps, ResponsiveIcicle } from '@nivo/icicle'
import { generateLibTree } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/icicle/meta.yml'
import {
    svgMapper,
    UnmappedIcicleSvgProps,
    MappedIcicleSvgProps,
} from '../../data/components/icicle/mapper'
import { groups } from '../../data/components/icicle/props'

const generateData = () => generateLibTree()

const initialProperties: UnmappedIcicleSvgProps = {
    margin: {
        top: 3,
        right: 3,
        bottom: 3,
        left: 3,
    },
    identity: 'name',
    value: 'loc',
    sort: 'input',
    valueFormat: { format: '>-.0s', enabled: true },
    orientation: svgDefaultProps.orientation,
    gapX: svgDefaultProps.gapX,
    gapY: svgDefaultProps.gapY,
    borderRadius: svgDefaultProps.borderRadius,
    borderWidth: svgDefaultProps.borderWidth,
    borderColor: svgDefaultProps.borderColor,
    colors: svgDefaultProps.colors,
    colorBy: svgDefaultProps.colorBy,
    inheritColorFromParent: svgDefaultProps.inheritColorFromParent,
    childColor: svgDefaultProps.childColor,
    enableLabels: true,
    label: svgDefaultProps.label as string,
    labelBoxAnchor: 'top',
    labelPaddingX: 6,
    labelPaddingY: 6,
    labelAlign: 'end',
    labelBaseline: 'center',
    labelRotation: 270,
    labelSkipWidth: 12,
    labelSkipHeight: 32,
    labelTextColor: svgDefaultProps.labelTextColor,
    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
    animateOnMount: svgDefaultProps.animateOnMount,
    rectsTransitionMode: svgDefaultProps.rectsTransitionMode,
    labelsTransitionMode: svgDefaultProps.labelsTransitionMode,
    defs: [],
    fill: [],
    isInteractive: svgDefaultProps.isInteractive,
    enableZooming: svgDefaultProps.enableZooming,
    zoomMode: svgDefaultProps.zoomMode,
    isFocusable: svgDefaultProps.isFocusable,
    'custom tooltip example': false,
    'showcase pattern usage': false,
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
        <ComponentTemplate<
            UnmappedIcicleSvgProps,
            MappedIcicleSvgProps,
            ReturnType<typeof generateData>
        >
            name="Icicle"
            meta={meta.Icicle}
            icon="icicle"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            defaultProperties={svgDefaultProps}
            initialProperties={initialProperties}
            propertiesMapper={svgMapper}
            generateData={generateData}
            image={image}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveIcicle
                        data={data}
                        {...properties}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
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

export default Icicle
