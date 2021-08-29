import React from 'react'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { ResponsivePie } from '@nivo/pie'
import { HomeItem, HomeItemLabel } from './styled'

const HomePie = ({ colors, nivoTheme }) => {
    return (
        <HomeItem to="/pie">
            <ResponsivePie
                margin={{
                    top: 26,
                    right: 60,
                    bottom: 26,
                    left: 60,
                }}
                data={generateProgrammingLanguageStats(true, 12).map(d => ({
                    id: d.label,
                    ...d,
                }))}
                innerRadius={0.6}
                enableArcLabels={false}
                arcLinkLabelsDiagonalLength={10}
                arcLinkLabelsStraightLength={16}
                colors={colors}
                colorBy="id"
                animate={false}
                isInteractive={false}
                theme={nivoTheme}
            />
            <HomeItemLabel>
                <span>Pie documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomePie
