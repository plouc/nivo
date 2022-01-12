import React, { useMemo } from 'react'
import styled from 'styled-components'
import { generateWinesTastes } from '@nivo/generators'
import { Radar } from '@nivo/radar'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeRadarDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()
    const data = useMemo(() => generateWinesTastes(), [])

    return (
        <Container id="radar">
            <Radar
                {...data}
                width={dimensions.width}
                height={dimensions.height}
                indexBy="taste"
                margin={dimensions.margin}
                theme={nivoTheme}
                colors={colors}
                curve="linearClosed"
                dotSize={dimensions.pointSize}
                borderWidth={dimensions.lineWidth}
                dotBorderWidth={1}
                dotBorderColor={colors[1]}
                enableDotLabel={false}
                animate={false}
                isInteractive={false}
            />
        </Container>
    )
}

const Container = styled.div`
    svg text {
        display: none;
    }
`
