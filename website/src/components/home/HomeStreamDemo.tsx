import React from 'react'
import range from 'lodash/range'
import random from 'lodash/random'
import { Stream } from '@nivo/stream'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

const streamDataLayerCount = 5
const generateStreamData = () =>
    range(16).map(() =>
        range(streamDataLayerCount).reduce((acc, i) => {
            acc[i] = random(10, 200)
            return acc
        }, {})
    )

export const HomeStreamDemo = () => {
    const { reversedColors, nivoTheme } = useHomeTheme()

    return (
        <div id="stream">
            <Stream
                width={dimensions.width}
                height={dimensions.height}
                data={generateStreamData()}
                margin={dimensions.margin}
                keys={range(streamDataLayerCount)}
                theme={nivoTheme}
                colors={reversedColors}
                animate={false}
                isInteractive={false}
                enableGridX
                axisLeft={null}
                axisBottom={null}
                offsetType="silhouette"
            />
        </div>
    )
}
