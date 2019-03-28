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
import random from 'lodash/random'
import { ResponsiveStream } from '@nivo/stream'
import { HomeItem, HomeItemLabel } from './styled'
import { commonAxes } from './settings'

const streamDataLayerCount = 5
const generateStreamData = () =>
    range(16).map(() =>
        range(streamDataLayerCount).reduce((acc, i) => {
            acc[i] = random(10, 200)
            return acc
        }, {})
    )

const HomeStream = ({ reversedColors, nivoTheme }) => {
    return (
        <HomeItem to="/stream">
            <ResponsiveStream
                data={generateStreamData()}
                keys={range(streamDataLayerCount)}
                margin={{ top: 10, bottom: 15, left: 24, right: 10 }}
                theme={nivoTheme}
                colors={reversedColors}
                fillOpacity={0.75}
                animate={false}
                isInteractive={false}
                {...commonAxes}
            />
            <HomeItemLabel>
                <span>Stream documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeStream
