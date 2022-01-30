import styled from 'styled-components'
import { generateInputId } from '../helpers'
import { ChangeEvent, useCallback } from 'react'

type ColorInputProps = {
    id: string
    value: string
    onChange: (color: string) => void
    disabled?: boolean
}

export const ColorInput = ({
    id,
    value,
    onChange: _onChange,
    disabled = false,
}: ColorInputProps) => {
    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            _onChange(event.target.value)
        },
        [_onChange]
    )

    return (
        <InputLabel $color={value}>
            <span>{value}</span>
            <Input
                type="color"
                id={generateInputId(id, 'color')}
                value={value}
                disabled={disabled}
                onChange={onChange}
            />
        </InputLabel>
    )
}

const InputLabel = styled.label.attrs<{
    $color: string
}>(({ $color }) => ({
    style: {
        backgroundColor: $color,
    },
}))<{
    $color: string
}>`
    width: 90px;
    height: 26px;
    padding: 0 7px;
    border-radius: ${({ theme }) => theme.borderRadius.input}px;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.border};
`

const Input = styled.input`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    appearance: none;
    width: 24px;
    height: 100%;
    cursor: pointer;
`
