import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ResponsiveCirclePacking, svgDefaultProps } from '@nivo/circle-packing'
import { generateLibTree } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/circle-packing/meta.yml'
import mapper from '../../data/components/circle-packing/mapper'
import { groups } from '../../data/components/circle-packing/props'

const initialProperties = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    valueFormat: { format: '', enabled: false },
    colors: { scheme: 'nivo' },
    colorBy: 'depth',
    inheritColorFromParent: false,
    childColor: svgDefaultProps.childColor,
    padding: 4,
    leavesOnly: false,
    enableLabels: true,
    label: 'id',
    labelsFilter: label => label.node.depth === 2,
    labelsSkipRadius: 10,
    labelTextColor: svgDefaultProps.labelTextColor,
    borderWidth: svgDefaultProps.borderWidth,
    borderColor: svgDefaultProps.borderColor,
    // Patterns should be disabled by default, otherwise the code
    // becomes too complex for a simple example.
    // defs: [
    //     patternLinesDef('lines', {
    //         background: 'none',
    //         color: 'inherit',
    //         rotation: -45,
    //         lineWidth: 5,
    //         spacing: 8,
    //     }),
    // ],
    // fill: [{ match: { depth: 1 }, id: 'lines' }],
    animate: true,
    motionConfig: 'gentle',
    isInteractive: true,
}

const generateData = () =>
    generateLibTree(undefined, undefined, undefined, {
        withColors: false,
        idKey: 'id',
        valueKey: 'value',
    })

const CirclePacking = ({ location }: PageProps) => {
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
            name="CirclePacking"
            meta={meta.CirclePacking}
            icon="circle-packing"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveCirclePacking
                        {...properties}
                        data={data}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
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

export default CirclePacking
