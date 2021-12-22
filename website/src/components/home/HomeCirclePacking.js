import React from 'react'
import { generateLibTree } from '@nivo/generators'
import { ResponsiveCirclePackingCanvas } from '@nivo/circle-packing'
import { HomeItem, HomeItemLabel } from './styled'

export const HomeCirclePacking = ({ reversedColors }) => {
    return (
        <HomeItem to="/circle-packing/">
            <ResponsiveCirclePackingCanvas
                data={generateLibTree()}
                id="name"
                value="loc"
                colors={reversedColors}
                colorBy="depth"
                childColor="noinherit"
                padding={1}
                enableLabels={false}
                animate={false}
                isInteractive={false}
            />
            <HomeItemLabel>
                <span>CirclePacking documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}
