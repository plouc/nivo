import React from 'react'
import { generateDrinkStats } from '@nivo/generators'
import { ResponsiveLine } from '@nivo/line'
import { HomeItem, HomeItemLabel } from './styled'
import { commonAxes } from './settings'

const HomeLine = ({ colors, theme, nivoTheme }) => {
    return (
        <HomeItem to="/line">
            <ResponsiveLine
                margin={{ top: 10, bottom: 15, left: 24, right: 10 }}
                data={generateDrinkStats(12)}
                yScale={{ type: 'linear', stacked: true }}
                curve="monotoneX"
                theme={nivoTheme}
                colors={colors}
                animate={false}
                isInteractive={false}
                {...commonAxes}
                dotSize={7}
                dotBorderWidth={1}
                dotBorderColor={theme.colors.coloredRange[2]}
            />
            <HomeItemLabel>
                <span>Line documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeLine
