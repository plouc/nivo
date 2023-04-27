import React from 'react'
import { generateBoxPlotData } from '@nivo/generators'
import { ResponsiveBoxPlot, svgDefaultProps } from '@nivo/boxplot'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/boxplot/meta.yml'
import mapper from '../../data/components/chord/mapper'
import { groups } from '../../data/components/boxplot/props'
import { graphql, useStaticQuery } from 'gatsby'

const generateData = () => generateBoxPlotData([
    { group: 'Alpha', subgroup: 'A', mu: 5, sd: 1, n: 20 },
    { group: 'Alpha', subgroup: 'B', mu: 6, sd: 1, n: 20 },
    { group: 'Beta', subgroup: 'A', mu: 8, sd: 1.4, n: 20 },
    { group: 'Beta', subgroup: 'B', mu: 7.5, sd: 1.4, n: 20 },
    { group: 'Gamma', subgroup: 'A', mu: 5, sd: 1, n: 20 },
    { group: 'Gamma', subgroup: 'B', mu: 7.2, sd: 1.8, n: 20 },
    { group: 'Delta', subgroup: 'A', mu: 5, sd: 1, n: 20 },
    { group: 'Delta', subgroup: 'B', mu: 6, sd: 1, n: 20 },
    { group: 'Epsilon', subgroup: 'A', mu: 5, sd: 1.4, n: 20 },
    { group: 'Epsilon', subgroup: 'B', mu: 6, sd: 1.8, n: 20 },
])

const initialProperties = {
    margin: {
        top: 60,
        right: 60,
        bottom: 90,
        left: 60,
    },

    groupBy: 'group',
    subGroupBy: 'subgroup',
    quantiles: svgDefaultProps.quantiles,
    layout: svgDefaultProps.layout,
    padding: 0.12,
    innerPadding: 6,

    minValue: 0,
    maxValue: 10,
    valueFormat: '.2f',

    enableGridX: true,
    enableGridY: true,
    axisTop: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    enableLabel: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: -90,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    colors: { scheme: 'nivo' },
    borderRadius: 2,
    borderWidth: svgDefaultProps.borderWidth,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    medianWidth: 2,
    medianColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },
    whiskerWidth: svgDefaultProps.whiskerWidth,
    whiskerEndSize: 0.6,
    whiskerColor: {
        from: 'color',
        modifiers: [['darker', 0]],
    },

    isInteractive: true,

    animate: true,
    motionConfig: 'stiff',

    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 70,
            itemWidth: 80,
            itemHeight: 14,
            itemsSpacing: 0,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                    },
                },
            ],
        },
    ],
}

const BoxPlot = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/chord.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="BoxPlot"
            meta={meta.BoxPlot}
            icon="boxplot"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateData}
            getTabData={data => data}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveBoxPlot
                        data={data}
                        {...properties}
                        theme={theme}
                        // groupBy={}
                        // groups={}
                        // value={}
                        // maxValue={}
                        // minValue={}
                        // opacity={}
                        // activeOpacity={}
                        // inactiveOpacity={}
                        // valueScale={}
                        // indexScale={}
                        // enableGridX={}
                        // enableGridY={}
                        // medianColor={}
                        // medianWidth={}
                        // whiskerColor={}
                        // tooltip={}
                        // tooltipLabel={}
                        // colorBy={}
                        // colors={}
                        // theme={}
                        // annotations={}
                        // legends={}
                        // data={}
                        // height={}
                        // width={}
                        // animate={}
                        // motionConfig={}
                        // axisBottom={}
                        // axisLeft={}
                        // axisRight={}
                        // axisTop={}
                        // boxPlotComponent={}
                        // markers={}
                        // layers={}
                        // role={}
                        onClick={boxPlot => {
                            logAction({
                                type: 'click',
                                label: `[boxplot] ${boxPlot.key} - ${boxPlot.label}`,
                                color: boxPlot.color,
                                data: boxPlot,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default BoxPlot
