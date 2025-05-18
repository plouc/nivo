import React from 'react'
// @ts-ignore
import { blendModes } from '@nivo/core'
import { CssMixBlendMode } from '@nivo/core'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { BlendModeControlConfig, ControlContext } from '../types'
import { ChoicesControl } from '../generics'

const choices = blendModes.map((mode: string) => ({
    label: mode,
    value: mode,
}))

interface BlendModeControlProps {
    id: string
    property: ChartPropertyWithControl<BlendModeControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: CssMixBlendMode
    onChange: (blendMode: CssMixBlendMode) => void
    context?: ControlContext
}

export const BlendModeControl = ({ property: _property, ...props }: BlendModeControlProps) => {
    const { control, ...property } = _property

    return (
        <ChoicesControl<CssMixBlendMode>
            {...props}
            property={{
                ...property,
                control: {
                    ...control,
                    type: 'choices',
                    choices,
                },
            }}
        />
    )
}
