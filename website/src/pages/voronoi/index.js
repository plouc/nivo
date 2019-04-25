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
import { ResponsiveVoronoi, VoronoiDefaultProps } from '@nivo/voronoi'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/voronoi/meta.yml'
import { groups } from '../../data/components/voronoi/props'

const xDomain = [0, 100]
const yDomain = [0, 100]

const generateData = () =>
    range(100).map(id => ({ id, x: Math.random() * xDomain[1], y: Math.random() * yDomain[1] }))

const initialProperties = {
    ...ResponsiveVoronoi.defaultProps,

    xDomain,
    yDomain,

    margin: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
    },

    enableLinks: true,
    linkLineWidth: 1,
    linkLineColor: '#cccccc',

    enableCells: true,
    cellLineWidth: 2,
    cellLineColor: '#c6432d',

    enablePoints: true,
    pointSize: 6,
    pointColor: '#c6432d',
}

const Voronoi = () => {
    return (
        <ComponentTemplate
            name="Voronoi"
            meta={meta.Voronoi}
            icon="voronoi"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={VoronoiDefaultProps}
            generateData={generateData}
        >
            {(properties, data, theme) => {
                return (
                    <ResponsiveVoronoi
                        data={data}
                        xDomain={xDomain}
                        yDomain={yDomain}
                        {...properties}
                        theme={theme}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Voronoi
