/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveRadar, radarDefaults } from '@nivo/radar'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/radar/meta.yml'
import mapper from '../../data/components/radar/mapper'
import { groups } from '../../data/components/radar/props'
import { generateLightDataSet } from '../../data/components/radar/generator'

const initialProperties = {
    ...radarDefaults,
    margin: {
        top: 70,
        right: 80,
        bottom: 40,
        left: 80,
    },
    gridLabelOffset: 36,
    dotColor: { theme: 'background' },
    dotBorderWidth: 2,
    enableDotLabel: true,
    dotLabel: 'value',
    blendMode: 'multiply',

    animate: true,
    motionConfig: 'wobbly',

    isInteractive: true,

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
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

const Radar = () => (
    <ComponentTemplate
        name="Radar"
        meta={meta.Radar}
        icon="radar"
        flavors={meta.flavors}
        currentFlavor="svg"
        properties={groups}
        initialProperties={initialProperties}
        defaultProperties={radarDefaults}
        propertiesMapper={mapper}
        generateData={generateLightDataSet}
    >
        {(properties, data, theme) => <ResponsiveRadar data={data} {...properties} theme={theme} />}
    </ComponentTemplate>
)

export default Radar
