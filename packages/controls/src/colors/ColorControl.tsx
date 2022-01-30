import { memo } from 'react'
import { ColorControlProps } from '../types'
import { ControlContainer, Label, ColorInput, XGapSpacer } from '../ui'

const NoMemoColorControl = ({
    id,
    label,
    icon,
    value,
    onChange,
    context = { path: [] },
}: ColorControlProps) => {
    return (
        <ControlContainer id={id} isSingleRow>
            <Label id={id} label={label} inputType="color" icon={icon} context={context} />
            <XGapSpacer />
            <ColorInput id={id} value={value} onChange={onChange} />
        </ControlContainer>
    )
}

export const ColorControl = memo(NoMemoColorControl) as typeof NoMemoColorControl
