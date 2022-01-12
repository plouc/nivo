import React, { useMemo } from 'react'
import { generateLibTree } from '@nivo/generators'
import { TreeMap } from '@nivo/treemap'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeTreeMapDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()
    const data = useMemo(() => generateLibTree(), [])

    return (
        <div id="treemap">
            <TreeMap
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                identity="name"
                value="loc"
                valueFormat=".02s"
                tile="squarify"
                colors={colors}
                leavesOnly={true}
                borderWidth={1}
                borderColor={colors[3]}
                outerPadding={0}
                innerPadding={0}
                nodeOpacity={1}
                animate={false}
                isInteractive={false}
                enableLabel={false}
                labelTextColor={colors[1]}
                theme={nivoTheme}
            />
        </div>
    )
}
