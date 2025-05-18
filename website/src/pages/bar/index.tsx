import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
// import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { ResponsiveBar, svgDefaultProps } from '@nivo/bar'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bar/meta.yml'
import { generateLightDataSet } from '../../data/components/bar/generator'
import {
    UnmappedBarSvgProps,
    MappedBarSvgProps,
    barSvgMapper,
} from '../../data/components/bar/mapper'
import { groups } from '../../data/components/bar/props'

const initialProperties: UnmappedBarSvgProps = {
    ...svgDefaultProps,
    indexBy: 'country',
    margin: {
        top: 50,
        right: 130,
        bottom: 50,
        left: 60,
    },
    valueFormat: { format: '', enabled: false },
    // Patterns should be disabled by default, otherwise the code
    // becomes too complex for a simple example.
    // defs: [
    //     patternDotsDef('dots', {
    //         background: 'inherit',
    //         color: '#38bcb2',
    //         size: 4,
    //         padding: 1,
    //         stagger: true,
    //     }),
    //     patternLinesDef('lines', {
    //         background: 'inherit',
    //         color: '#eed312',
    //         rotation: -45,
    //         lineWidth: 6,
    //         spacing: 10,
    //     }),
    // ],
    // fill: [
    //     { match: { id: 'fries' }, id: 'dots' },
    //     { match: { id: 'sandwich' }, id: 'lines' },
    // ],
    axisTop: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
        truncateTickAt: 0,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
        truncateTickAt: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
        truncateTickAt: 0,
    },
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    legends: [
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 3,
            itemWidth: 100,
            itemHeight: 16,
            itemDirection: 'left-to-right',
            symbolSize: 16,
        },
    ],
    'custom tooltip example': false,
}

const Bar = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/bar.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<UnmappedBarSvgProps, MappedBarSvgProps, any>
            name="Bar"
            meta={meta.Bar}
            icon="bar"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={barSvgMapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
                tooltip: properties.tooltip ? 'CustomTooltip' : undefined,
            })}
            generateData={generateLightDataSet}
            getTabData={data => data.data}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => (
                <ResponsiveBar
                    {...properties}
                    data={data.data}
                    keys={data.keys}
                    theme={theme}
                    debounceResize={100}
                    ref={chartRef as Ref<SVGSVGElement>}
                    onClick={node =>
                        logAction({
                            type: 'click',
                            label: `[bar] ${node.id} - ${node.indexValue}: ${node.value}`,
                            color: node.color,
                            data: node,
                        })
                    }
                />
            )}
        </ComponentTemplate>
    )
}

export default Bar
