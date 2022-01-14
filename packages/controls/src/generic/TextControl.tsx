import { useCallback } from 'react'
import styled from 'styled-components'
import { ControlContainer, Header, TextInput } from '../ui'
import { TextControlProps } from '../types'

export const TextControl = ({
    name,
    description,
    disabled,
    value,
    onChange,
    context = { path: [] },
}: TextControlProps) => {
    const handleUpdate = useCallback(event => onChange?.(event.target.value), [onChange])

    return (
        <ControlContainer name={name} description={description}>
            <Header name={name} context={context} />
            <Container>
                <TextInput
                    name={name}
                    type="text"
                    value={value}
                    onChange={handleUpdate}
                    disabled={disabled}
                />
            </Container>
        </ControlContainer>
    )
}

const Container = styled.div`
    margin-top: 6px;

    & > div {
        width: 100%;
    }
`
