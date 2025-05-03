import React, { useMemo } from 'react'
import { generateLibTree } from '@nivo/generators'
import { Icicle } from '@nivo/icicle'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeIcicleDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()
    const data = useMemo(() => generateLibTree(), [])

    return (
        <div id="icicle">
            <Icicle
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                identity="name"
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
