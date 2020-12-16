import React from 'react'
import { generateLibTree } from '@nivo/generators'
import { ResponsiveBubbleCanvas } from '@nivo/circle-packing'
import { HomeItem, HomeItemLabel } from './styled'

const HomeBubble = ({ reversedColors }) => {
    return (
        <HomeItem to="/bubble">
            <ResponsiveBubbleCanvas
                root={generateLibTree()}
                identity="name"
                enableLabel={false}
                value="loc"
                animate={false}
                isInteractive={false}
                colors={reversedColors}
            />
            <HomeItemLabel>
                <span>Bubble documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeBubble
