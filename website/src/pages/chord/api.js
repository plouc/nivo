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
import SEO from '../../components/seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groupsByScope } from '../../data/components/chord/props'
import mapper from '../../data/components/chord/mapper'
import meta from '../../data/components/chord/meta.yml'

const MATRIX_SIZE = 5

const data = generateChordData({ size: MATRIX_SIZE })

const ChordApi = () => {
    return (
        <>
            <SEO title="Chord HTTP API" keywords={[...meta.Chord.tags, 'HTTP API']} />
            <ApiClient
                componentName="Chord"
                chartClass="chord"
                apiPath="/charts/chord"
                flavors={meta.flavors}
                dataProperty="matrix"
                controlGroups={groupsByScope.api}
                propsMapper={mapper}
                defaultProps={{
                    width: 800,
                    height: 800,
                    matrix: JSON.stringify(data.matrix, null, '  '),
                    keys: data.keys,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },
                    padAngle: 0.02,
                    innerRadiusRatio: 0.96,
                    innerRadiusOffset: 0.01,

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
                }}
            />
        </>
    )
}

export default ChordApi
