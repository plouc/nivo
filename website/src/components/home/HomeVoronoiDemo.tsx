import React from 'react'
import range from 'lodash/range'
import { Voronoi } from '@nivo/voronoi'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

const voronoi = {
    xDomain: [0, 400],
    yDomain: [0, 300],
}
voronoi.data = range(80).map(id => ({
    id,
    x: Math.random() * voronoi.xDomain[1],
    y: Math.random() * voronoi.yDomain[1],
}))

export const HomeVoronoiDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()

    return (
        <div id="voronoi">
            <Voronoi
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={voronoi.data}
                xDomain={voronoi.xDomain}
                yDomain={voronoi.yDomain}
                enableLinks={true}
                linkLineColor={colors[2]}
                cellLineColor={colors[3]}
                cellLineWidth={2}
                enablePoints={true}
                pointSize={12}
                pointColor={colors[3]}
                isInteractive={false}
                animate={false}
                theme={nivoTheme}
            />
        </div>
    )
}
