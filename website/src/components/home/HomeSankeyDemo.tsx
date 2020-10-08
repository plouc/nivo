import React from 'react'
import { generateSankeyData } from '@bitbloom/nivo-generators'
import { Sankey } from '@bitbloom/nivo-sankey'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeSankeyDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()

    return (
        <div id="sankey">
            <Sankey
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={generateSankeyData({ nodeCount: 11, maxIterations: 2 })}
                theme={nivoTheme}
                colors={colors}
                animate={false}
                isInteractive={false}
                enableLabels={false}
                nodeBorderColor={{ from: 'color' }}
                nodeOpacity={1}
                nodeThickness={12}
                nodeInnerPadding={2}
                nodeSpacing={20}
                nodeBorderWidth={0}
                linkOpacity={0.6}
                linkBlendMode="normal"
                linkContract={1}
                labelTextColor={{ from: 'color' }}
            />
        </div>
    )
}
