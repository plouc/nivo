import { useCallback } from 'react'
import styled from 'styled-components'
import { ColorControlProps } from '../types'
import { ControlContainer, Header } from '../ui'

export const ColorControl = ({
    name,
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
        <ControlContainer name={name}>
            <Container>
                <Heading>
                    <Header name={name} icon={icon} context={context} />
                    <Value>{value}</Value>
                </Heading>
                <input type="color" id={name} onChange={handleChange} value={value} />
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
