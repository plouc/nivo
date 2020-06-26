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
import { ResponsiveChord, ChordDefaultProps } from '@nivo/chord'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/chord/meta.yml'
import mapper from '../../data/components/chord/mapper'
import { groups } from '../../data/components/chord/props'

const MATRIX_SIZE = 5

const initialProperties = {
    ...ChordDefaultProps,
    margin: {
        top: 60,
        right: 60,
        bottom: 90,
        left: 60,
    },
    valueFormat: { format: '.2f', enabled: true },
    labelRotation: -90,
    motionConfig: 'wobbly',
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

const generateData = () => generateChordData({ size: MATRIX_SIZE })

const Chord = () => {
    return (
        <ComponentTemplate
            name="Chord"
            meta={meta.Chord}
            icon="chord"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={ChordDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateData}
            dataKey="matrix"
            getTabData={data => data.matrix}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveChord
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
                        onRibbonClick={ribbon => {
                            logAction({
                                type: 'click',
                                label: `[ribbon] ${ribbon.source.label} —> ${ribbon.target.label}`,
                                color: ribbon.source.color,
                                data: ribbon,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Chord
