/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveWaffleCanvas, WaffleDefaultProps } from '@nivo/waffle'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/waffle/meta.yml'
import { groups } from '../../data/components/waffle/props'
import mapper from '../../data/components/waffle/mapper'

const generateData = () => [
    {
        id: 'car',
        label: 'car',
        value: Math.random() * 20,
        color: '#eaafaf',
    },
    {
        id: 'walk',
        label: 'walk',
        value: Math.random() * 20,
        color: '#a2738c',
    },
    {
        id: 'scooter',
        label: 'scooter',
        value: Math.random() * 20,
        color: '#645c84',
    },
    {
        id: 'bicycle',
        label: 'bicycle',
        value: Math.random() * 20,
        color: '#427996',
    },
    {
        id: 'e-bicycle',
        label: 'e-bicycle',
        value: Math.random() * 20,
        color: '#42291c',
    },
    {
        id: 'moto',
        label: 'moto',
        value: Math.random() * 20,
        color: '#3f5468',
    },
    {
        id: 'other',
        label: 'other',
        value: Math.random() * 20,
        color: '#b8e4c9',
    },
]

const initialProperties = {
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    total: 140,

    rows: 40,
    columns: 40,
    fillDirection: 'bottom',
    padding: 0.5,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 120,
    },

    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: { scheme: 'category10' },
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: -100,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            itemTextColor: '#777',
            symbolSize: 20,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                        itemBackground: '#f7fafb',
                    },
                },
            ],
        },
    ],
}

const WaffleCanvas = () => {
    return (
        <ComponentTemplate
            name="WaffleCanvas"
            meta={meta.WaffleCanvas}
            icon="waffle"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            propertiesMapper={mapper}
            initialProperties={initialProperties}
            defaultProperties={WaffleDefaultProps}
            codePropertiesMapper={properties => ({
                ...properties,
                cellComponent: properties.cellComponent ? 'CustomCell(props) => (…)' : undefined,
                tooltip: properties.tooltip ? 'CustomTooltip(props) => (…)' : undefined,
            })}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveWaffleCanvas
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            let label
                            if (node.data.value !== undefined) {
                                label = `${node.data.label}: ${node.data.value} (position: ${node.position})`
                            } else {
                                label = `empty at position: ${node.position}`
                            }
                            logAction({
                                type: 'click',
                                label: `[cell] ${label}`,
                                color: node.color,
                                data: node,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default WaffleCanvas
