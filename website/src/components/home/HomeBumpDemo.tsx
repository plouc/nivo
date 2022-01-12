import React, { useMemo } from 'react'
import { Bump } from '@nivo/bump'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'

interface Datum {
    x: number
    y: number
}

const generateData = () => {
    const years = range(2000, 2005)
    const ranks = range(1, 6)

    const series: {
        id: string
        data: Datum[]
    }[] = ranks.map(rank => {
        return {
            id: `Serie ${rank}`,
            data: [],
        }
    })

    years.forEach(year => {
        shuffle(ranks).forEach((rank, i) => {
            series[i].data.push({
                x: year,
                y: rank,
            })
        })
    })

    return series
}

export const HomeBumpDemo = () => {
    const data = useMemo(() => generateData(), [])
    const { colors, nivoTheme } = useHomeTheme()

    return (
        <div id="bump">
            <Bump
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                colors={colors}
                lineWidth={dimensions.lineWidth}
                pointSize={dimensions.pointSize}
                endLabel={false}
                startLabel={false}
                enableGridX={true}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                isInteractive={false}
                animate={false}
                theme={nivoTheme}
            />
        </div>
    )
}
