/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateCountriesData } from '@nivo/generators'
import { ResponsiveBar } from '@nivo/bar'
import { HomeItem, HomeItemLabel } from './styled'
import { commonAxes } from './settings'

const Home = ({ colors, nivoTheme, isHorizontal = false }) => {
    const data = isHorizontal
        ? generateCountriesData(['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut'], {
              size: 9,
          })
        : generateCountriesData(['hot dogs', 'burgers', 'sandwich'], {
              size: 11,
          })

    const keys = isHorizontal
        ? ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
        : ['hot dogs', 'burgers', 'sandwich']

    return (
        <HomeItem to="/bar">
            <ResponsiveBar
                data={data}
                indexBy="country"
                keys={keys}
                layout={isHorizontal ? 'horizontal' : 'vertical'}
                groupMode={isHorizontal ? 'stacked' : 'grouped'}
                margin={{ top: 10, bottom: 15, left: 24, right: 10 }}
                padding={isHorizontal ? 0.4 : 0.2}
                colors={colors}
                theme={nivoTheme}
                enableGridX={isHorizontal}
                enableGridY={!isHorizontal}
                enableLabel={false}
                animate={false}
                isInteractive={false}
                {...commonAxes}
            />
            <HomeItemLabel>
                <span>Bar documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default Home
