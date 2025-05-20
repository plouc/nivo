import React from 'react'
import { linearScaleDefaults } from '@nivo/scales'
import { ScaleLinearDemo } from './ScaleLinearDemo'
import { ScaleConfigAttr } from './types'
import { SCALES_CONFIG_ATTRS } from './scalesConfig'
import { ScaleGuide } from './ScaleGuide'

const SCALE_LINEAR_CONFIG: ScaleConfigAttr[] = [
    {
        ...SCALES_CONFIG_ATTRS.min,
        defaultValue: linearScaleDefaults.min,
    },
    {
        ...SCALES_CONFIG_ATTRS.max,
        defaultValue: linearScaleDefaults.max,
    },
    {
        ...SCALES_CONFIG_ATTRS.nice,
        defaultValue: linearScaleDefaults.nice,
    },
    {
        ...SCALES_CONFIG_ATTRS.round,
        defaultValue: linearScaleDefaults.round,
    },
    {
        ...SCALES_CONFIG_ATTRS.reverse,
        defaultValue: linearScaleDefaults.reverse,
    },
    {
        ...SCALES_CONFIG_ATTRS.clamp,
        defaultValue: linearScaleDefaults.clamp,
    },
]

export const ScaleLinear = () => (
    <ScaleGuide
        type="linear"
        config={SCALE_LINEAR_CONFIG}
        description={`
            A linear scale is the most basic quantitative (continuous) scale in D3. It
            defines a piecewise‐linear mapping from a numeric input domain to a numeric
            output range.
        `}
        useCase={`
            Imagine you’re drawing a bar chart of tree heights that range from 0 cm up
            to 200 cm, and you want those bars to be between 0 px and 400 px tall. A
            linear scale will map:

            - 0 cm → 0 px
            - 50 cm → 100 px
            - 100 cm → 200 px
            - 150 cm → 300 px
            - 200 cm → 400 px
            
            so that every additional centimetre of real height adds exactly 2 pixels to
            the bar’s height. That proportional, “straight-line” mapping between your
            data domain (0–200 cm) and your visual range (0–400 px) is exactly what a
            linear scale provides.
        `}
        demo={ScaleLinearDemo}
    />
)
