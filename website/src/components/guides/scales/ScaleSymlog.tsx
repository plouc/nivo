import React from 'react'
import { symlogScaleDefaults } from '@nivo/scales'
import { ScaleSymlogDemo } from './ScaleSymlogDemo'
import { ScaleConfigAttr } from './types'
import { SCALES_CONFIG_ATTRS } from './scalesConfig'
import { ScaleGuide } from './ScaleGuide'

const SCALE_SYMLOG_CONFIG: ScaleConfigAttr[] = [
    {
        ...SCALES_CONFIG_ATTRS.min,
        defaultValue: symlogScaleDefaults.min,
    },
    {
        ...SCALES_CONFIG_ATTRS.max,
        defaultValue: symlogScaleDefaults.max,
    },
    {
        ...SCALES_CONFIG_ATTRS.nice,
        defaultValue: symlogScaleDefaults.nice,
    },
    {
        ...SCALES_CONFIG_ATTRS.round,
        defaultValue: symlogScaleDefaults.round,
    },
    {
        ...SCALES_CONFIG_ATTRS.reverse,
        defaultValue: symlogScaleDefaults.reverse,
    },
]

export const ScaleSymlog = () => (
    <ScaleGuide
        type="symlog"
        config={SCALE_SYMLOG_CONFIG}
        description={`
            A symlog scale is a continuous quantitative scale that combines linear behavior
            around zero with logarithmic behavior farther out, on both the positive and
            negative sides.
            
            It’s ideal when your data spans several orders of magnitude but also includes
            values near zero (including negatives) that you don’t want “crushed” by a pure
            log scale.
        `}
        useCase={`
            Imagine plotting profit/loss values ranging from –1000 to +1000 dollars on
            a chart 1000 px wide, but you want to see both the tiny losses/gains around
            zero in detail and compress the very large swings:
            
            - Domain: \`[–1000 … +1000] ($)\`
            - Range: \`[0 … 1000] (px)\`
            - Constant \`10\`
            
            With this setup:
            
            - A profit of +5 maps almost linearly
            - A profit of +100 starts to compress logarithmically
            - A loss of –50 mirrors the same behavior on the left side of center
            
            Thus you get fine resolution near zero and a log-style compression for large
            gains or losses, all in one smooth scale.
        `}
        demo={ScaleSymlogDemo}
    />
)
