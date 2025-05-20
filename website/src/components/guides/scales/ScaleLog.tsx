import React from 'react'
import { logScaleDefaults } from '@nivo/scales'
import { ScaleLogDemo } from './ScaleLogDemo'
import { ScaleConfigAttr } from './types'
import { SCALES_CONFIG_ATTRS } from './scalesConfig'
import { ScaleGuide } from './ScaleGuide'

const SCALE_LOG_CONFIG: ScaleConfigAttr[] = [
    {
        ...SCALES_CONFIG_ATTRS.min,
        defaultValue: logScaleDefaults.min,
    },
    {
        ...SCALES_CONFIG_ATTRS.max,
        defaultValue: logScaleDefaults.max,
    },
    {
        ...SCALES_CONFIG_ATTRS.nice,
        defaultValue: logScaleDefaults.nice,
    },
    {
        ...SCALES_CONFIG_ATTRS.round,
        defaultValue: logScaleDefaults.round,
    },
    {
        ...SCALES_CONFIG_ATTRS.reverse,
        defaultValue: logScaleDefaults.reverse,
    },
]

export const ScaleLog = () => (
    <ScaleGuide
        type="log"
        config={SCALE_LOG_CONFIG}
        description={`
            A log scale is a continuous quantitative scale that transforms strictly positive
            input values by applying a logarithmic function, so that equal ratios in the domain
            map to equal additive steps in the output range.
            
            It’s ideal when your data spans multiple orders of magnitude and you want each
            constant factor (e.g. 1→10→100) to occupy the same visual interval, but it only
            handles values > 0 and cannot represent zeros or negatives.
        `}
        useCase={`
            For instance, suppose you’re drawing a bar chart of daily blog visitors,
            which can be anywhere from 1 up to 1000 visits, and you want those bars
            to fit within 300 px of width. With a log scale:

            - Domain: \`[1 … 1000] (visitors)\`
            - Range: \`[0 … 300] (px)\`
            
            The scale would map:

            - 1 visit → 0 px
            - 10 visits → 100 px
            - 100 visits→ 200 px
            - 1000 visits → 300 px

            so that each tenfold increase in traffic always adds 100 px.
            This way, both low-traffic days and viral spikes remain visible on the same axis.
        `}
        demo={ScaleLogDemo}
    />
)
