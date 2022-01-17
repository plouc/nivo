import { ColorControlProps } from '../types'
import { ControlContainer, Label, ColorInput, XGapSpacer } from '../ui'

export const ColorControl = ({
    id,
    label,
    icon,
    value,
    context = { path: [] },
    onChange,
}: ColorControlProps) => {
    return (
        <ControlContainer id={id} isSingleRow>
            <Label id={id} label={label} inputType="color" icon={icon} context={context} />
            <XGapSpacer />
            <ColorInput id={id} value={value} onChange={onChange} />
        </ControlContainer>
    )
}
