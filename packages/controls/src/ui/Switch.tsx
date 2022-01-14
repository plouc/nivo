import { memo, useCallback } from 'react'
import styled from 'styled-components'

interface SwitchProps {
    name: string
    value: boolean
    onChange?: (value: boolean) => void
}

export const Switch = memo(({ name, value, onChange }: SwitchProps) => {
    const handleChange = useCallback(event => onChange?.(event.target.checked), [onChange])

    return (
        <Wrapper>
            <Input id={`${name}.switch`} type="checkbox" checked={value} onChange={handleChange} />
            <label htmlFor={`${name}.switch`} />
        </Wrapper>
    )
})

const Wrapper = styled.span`
    display: inline-block;
    vertical-align: text-bottom;
    margin: 0;
`

const Input = styled.input`
    position: absolute;
    margin-left: -9999px;
    visibility: hidden;

    & + label {
        display: block;
        position: relative;
        cursor: pointer;
        outline: none;
        user-select: none;
        padding: 2px;
        width: 36px;
        height: 18px;
        background-color: ${({ theme }) => theme.colors.inputBackground};
        border-radius: 9px;
        transition: border-color 120ms, background-color 120ms;
    }

    & + label:after {
        content: '';
        display: block;
        position: absolute;
        top: 3px;
        left: 3px;
        width: 12px;
        height: 12px;
        background-color: ${({ theme }) => theme.colors.cardBackground};
        border-radius: 6px;
        transform: translate3d(0, 0, 0);
        transition: transform 120ms;
    }

    &:checked + label {
        background-color: ${({ theme }) => theme.colors.accent};
    }

    &:checked + label:after {
        transform: translate3d(18px, 0, 0);
    }
`
