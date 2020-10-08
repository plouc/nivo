import React, { useMemo } from 'react'
import random from 'lodash/random'
import { AreaBump } from '@bitbloom/nivo-bump'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'
import range from 'lodash/range'

const serieIds = ['JavaScript', 'ReasonML', 'TypeScript', 'Elm']
const generateData = () => {
    const years = range(2000, 2005)

    return serieIds.map(id => ({
        id,
        data: years.map(year => ({
            x: year,
            y: random(5, 40),
        })),
    }))
}

export const HomeAreaBumpDemo = () => {
    const data = useMemo(() => generateData(), [])
    const { colors, nivoTheme } = useHomeTheme()

    return (
        <div id="area-bump">
            <AreaBump
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                colors={colors}
                borderWidth={1}
                spacing={12}
                borderColor={colors[3]}
                blendMode="normal"
                enableGridX={true}
                axisTop={null}
                axisBottom={null}
                startLabel={false}
                endLabel={false}
                isInteractive={false}
                animate={false}
                theme={nivoTheme}
            />
        </div>
    )
}
