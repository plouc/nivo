import React from 'react'
import { ResponsiveBoxPlot, svgDefaultProps } from '@nivo/boxplot'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/boxplot/meta.yml'
import mapper from '../../data/components/boxplot/mapper'
import { generateLightDataSet } from '../../data/components/boxplot/generator'
import { groups } from '../../data/components/boxplot/props'
import { graphql, useStaticQuery } from 'gatsby'

const initialProperties = {
    margin: {
        top: 60,
        right: 140,
        bottom: 60,
        left: 60,
    },

    value: svgDefaultProps.value,
    minValue: 0,
    maxValue: 10,
    groupBy: 'group',
    subGroupBy: 'subgroup',
    quantiles: svgDefaultProps.quantiles,
    layout: svgDefaultProps.layout,
    padding: 0.12,
    innerPadding: 6,

    valueFormat: '.2f',

    enableGridX: true,
    enableGridY: true,
    axisTop: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: true,
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
        legend: 'group',
        legendPosition: 'middle',
        legendOffset: 32,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'value',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    colors: { scheme: 'nivo' },
    colorBy: svgDefaultProps.colorBy,
    opacity: svgDefaultProps.opacity,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    medianWidth: 2,
    medianColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    whiskerWidth: svgDefaultProps.whiskerWidth,
    whiskerEndSize: 0.6,
    whiskerColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },

    isInteractive: true,
    activeOpacity: svgDefaultProps.activeOpacity,
    inactiveOpacity: svgDefaultProps.inactiveOpacity,

    animate: true,
    motionConfig: 'stiff',

    isFocusable: svgDefaultProps.isFocusable,

    legends: [
        {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemWidth: 60,
            itemHeight: 20,
            itemsSpacing: 3,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            symbolSize: 20,
            symbolShape: 'square',
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
            generateData={generateLightDataSet}
            getTabData={data => data}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveBoxPlot
                        data={data}
                        {...properties}
                        theme={theme}
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
