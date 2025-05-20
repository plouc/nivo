import React from 'react'
import { bandScaleDefaults } from '@nivo/scales'
import { ScaleBandDemo } from './ScaleBandDemo'
import { ScaleConfigAttr } from './types'
import { SCALES_CONFIG_ATTRS } from './scalesConfig'
import { ScaleGuide } from './ScaleGuide'

const SCALE_BAND_CONFIG: ScaleConfigAttr[] = [
    {
        ...SCALES_CONFIG_ATTRS.round,
        defaultValue: bandScaleDefaults.round,
    },
]

export const ScaleBand = () => (
    <ScaleGuide
        type="band"
        config={SCALE_BAND_CONFIG}
        description={`
            A band scale is an ordinal scale that maps a set of discrete input values (your
            categories) to a continuous numeric output range by dividing that range into
            uniform “bands”.

            It’s perfect for bar charts or any time you need evenly-spaced slots for each
            category.
        `}
        useCase={`
            Imagine you want to draw five bars for 5 tree species, in a 500 px-wide chart:
            
            - Domain: \`['Pine','Maple','Juniper','Azalea','Wisteria']\`
            - Range: \`[0 … 500] (px)\`
            - Band width: \`500 px ÷ 5 = 100 px\` (assuming no padding)
            
            The scale would map:
            
            - 'Pine' → 0 px
            - 'Maple' → 100 px
            - 'Juniper'→ 200 px
            - 'Azalea' → 300 px
            - 'Wisteria'→ 400 px
            
            And it would have a bandwidth of 100 px, meaning that each bar would be 100
            px wide. So you’d position each bar at x = scale(species) and size it width
            = 100px, giving you five perfectly evenly-spaced bars.
        `}
        demo={ScaleBandDemo}
    />
)
