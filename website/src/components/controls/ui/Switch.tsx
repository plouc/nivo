import React, { memo, useCallback } from 'react'
import styled from 'styled-components'

interface SwitchProps {
    id: string
    value: boolean
    onChange: (v: boolean) => void
    colors?: {
        on?: string
        off?: string
        dot?: string
    }
}

export const Switch = memo(({ id, value, onChange, colors = {} }: SwitchProps) => {
    const handleChange = useCallback(event => onChange(event.target.checked), [onChange])

    return (
        <Wrapper>
            <Input
                id={`${id}.switch`}
                type="checkbox"
                checked={value}
                onChange={handleChange}
                colors={colors}
            />
            <label htmlFor={`${id}.switch`} />
        </Wrapper>
    )
})

const Wrapper = styled.span`
    display: inline-block;
    vertical-align: text-bottom;
    margin: 0;
`

const Input = styled.input<{
    colors: SwitchProps['colors']
}>`
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
        background-color: ${({ colors }) => colors.off || '#e98473'};
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
        background-color: ${({ colors, theme }) => colors.dot || theme.colors.cardBackground};
        border-radius: 6px;
        transform: translate3d(0, 0, 0);
        transition: transform 120ms;
    }

    &:checked + label {
        background-color: ${({ colors }) => colors.on || '#6dc6b7'};
    }

    &:checked + label:after {
        transform: translate3d(18px, 0, 0);
    }
`
