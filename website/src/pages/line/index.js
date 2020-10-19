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
import { ResponsiveLine, LineDefaultProps } from '@nivo/line'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/line/meta.yml'
import mapper from '../../data/components/line/mapper'
import { groups } from '../../data/components/line/props'
import defaultSettings from '../../data/components/line/defaults'
import { generateLightDataSet } from '../../data/components/line/generator'

const initialProperties = {
    ...omit(defaultSettings, ['width', 'height']),
    useMesh: true,
    debugMesh: false,
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
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
    animate: LineDefaultProps.animate,
    motionConfig: LineDefaultProps.motionConfig,
}

const linearData = [
    {
        id: 'fake corp. A',
        data: [
            { x: 0, y: 7 },
            { x: 1, y: 5 },
            { x: 2, y: 11 },
            { x: 3, y: 9 },
            { x: 4, y: 13 },
            { x: 7, y: 16 },
            { x: 9, y: 12 },
        ],
    },
]

const Line = () => {
    return (
        <ComponentTemplate
            name="Line"
            meta={meta.Line}
            icon="line"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={LineDefaultProps}
            propertiesMapper={mapper}
            generateData={generateLightDataSet}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveLine
                        data={properties.xScale.type === 'linear' ? linearData : data}
                        {...properties}
                        theme={theme}
                        onClick={point => {
                            logAction({
                                type: 'click',
                                label: `[point] serie: ${point.serieId}, x: ${point.data.x}, y: ${point.data.y}`,
                                color: point.serieColor,
                                data: point,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Line
