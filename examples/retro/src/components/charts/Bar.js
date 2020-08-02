import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { generateCountriesData } from '@nivo/generators'
import { colors } from '../../constants'

const Bar = () => (
    <div>
        <ResponsiveBar
            margin={{
                top: 1.5,
                right: 10,
                bottom: 1.5,
                left: 1.5,
            }}
            padding={0.2}
            data={generateCountriesData(['rock', 'jazz', 'hip-hop', 'reggae', 'folk'], { size: 9 })}
            indexBy="country"
            enableGridX={false}
            enableGridY={false}
            keys={['rock', 'jazz', 'hip-hop', 'reggae', 'folk']}
            colors={colors}
            axisBottom={null}
            axisLeft={null}
            borderWidth={3}
            borderColor="#000"
            enableLabel={true}
            labelSkipHeight={24}
            isInteractive={false}
            animate={false}
        />
        <div className="Title">BAR</div>
    </div>
)

export default Bar
