/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveStream, StreamDefaultProps } from '@nivo/stream'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/stream/meta.yml'
import mapper from '../../data/components/stream/mapper'
import { groups } from '../../data/components/stream/props'
import { generateLightDataSet } from '../../data/components/stream/generator'
import defaultSettings from '../../data/components/stream/defaults'

const initialProperties = {
    ...defaultSettings,
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999999',
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000000',
                    },
                },
            ],
        },
    ],
}

const Stream = () => {
    return (
        <ComponentTemplate
            name="Stream"
            meta={meta.Stream}
            icon="stream"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={StreamDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateLightDataSet}
            getTabData={data => data.data}
        >
            {(properties, data, theme) => {
                return (
                    <ResponsiveStream
                        data={data.data}
                        keys={data.keys}
                        {...properties}
                        theme={theme}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Stream
