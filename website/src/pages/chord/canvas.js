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
import { groupsByScope } from '../../data/components/chord/props'

const MATRIX_SIZE = 38

const initialProperties = {
    margin: {
        top: 60,
        right: 60,
        bottom: 60,
        left: 60,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    padAngle: 0.006,
    innerRadiusRatio: 0.86,
    innerRadiusOffset: 0,

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
    labelOffset: 9,
    labelRotation: -90,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1,
    },

    colors: { scheme: 'paired' },

    isInteractive: true,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.4,
    ribbonHoverOpacity: 0.75,
    ribbonHoverOthersOpacity: 0,

    animate: true,
    motionStiffness: 90,
    motionDamping: 7,
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
            properties={groupsByScope.ChordCanvas}
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
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default ChordCanvas
