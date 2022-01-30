import { memo } from 'react'
import { RadioControlProps, SupportedValues } from '../types'
import { ControlContainer, Label, Radio, YGapSpacer } from '../ui'
import { defaultContext } from '../defaults'

const NoMemoRadioControl = <Value extends SupportedValues<'radio'> = string>({
    id,
    label,
    icon,
    description,
    choices,
    columns,
    value,
    onChange,
    context = defaultContext,
}: RadioControlProps<Value>) => {
    return (
        <ControlContainer id={id} description={description} isSingleRow={false}>
            <Label id={id} label={label} icon={icon} context={context} />
            <YGapSpacer />
            <Radio<Value> options={choices} columns={columns} value={value} onChange={onChange} />
        </ControlContainer>
    )
}

export const RadioControl = memo(NoMemoRadioControl) as typeof NoMemoRadioControl
