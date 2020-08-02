/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { PieDefaultProps, ResponsivePieCanvas } from '@nivo/pie'
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

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    startAngle: 0,
    endAngle: 360,
    sortByValue: false,
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    fit: true,

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

    enableSlicesLabels: true,
    sliceLabel: 'value',
    slicesLabelsSkipAngle: 10,
    slicesLabelsTextColor: '#333333',

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

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
            translateX: 140,
            itemWidth: 60,
            itemHeight: 14,
            itemsSpacing: 2,
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
            defaultProperties={PieDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            getDataSize={data => data.length}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsivePieCanvas
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={slice => {
                            logAction({
                                type: 'click',
                                label: `[arc] ${slice.label}: ${slice.value}`,
                                data: slice,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default PieCanvas
