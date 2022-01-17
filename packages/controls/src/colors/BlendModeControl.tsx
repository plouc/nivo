import { memo, useCallback, useMemo } from 'react'
import {
    // @ts-ignore
    blendModes,
    CssMixBlendMode,
} from '@nivo/core'
import { BlendModeControlProps } from '../types'
import { ControlContainer, Label, Select, YGapSpacer } from '../ui'

type BlendModeOption = {
    label: string
    value: CssMixBlendMode
}

const NoMemoBlendModeControl = ({
    id,
    label,
    icon,
    value: _value,
    setValue,
    context = { path: [] },
}: BlendModeControlProps) => {
    const options: BlendModeOption[] = useMemo(
        () =>
            blendModes.map((mode: string) => ({
                label: mode,
                value: mode,
            })),
        []
    )

    const value = options.find(option => option.value === _value)
    const onChange = useCallback(
        (option: BlendModeOption | null) => {
            if (option !== null) setValue?.(option.value)
        },
        [setValue]
    )

    return (
        <ControlContainer id={id} isSingleRow={false}>
            <Label id={id} label={label} icon={icon} context={context} />
            <YGapSpacer />
            <Select<BlendModeOption, false> options={options} onChange={onChange} value={value} />
        </ControlContainer>
    )
}

export const BlendModeControl = memo(NoMemoBlendModeControl) as typeof NoMemoBlendModeControl
