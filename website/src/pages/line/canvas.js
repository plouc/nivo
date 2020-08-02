/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import omit from 'lodash/omit'
import { ResponsiveLineCanvas, LineCanvasDefaultProps } from '@nivo/line'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/line/meta.yml'
import mapper from '../../data/components/line/mapper'
import { groups } from '../../data/components/line/props'
import defaultSettings from '../../data/components/line/defaults'
import { generateHeavyDataSet } from '../../data/components/line/generator'

const xValues = [0, 20, 40, 60, 80, 100, 120]
const yValues = [0, 500, 1000, 1500, 2000, 2500]

const initialProperties = {
    ...omit(defaultSettings, ['width', 'height']),
    useMesh: true,
    debugMesh: false,
    curve: 'monotoneX',
    margin: {
        top: 50,
        right: 160,
        bottom: 50,
        left: 60,
    },
    enableArea: false,
    colors: { scheme: 'spectral' },
    lineWidth: 1,
    xScale: {
        type: 'linear',
    },
    yScale: {
        type: 'linear',
        stacked: true,
        min: 0,
        max: 2500,
    },
    pointSize: 4,
    pointBorderWidth: 1,
    enableGridX: false,
    gridXValues: xValues,
    gridYValues: yValues,
    axisTop: {
        enable: false,
        tickValues: xValues,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: '.2f',
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: true,
        tickValues: yValues,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: '.2s',
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        tickValues: xValues,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: '.2f',
        legend: 'price',
        legendOffset: 36,
        legendPosition: 'middle',
    },
    axisLeft: {
        enable: true,
        tickValues: yValues,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: '.2s',
        legend: 'volume',
        legendOffset: -40,
        legendPosition: 'middle',
    },
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 12,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],
}

const LineCanvas = () => {
    return (
        <ComponentTemplate
            name="Line"
            meta={meta.LineCanvas}
            icon="line"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={LineCanvasDefaultProps}
            propertiesMapper={mapper}
            generateData={generateHeavyDataSet}
            getDataSize={data => data.length * data[0].data.length}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveLineCanvas
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={point => {
                            logAction({
                                type: 'click',
                                label: `[point] serie: ${point.serieId}, x: ${point.data.x}, y: ${point.data.y}`,
                                color: point.color,
                                data: point,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default LineCanvas
