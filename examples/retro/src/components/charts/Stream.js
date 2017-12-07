import React from 'react'
import { ResponsiveStream } from '@nivo/stream'
import { patternDotsDef } from '@nivo/core'
import { generateCountriesData } from '@nivo/generators'
import { colors } from '../../constants'

const Stream = () => (
    <div>
        <ResponsiveStream
            margin={{
                top: 10,
                right: 15,
                bottom: 1.5,
                left: 1.5,
            }}
            data={generateCountriesData(
                ['rock', 'jazz', 'hip-hop', 'reggae', 'folk', 'soul', 'funk'],
                { size: 7 }
            )}
            keys={['rock', 'jazz', 'hip-hop', 'reggae', 'folk', 'soul', 'funk']}
            offsetType="none"
            colors={colors}
            enableGridX={false}
            enableGridY={false}
            axisBottom={null}
            isInteractive={false}
            animate={false}
            borderWidth={3}
            borderColor="#000000"
            defs={[patternDotsDef('pattern')]}
        />
        <div className="Title">STREAM</div>
    </div>
)

export default Stream
