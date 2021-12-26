import React from 'react'
import { ResponsivePie, defaultProps } from '@nivo/pie'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/pie/meta.yml'
import mapper from '../../data/components/pie/mapper'
import { groups } from '../../data/components/pie/props'
import { graphql, useStaticQuery } from 'gatsby'

const DATASET_SIZE = 5
const generateData = () =>
    generateProgrammingLanguageStats(true, DATASET_SIZE).map(d => ({
        id: d.label,
        ...d,
    }))

const initialProperties = {
    margin: {
        top: 40,
        right: 80,
        bottom: 80,
        left: 80,
    },

    valueFormat: { format: '', enabled: false },

    startAngle: defaultProps.startAngle,
    endAngle: defaultProps.endAngle,
    sortByValue: defaultProps.sortByValue,
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    fit: defaultProps.fit,
    activeInnerRadiusOffset: defaultProps.activeInnerRadiusOffset,
    activeOuterRadiusOffset: 8,

    colors: defaultProps.colors,

    borderWidth: 1,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.2]],
    },

    enableArcLinkLabels: defaultProps.enableArcLinkLabels,
    arcLinkLabel: defaultProps.arcLinkLabel,
    arcLinkLabelsSkipAngle: 10,
    arcLinkLabelsTextOffset: 6,
    arcLinkLabelsTextColor: '#333333',
    arcLinkLabelsOffset: 0,
    arcLinkLabelsDiagonalLength: 16,
    arcLinkLabelsStraightLength: 24,
    arcLinkLabelsThickness: 2,
    arcLinkLabelsColor: { from: 'color' },

    enableArcLabels: true,
    arcLabel: 'formattedValue',
    arcLabelsRadiusOffset: 0.5,
    arcLabelsSkipAngle: 10,
    arcLabelsTextColor: {
        from: 'color',
        modifiers: [['darker', 2]],
    },

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
    'showcase pattern usage': true,

    defs: [],
    fill: [],

    animate: defaultProps.animate,
    motionConfig: defaultProps.motionConfig,
    transitionMode: defaultProps.transitionMode,

    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
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

const Pie = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/pie.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Pie"
            meta={meta.Pie}
            icon="pie"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                const handleArcClick = slice => {
                    logAction({
                        type: 'click',
                        label: `[arc] ${slice.id}: ${slice.formattedValue}`,
                        color: slice.color,
                        data: slice,
                    })
                }

                const handleLegendClick = legendItem => {
                    logAction({
                        type: 'click',
                        label: `[legend] ${legendItem.label}: ${legendItem.formattedValue}`,
                        color: legendItem.color,
                        data: legendItem,
                    })
                }

                return (
                    <ResponsivePie
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={handleArcClick}
                        legends={properties.legends.map(legend => ({
                            ...legend,
                            onClick: handleLegendClick,
                        }))}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Pie
