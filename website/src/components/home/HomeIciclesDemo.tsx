import React, { useMemo } from 'react'
import { generateLibTree } from '@nivo/generators'
import { Icicles } from '@nivo/icicles'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeIciclesDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()
    const data = useMemo(() => generateLibTree(), [])

    return (
        <div id="icicles">
            <Icicles
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                id="name"
                value="loc"
                animate={false}
                isInteractive={false}
                colors={colors}
                borderColor={colors[3]}
                theme={nivoTheme}
            />
        </div>
    )
}
