import React from 'react'
import { generateLibTree } from '@nivo/generators'
import { ResponsiveBubbleCanvas } from '@nivo/circle-packing'
import { HomeItem, HomeItemLabel } from './styled'

export const HomeCirclePacking = ({ reversedColors }) => {
    return (
        <HomeItem to="/circle-packing">
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
                <span>CirclePacking documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}
