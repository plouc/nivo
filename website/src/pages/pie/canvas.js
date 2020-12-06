/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { defaultProps, ResponsivePieCanvas } from '@nivo/pie'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/pie/meta.yml'
import mapper from '../../data/components/pie/mapper'
import { groups } from '../../data/components/pie/props'

const DATASET_SIZE = 24
const generateData = () =>
    generateProgrammingLanguageStats(true, DATASET_SIZE).map(d => ({
        id: d.label,
        ...d,
    }))

const initialProperties = {
    margin: {
        top: 40,
        right: 200,
        bottom: 40,
        left: 80,
    },

    valueFormat: { format: '', enabled: false },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    startAngle: 0,
    endAngle: 360,
    sortByValue: false,
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    fit: true,
    activeInnerRadiusOffset: defaultProps.activeInnerRadiusOffset,
    activeOuterRadiusOffset: 16,

    colors: { scheme: 'paired' },

    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.6]],
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

    legends: [
        {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 60,
            itemHeight: 14,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 14,
            symbolShape: 'circle',
        },
    ],
}

const PieCanvas = () => {
    return (
        <ComponentTemplate
            name="PieCanvas"
            meta={meta.PieCanvas}
            icon="pie"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            getDataSize={data => data.length}
        >
            {(properties, data, theme, logAction) => {
                const handleArcClick = slice => {
                    logAction({
                        type: 'click',
                        label: `[arc] ${slice.label}: ${slice.value}`,
                        color: slice.color,
                        data: slice,
                    })
                }

                const handleLegendClick = legendItem => {
                    logAction({
                        type: 'click',
                        label: `[legend] ${legendItem.label}: ${legendItem.data.value}`,
                        color: legendItem.color,
                        data: legendItem,
                    })
                }

                return (
                    <ResponsivePieCanvas
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

export default PieCanvas
