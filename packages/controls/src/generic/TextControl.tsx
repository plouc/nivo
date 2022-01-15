import { useCallback } from 'react'
import styled from 'styled-components'
import { TextControlProps } from '../types'
import { ControlContainer, Label, TextInput } from '../ui'

export const TextControl = ({
    name,
    icon,
    description,
    disabled,
    value,
    onChange,
    context = { path: [] },
}: TextControlProps) => {
    const handleUpdate = useCallback(event => onChange?.(event.target.value), [onChange])

    return (
        <ControlContainer name={name} description={description}>
            <Label name={name} icon={icon} context={context} />
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
