import { memo, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Unit } from '../types'

type TextInputProps = {
    isNumber?: boolean
    unit?: Unit
} & InputHTMLAttributes<HTMLInputElement>

export const TextInput = memo(({ unit, isNumber = false, ...props }: TextInputProps) => {
    const hasUnit = !!unit

    return (
        <Container>
            <InputElement type="text" hasUnit={hasUnit} isNumber={isNumber} {...props} />
            {hasUnit && <UnitContainer>{unit}</UnitContainer>}
        </Container>
    )
})

const Container = styled.div`
    position: relative;
    height: 28px;
    width: 90px;
`

const UnitContainer = styled.span`
    position: absolute;
    top: 1px;
    right: 1px;
    font-size: 12px;
    height: 26px;
    display: flex;
    align-items: center;
    padding: 0 7px;
    pointer-events: none;
    color: ${({ theme }) => theme.colors.textLight};
`

const InputElement = styled.input<{
    hasUnit: boolean
    isNumber: boolean
}>`
    height: 100%;
    width: 100%;
    font-size: 12px;
    padding: 0 7px;
    padding-right: ${({ hasUnit }) => (hasUnit ? 26 : 7)}px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.inputBackground};
    border: 1px solid ${({ theme }) => theme.colors.border};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    text-align: ${({ isNumber }) => (isNumber ? 'right' : 'left')};

    &:focus {
        outline: 0;
        cursor: auto;
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.text};
        box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.accent};
    }

    &:disabled {
        cursor: not-allowed;
        color: ${({ theme }) => theme.colors.textLight};
    }
`
