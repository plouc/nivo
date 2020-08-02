import React from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { generateCountriesData } from '@nivo/generators'
import { colors } from '../../constants'

const TreeMap = () => (
    <div>
        <ResponsiveTreeMap
            margin={{
                top: 1.5,
                right: 16,
                bottom: 1.5,
                left: 1.5,
            }}
            root={{
                country: 'root',
                children: generateCountriesData(['value'], { size: 24 }),
            }}
            identity="country"
            value="value"
            leavesOnly={true}
            colors={colors}
            enableLabel={false}
            colorBy="country"
            borderWidth={3}
            borderColor="#000"
            labelTextColor="#000"
            isInteractive={false}
            animate={false}
        />
        <div className="Title">TREEMAP</div>
    </div>
)

export default TreeMap
