import React, { useMemo } from 'react'
import { Choropleth } from '@nivo/geo'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'
import { generateChoroplethData } from '../../data/components/geo/generator'
import countries from '../../data/components/geo/world_countries'

export const HomeChoroplethDemo = () => {
    const data = useMemo(() => generateChoroplethData(), [])
    const { colors, nivoTheme } = useHomeTheme()

    return (
        <div id="choropleth">
            <Choropleth
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                features={countries.features}
                colors={colors}
                domain={[0, 1000000]}
                unknownColor={`${colors[0]}44`}
                borderWidth={1}
                borderColor={colors[3]}
                isInteractive={false}
                animate={false}
                theme={nivoTheme}
                projectionType="mercator"
                projectionScale={100}
                projectionTranslation={[0.5, 0.6]}
                projectionRotation={[0, 0, 0]}
            />
        </div>
    )
}
