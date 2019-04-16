/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateSwarmPlotData } from '@nivo/generators'
import { ResponsiveSwarmPlotCanvas } from '@nivo/swarmplot'
import { HomeItem, HomeItemLabel } from './styled'

const HomeSwarmPlot = ({ reversedColors, nivoTheme }) => {
    const data = generateSwarmPlotData(['thing'], { min: 50, max: 50 })

    return (
        <HomeItem to="/swarmplot">
            <ResponsiveSwarmPlotCanvas
                data={data.data}
                groups={data.groups}
                groupBy="group"
                identity="id"
                value="price"
                layout="horizontal"
                valueScale={{
                    type: 'linear',
                    min: 0,
                    max: 500,
                }}
                size={{
                    key: 'volume',
                    values: [4, 20],
                    sizes: [6, 20],
                }}
                margin={{ top: 30, bottom: 30, left: 10, right: 10 }}
                theme={nivoTheme}
                colors={reversedColors}
                enableGridY={false}
                colorBy="id"
                animate={false}
                isInteractive={false}
                axisTop={{}}
                axisRight={null}
                axisBottom={{}}
                axisLeft={null}
            />
            <HomeItemLabel>
                <span>SwarmPlot documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeSwarmPlot
