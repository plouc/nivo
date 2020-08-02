/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateChordData } from '@nivo/generators'
import { ResponsiveChordCanvas } from '@nivo/chord'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/chord/meta.yml'
import mapper from '../../data/components/chord/mapper'
import { groups } from '../../data/components/chord/props'

const MATRIX_SIZE = 38

const initialProperties = {
    margin: {
        top: 60,
        right: 200,
        bottom: 60,
        left: 60,
    },

    valueFormat: '.2f',

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    padAngle: 0.006,
    innerRadiusRatio: 0.86,
    innerRadiusOffset: 0,

    arcOpacity: 1,
    arcBorderWidth: 0,
    arcBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },

    ribbonOpacity: 0.5,
    ribbonBorderWidth: 0,
    ribbonBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },

    enableLabel: true,
    label: 'id',
    labelOffset: 9,
    labelRotation: -90,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    colors: { scheme: 'paired' },

    isInteractive: true,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.4,
    ribbonHoverOpacity: 0.75,
    ribbonHoverOthersOpacity: 0,

    legends: [
        {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemWidth: 80,
            itemHeight: 11,
            itemsSpacing: 0,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            symbolSize: 12,
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

const generateData = () => generateChordData({ size: MATRIX_SIZE })

const ChordCanvas = () => {
    return (
        <ComponentTemplate
            name="ChordCanvas"
            meta={meta.ChordCanvas}
            icon="chord"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateData}
            dataKey="matrix"
            getDataSize={() => MATRIX_SIZE * MATRIX_SIZE + MATRIX_SIZE}
            getTabData={data => data.matrix}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveChordCanvas
                        matrix={data.matrix}
                        keys={data.keys}
                        {...properties}
                        theme={theme}
                        onArcClick={arc => {
                            logAction({
                                type: 'click',
                                label: `[arc] ${arc.label}`,
                                color: arc.color,
                                data: arc,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default ChordCanvas
