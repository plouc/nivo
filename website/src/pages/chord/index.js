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
import { ResponsiveChord } from '@nivo/chord'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/chord/meta.yml'
import mapper from '../../data/components/chord/mapper'
import { groupsByScope } from '../../data/components/chord/props'

const MATRIX_SIZE = 5

const initialProperties = {
    margin: {
        top: 60,
        right: 60,
        bottom: 90,
        left: 60,
    },

    padAngle: 0.02,
    innerRadiusRatio: 0.96,
    innerRadiusOffset: 0.02,

    arcOpacity: 1,
    arcBorderWidth: 1,
    arcBorderColor: {
        type: 'inherit:darker',
        gamma: 0.4,
    },

    ribbonOpacity: 0.5,
    ribbonBorderWidth: 1,
    ribbonBorderColor: {
        type: 'inherit:darker',
        gamma: 0.4,
    },

    enableLabel: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: -90,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1,
    },

    colors: { scheme: 'nivo' },

    isInteractive: true,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.25,
    ribbonHoverOpacity: 0.75,
    ribbonHoverOthersOpacity: 0.25,

    animate: true,
    motionStiffness: 90,
    motionDamping: 7,

    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            translateY: 70,
            itemWidth: 80,
            itemHeight: 14,
            itemTextColor: '#999',
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
            properties={groupsByScope.Chord}
            initialProperties={initialProperties}
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
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Chord
