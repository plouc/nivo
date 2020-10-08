import React, { useMemo } from 'react'
import { generateLibTree } from '@bitbloom/nivo-generators'
import { Sunburst } from '@bitbloom/nivo-sunburst'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeSunburstDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()
    const data = useMemo(() => generateLibTree(), [])

    return (
        <div id="sunburst">
            <Sunburst
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
