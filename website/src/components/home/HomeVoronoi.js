/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import range from 'lodash/range'
import { ResponsiveVoronoi } from '@nivo/voronoi'
import { HomeItem, HomeItemLabel } from './styled'

const voronoi = {
    xDomain: [0, 400],
    yDomain: [0, 300],
}
voronoi.data = range(80).map(id => ({
    id,
    x: Math.random() * voronoi.xDomain[1],
    y: Math.random() * voronoi.yDomain[1],
}))

const HomeVoronoi = ({ colors }) => {
    return (
        <HomeItem to="/voronoi">
            <ResponsiveVoronoi
                data={voronoi.data}
                xDomain={voronoi.xDomain}
                yDomain={voronoi.yDomain}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                enableLinks={true}
                linkLineColor={colors[2]}
                cellLineColor={colors[3]}
                cellLineWidth={1}
                enablePoints={true}
                pointSize={6}
                pointColor={colors[3]}
                isInteractive={false}
                animate={false}
            />
            <HomeItemLabel>
                <span>Voronoi documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeVoronoi
