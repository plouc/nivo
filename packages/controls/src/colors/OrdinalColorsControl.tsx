import { useCallback } from 'react'
import styled from 'styled-components'
import { OrdinalColorsControlProps } from '../types'
import { ControlContainer, Label, Select } from '../ui'
import { useOrdinalColorSchemes, ColorSchemeOption } from './helpers'
import {
    ColorSchemeSingleValueComponent,
    ColorSchemeOptionComponent,
} from './ColorSchemeSelectComponents'

export const OrdinalColorsControl = ({
    id,
    label,
    icon,
    value: _value,
    onChange: _onChange,
    context = { path: [] },
}: OrdinalColorsControlProps) => {
    const onChange = useCallback(
        (option: ColorSchemeOption | null) => {
            if (option !== null) _onChange?.(option.value)
        },
        [_onChange]
    )

    const colorSchemes = useOrdinalColorSchemes()
    const value = colorSchemes.find(option => option.value === _value)

    return (
        <ControlContainer id={id}>
            <Label id={id} label={label} inputType="color" icon={icon} context={context} />
            <Container>
                <Select<ColorSchemeOption, false>
                    options={colorSchemes}
                    onChange={onChange}
                    value={value}
                    components={{
                        SingleValue: ColorSchemeSingleValueComponent,
                        Option: ColorSchemeOptionComponent,
                    }}
                />
            </Container>
        </ControlContainer>
    )
}

const Container = styled.div`
    margin-top: 6px;
`
