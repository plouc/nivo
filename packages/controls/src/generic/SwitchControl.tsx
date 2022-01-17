import { memo } from 'react'
import { ControlContainer, Label, Switch, XGapSpacer } from '../ui'
import { SwitchControlProps } from '../types'
import { defaultContext } from '../defaults'

const NoMemoSwitchControl = ({
    id,
    label,
    icon,
    description,
    value,
    setValue,
    context = defaultContext,
}: SwitchControlProps) => {
    return (
        <ControlContainer id={id} description={description} isSingleRow>
            <Label id={id} label={label} inputType="checkbox" icon={icon} context={context} />
            <XGapSpacer />
            <Switch id={id} value={value} onChange={setValue} />
        </ControlContainer>
    )
}

export const SwitchControl = memo(NoMemoSwitchControl) as typeof NoMemoSwitchControl
