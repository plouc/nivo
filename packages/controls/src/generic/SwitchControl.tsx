import { ControlContainer, Label, Switch, XGapSpacer } from '../ui'
import { SwitchControlProps } from '../types'

export const SwitchControl = ({
    id,
    label,
    icon,
    description,
    value,
    onChange,
    context = { path: [] },
}: SwitchControlProps) => {
    return (
        <ControlContainer id={id} description={description} isSingleRow>
            <Label id={id} label={label} inputType="checkbox" icon={icon} context={context} />
            <XGapSpacer />
            <Switch id={id} value={value} onChange={onChange} />
        </ControlContainer>
    )
}
