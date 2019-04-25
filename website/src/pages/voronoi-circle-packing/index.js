/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import range from 'lodash/range'
import random from 'lodash/random'
import { ResponsiveVoronoiCirclePacking } from '@nivo/voronoi-circle-packing'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/voronoi-circle-packing/meta.yml'
import { groupsByScope } from '../../data/components/voronoi-circle-packing/props'

const initialProperties = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    
    isInteractive: true,
}

const Voronoi = () => {
    return (
        <ComponentTemplate
            name="VoronoiCirclePacking"
            meta={meta.VoronoiCirclePacking}
            icon="voronoi"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groupsByScope.VoronoiCirclePacking}
            initialProperties={initialProperties}
            defaultProperties={{}}
            generateData={() => {
                return [
                    {
                        id: 'Colorado',
                        value: 859
                    },
                    {
                        id: 'Carolina del N.',
                        value: 751
                    },
                    {
                        id: 'Arizona',
                        value: 822,
                    },
                    {
                        id: 'Illinois',
                        value: '1444'
                    },
                    {
                        id: 'Texas',
                        value: 4900,
                    },
                    {
                        id: 'California',
                        value: 9763
                    },
                    {
                        id: 'Washington',
                        value: 736
                    },
                    {
                        id: 'Georgia',
                        value: 1156
                    },
                    {
                        id: 'Florida',
                        value: 1254
                    },
                    {
                        id: 'Nueva York',
                        value: 1154
                    }
                ]
                return range(7).map(d => {
                    return {
                        id: d,
                        value: random(1, 24)
                    }
                })
            }}
        >
            {(properties, data, theme) => {
                return (
                    <ResponsiveVoronoiCirclePacking
                        data={data}
                        {...properties}
                        theme={theme}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Voronoi
