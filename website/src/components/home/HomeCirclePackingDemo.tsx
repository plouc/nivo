import React, { useMemo } from 'react'
import { generateLibTree } from '@bitbloom/nivo-generators'
import { CirclePacking } from '@bitbloom/nivo-circle-packing'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeCirclePackingDemo = () => {
    const { reversedColors, nivoTheme } = useHomeTheme()
    const data = useMemo(() => generateLibTree(), [])

    return (
        <div id="circle-packing">
            <CirclePacking
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                id="name"
                value="loc"
                colors={reversedColors}
                colorBy="depth"
                childColor="noinherit"
                padding={1}
                enableLabels={false}
                animate={false}
                isInteractive={false}
                theme={nivoTheme}
            />
        </div>
    )
}
