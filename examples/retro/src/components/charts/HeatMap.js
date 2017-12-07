import React from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { generateCountriesData } from '@nivo/generators'
import { colors } from '../../constants'

const HeatMap = () => (
    <div>
        <ResponsiveHeatMap
            margin={{
                top: 1,
                right: 11,
                bottom: 1,
                left: 1,
            }}
            data={generateCountriesData(
                ['rock', 'jazz', 'hip-hop', 'reggae', 'folk', 'soul', 'funk'],
                { size: 7 }
            )}
            padding={6}
            colors={colors}
            indexBy="country"
            keys={['rock', 'jazz', 'hip-hop', 'reggae', 'folk', 'soul', 'funk']}
            labelTextColor="#000"
            cellOpacity={1}
            cellBorderWidth={3}
            cellBorderColor="#000"
            axisTop={null}
            axisBottom={null}
            axisLeft={null}
            isInteractive={false}
            animate={false}
            cellHoverOthersOpacity={0}
        />
        <div className="Title">HEATMAP</div>
    </div>
)

export default HeatMap
