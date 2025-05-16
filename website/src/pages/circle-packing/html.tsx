import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ResponsiveCirclePackingHtml, htmlDefaultProps } from '@nivo/circle-packing'
import { generateLibTree } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/circle-packing/meta.yml'
import mapper from '../../data/components/circle-packing/mapper'
import { groups } from '../../data/components/circle-packing/props'

const generateData = () =>
    generateLibTree(undefined, undefined, undefined, {
        withColors: false,
        idKey: 'id',
        valueKey: 'value',
    })

const initialProperties = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    valueFormat: { format: '', enabled: false },
    colors: { scheme: 'spectral' },
    colorBy: 'depth',
    inheritColorFromParent: false,
    childColor: {
        from: 'color',
        modifiers: [['brighter', 0.4]],
    },
    padding: 2,
    leavesOnly: false,
    enableLabels: true,
    label: 'id',
    labelsFilter: label => label.node.depth === 2,
    labelsSkipRadius: 10,
    labelTextColor: '#000000',
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    animate: true,
    motionConfig: 'gentle',
    isInteractive: true,
}

const CirclePackingHtml = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/circle-packing.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="CirclePackingHtml"
            meta={meta.CirclePackingHtml}
            icon="circle-packing"
            flavors={meta.flavors}
            currentFlavor="html"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={htmlDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveCirclePackingHtml
                        {...properties}
                        data={data}
                        theme={theme}
                        ref={chartRef as Ref<HTMLDivElement>}
                        debounceResize={200}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `${node.id}: ${node.value}`,
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

export default CirclePackingHtml
