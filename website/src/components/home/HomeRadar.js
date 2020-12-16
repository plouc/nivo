import React from 'react'
import { generateWinesTastes } from '@nivo/generators'
import { ResponsiveRadar } from '@nivo/radar'
import { HomeItem, HomeItemLabel } from './styled'

const HomeRadar = ({ colors, nivoTheme }) => {
    return (
        <HomeItem to="/radar">
            <ResponsiveRadar
                {...generateWinesTastes()}
                indexBy="taste"
                margin={{ top: 20, right: 40, bottom: 10, left: 40 }}
                theme={nivoTheme}
                colors={colors}
                curve="linearClosed"
                dotSize={7}
                dotBorderWidth={1}
                dotBorderColor={colors[1]}
                animate={false}
                isInteractive={false}
            />
            <HomeItemLabel>
                <span>Radar documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeRadar
