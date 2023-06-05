import React from 'react'
// @ts-ignore
import { blendModes, CssMixBlendMode } from '@bitbloom/nivo-core'
import { ChartProperty, Flavor } from '../../../types'
import { BlendModeControlConfig, ControlContext } from '../types'
import { ChoicesControl } from '../generics'

const choices = blendModes.map((mode: string) => ({
    label: mode,
    value: mode,
}))

interface BlendModeControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: BlendModeControlConfig
    value: CssMixBlendMode
    onChange: (blendMode: CssMixBlendMode) => void
    context?: ControlContext
}

export const BlendModeControl = ({ config, ...props }: BlendModeControlProps) => (
    <ChoicesControl
        {...props}
        config={{
            ...config,
            type: 'choices',
            choices,
        }}
    />
)
