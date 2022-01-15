import { useCallback } from 'react'
import styled from 'styled-components'
import { ColorControlProps } from '../types'
import { ControlContainer, Label } from '../ui'

export const ColorControl = ({
    id,
    label,
    icon,
    value,
    context = { path: [] },
    onChange,
}: ColorControlProps) => {
    const handleChange = useCallback(
        e => {
            onChange?.(e.target.value)
        },
        [onChange]
    )

    return (
        <ControlContainer id={id}>
            <Container>
                <Heading>
                    <Label id={id} label={label} icon={icon} context={context} />
                    <Value>{value}</Value>
                </Heading>
                <input type="color" id={id} onChange={handleChange} value={value} />
            </Container>
        </ControlContainer>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Heading = styled.div`
    display: flex;
    flex-direction: column;
`

const Value = styled.span`
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.accent};
`
