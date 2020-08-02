import React from 'react'
import { ResponsiveChord } from '@nivo/chord'
import { generateChordData } from '@nivo/generators'
import { colors } from '../../constants'

const Chord = () => (
    <div>
        <ResponsiveChord
            {...generateChordData({ size: 5 })}
            enableLabel={false}
            margin={{
                top: 6,
                bottom: 6,
            }}
            arcOpacity={1}
            arcBorderWidth={3}
            arcBorderColor="#000000"
            ribbonOpacity={1}
            ribbonBorderWidth={3}
            ribbonBorderColor="#000000"
            colors={colors}
            isInteractive={false}
            animate={false}
        />
        <div className="Title">CHORD</div>
    </div>
)

export default Chord
