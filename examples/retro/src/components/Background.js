import React from 'react'
import { ResponsiveStream } from '@nivo/stream'
import { generateCountriesData } from '@nivo/generators'

const Background = () => (
    <div className="Background">
        <ResponsiveStream
            data={generateCountriesData(['rock', 'jazz', 'hip-hop', 'reggae', 'folk'], { size: 7 })}
            keys={['rock', 'jazz', 'hip-hop', 'reggae', 'folk']}
            colors={['#dcd6c6', '#f4e3b5', '#dea499', '#e1cc8d', '#776537']}
            enableGridX={false}
            enableGridY={false}
            axisBottom={null}
            borderColor="#000000"
            offsetType="expand"
            borderWidth={10}
        />
    </div>
)

export default Background
