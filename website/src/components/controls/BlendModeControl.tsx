import React from 'react'
// @ts-ignore
import { blendModes } from '@nivo/core'
import { ChoicesControl } from './ChoicesControl'
import { BlendModeControlConfig } from './types'
import { ChartProperty, Flavor } from '../../types'

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
    value: string
    onChange: (value: string) => void
    context?: any
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
