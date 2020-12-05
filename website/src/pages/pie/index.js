import React from 'react'
import { ResponsivePie, defaultProps } from '@nivo/pie'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/pie/meta.yml'
import mapper from '../../data/components/pie/mapper'
import { groups } from '../../data/components/pie/props'

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

    startAngle: 0,
    endAngle: 360,
    sortByValue: false,
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    fit: true,

    colors: { scheme: 'nivo' },

    borderWidth: 1,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.2]],
    },

    enableRadialLabels: true,
    radialLabel: 'id',
    radialLabelsSkipAngle: 10,
    radialLabelsTextXOffset: 6,
    radialLabelsTextColor: '#333333',
    radialLabelsLinkOffset: 0,
    radialLabelsLinkDiagonalLength: 16,
    radialLabelsLinkHorizontalLength: 24,
    radialLabelsLinkStrokeWidth: 1,
    radialLabelsLinkColor: { from: 'color' },

    enableSliceLabels: true,
    sliceLabel: 'formattedValue',
    sliceLabelsRadiusOffset: 0.5,
    sliceLabelsSkipAngle: 10,
    sliceLabelsTextColor: '#333333',

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
    'showcase pattern usage': true,

    defs: [],
    fill: [],

    animate: true,
    motionConfig: 'wobbly',

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
