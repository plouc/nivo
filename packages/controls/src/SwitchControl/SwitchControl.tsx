import { memo } from 'react'
import { Control, ControlHeader, ControlHelp, Switch } from '../chrome'
import { ChartProperty, ControlContext } from '../types'
import { SwitchControlConfig } from './types'

interface SwitchControlProps {
    property: ChartProperty<SwitchControlConfig>
    context?: ControlContext
    value: boolean
    onChange: (v: boolean) => void
}

export const SwitchControl = memo(({ property, context, value, onChange }: SwitchControlProps) => {
    return (
        <Control property={property} context={context}>
            <ControlHeader property={property} context={context} />
            <Switch id={property.name} value={value} onChange={onChange} />
            &nbsp;&nbsp;&nbsp;
            <ControlHelp>{property.help || property.name}</ControlHelp>
        </Control>
    )
})
