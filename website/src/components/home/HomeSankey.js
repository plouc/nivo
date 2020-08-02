/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateSankeyData } from '@nivo/generators'
import { ResponsiveSankey } from '@nivo/sankey'
import { HomeItem, HomeItemLabel } from './styled'

const HomeSankey = ({ colors, nivoTheme }) => {
    return (
        <HomeItem to="/sankey">
            <ResponsiveSankey
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                data={generateSankeyData({ nodeCount: 11, maxIterations: 2 })}
                theme={nivoTheme}
                colors={colors}
                animate={false}
                isInteractive={false}
                nodeBorderColor={{ from: 'color' }}
                nodeOpacity={1}
                nodeWidth={4}
                nodePadding={12}
                nodeBorderWidth={0}
                linkOpacity={0.2}
                linkBlendMode="normal"
                linkContract={1}
                labelTextColor={{ from: 'color' }}
            />
            <HomeItemLabel>
                <span>Sankey documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeSankey
