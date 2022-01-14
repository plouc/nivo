import styled from 'styled-components'
import { useCallback, ChangeEvent } from 'react'

interface RadioProps<Value extends string | number = string> {
    value: Value
    columns?: number
    options: {
        label: string
        value: Value
    }[]
    onChange: (value: Value) => void
}

export const Radio = <Value extends string | number = string>({
    options,
    columns = 2,
    value,
    onChange,
}: RadioProps<Value>) => {
    const isNumber = typeof value === 'number'
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChange?.((isNumber ? Number(event.target.value) : event.target.value) as Value)
        },
        [isNumber, onChange]
    )

    return (
        <Container columns={columns}>
            {options.map(option => (
                <Item isSelected={option.value === value} key={option.value}>
                    <input
                        type="radio"
                        value={option.value}
                        checked={value === option.value}
                        onChange={handleChange}
                    />
                    {option.label}
                </Item>
            ))}
        </Container>
    )
}

const Container = styled.div<{
    columns: number
}>`
    margin-top: 6px;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 12px;
    border-right-width: 0;
    border-bottom-width: 0;
`

const Item = styled.label<{ isSelected: boolean }>`
    cursor: pointer;
    padding: 7px 10px;
    white-space: nowrap;
    text-align: center;
    font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};
    background: ${({ isSelected, theme }) =>
        isSelected ? theme.colors.cardBackground : theme.colors.inputBackground};
    color: ${({ isSelected, theme }) => (isSelected ? theme.colors.text : theme.colors.textLight)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-top-width: 0;
    border-left-width: 0;
    user-select: none;

    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }

    input {
        display: none;
    }
`
