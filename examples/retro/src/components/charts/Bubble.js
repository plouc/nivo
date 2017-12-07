import React from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { generateCountriesData } from '@nivo/generators'
import { colors } from '../../constants'

const Bubble = () => (
    <div>
        <ResponsiveBubble
            root={{
                country: 'root',
                children: generateCountriesData(['value'], { size: 24 }),
            }}
            identity="country"
            value="value"
            leavesOnly={true}
            colors={colors}
            labelTextColor="#000"
            labelSkipRadius={12}
            colorBy="country"
            borderWidth={3}
            borderColor="#000"
            padding={6}
            isInteractive={false}
        />
        <div className="Title">BUBBLE</div>
    </div>
)

export default Bubble
