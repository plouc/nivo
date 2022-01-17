import { memo, useCallback } from 'react'
import { OrdinalColorsControlProps } from '../types'
import { ControlContainer, Label, Select, YGapSpacer } from '../ui'
import { useOrdinalColorSchemes, ColorSchemeOption } from './helpers'
import {
    ColorSchemeSingleValueComponent,
    ColorSchemeOptionComponent,
} from './ColorSchemeSelectComponents'

const NoMemoOrdinalColorsControl = ({
    id,
    label,
    icon,
    value: _value,
    setValue,
    context = { path: [] },
}: OrdinalColorsControlProps) => {
    const onChange = useCallback(
        (option: ColorSchemeOption | null) => {
            if (option !== null) setValue(option.value)
        },
        [setValue]
    )

    const colorSchemes = useOrdinalColorSchemes()
    const value = colorSchemes.find(option => option.value === _value)

    return (
        <ControlContainer id={id} isSingleRow={false}>
            <Label id={id} label={label} inputType="color" icon={icon} context={context} />
            <YGapSpacer />
            <Select<ColorSchemeOption, false>
                options={colorSchemes}
                onChange={onChange}
                value={value}
                components={{
                    SingleValue: ColorSchemeSingleValueComponent,
                    Option: ColorSchemeOptionComponent,
                }}
            />
        </ControlContainer>
    )
}

export const OrdinalColorsControl = memo(
    NoMemoOrdinalColorsControl
) as typeof NoMemoOrdinalColorsControl
