import React from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ResponsiveBarCanvas } from '@nivo/bar'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bar/meta.yml'
import { generateHeavyDataSet } from '../../data/components/bar/generator'
import mapper, { UnmappedBarProps, MappedBarProps } from '../../data/components/bar/mapper'
import { groups } from '../../data/components/bar/props'

const initialProperties: UnmappedBarProps = {
    indexBy: 'country',

    margin: {
        top: 50,
        right: 60,
        bottom: 50,
        left: 60,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    padding: 0.15,
    innerPadding: 0,
    minValue: 'auto',
    maxValue: 'auto',

    groupMode: 'stacked',
    layout: 'horizontal',
    reverse: false,

    valueScale: { type: 'linear' },
    indexScale: { type: 'band', round: true },
    valueFormat: { format: '', enabled: false },

    colors: { scheme: 'red_blue' },
    colorBy: 'id',
    borderWidth: 0,
    borderRadius: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 1.6]],
    },

    axisTop: {
        enable: true,
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
        legendOffset: 36,
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

    enableGridX: true,
    enableGridY: false,

    enableLabel: true,
    enableTotals: false,
    totalsOffset: 10,
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1.6]],
    },
    labelPosition: 'middle',
    labelOffset: 0,

    isInteractive: true,
    'custom tooltip example': false,

    legends: [],
}

const BarCanvas = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/bar-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<UnmappedBarProps, MappedBarProps, any>
            name="BarCanvas"
            meta={meta.BarCanvas}
            icon="bar"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
                tooltip: properties.tooltip ? 'CustomTooltip' : undefined,
            })}
            generateData={generateHeavyDataSet}
            getTabData={data => data.data}
            image={image}
            location={location}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveBarCanvas
                        data={data.data}
                        keys={data.keys}
                        {...properties}
                        theme={theme}
                        onClick={node =>
                            logAction({
                                type: 'click',
                                label: `[bar] ${node.id} - ${node.indexValue}: ${node.value}`,
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

export default BarCanvas
