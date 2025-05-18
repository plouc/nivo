import React, { memo } from 'react'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { Control, Switch } from '../ui'
import { ControlContext, SwitchControlConfig } from '../types'

interface SwitchControlProps {
    id: string
    property: ChartPropertyWithControl<SwitchControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: boolean
    onChange: (value: boolean) => void
    context?: ControlContext
}

export const SwitchControl = memo(
    ({ id, property, flavors, currentFlavor, value, onChange, context }: SwitchControlProps) => {
        return (
            <Control
                id={id}
                property={property}
                flavors={flavors}
                currentFlavor={currentFlavor}
                context={context}
            >
                <Switch id={id} value={value} onChange={onChange} />
                &nbsp;&nbsp;&nbsp;
            </Control>
        )
    }
)
