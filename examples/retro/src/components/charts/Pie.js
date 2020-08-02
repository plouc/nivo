import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { colors } from '../../constants'

const Pie = () => (
    <div>
        <ResponsivePie
            margin={{
                top: 1.5,
                right: 1.5,
                bottom: 1.5,
                left: 1.5,
            }}
            data={generateProgrammingLanguageStats(true, 9).map(d => ({
                id: d.label,
                ...d,
            }))}
            colors={colors}
            innerRadius={0.4}
            enableRadialLabels={false}
            borderWidth={3}
            borderColor="#000"
            slicesLabelsSkipAngle={10}
            animate={false}
            isInteractive={false}
        />
        <div className="Title">PIE</div>
    </div>
)

export default Pie
