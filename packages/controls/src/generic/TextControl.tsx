import { useCallback } from 'react'
import styled from 'styled-components'
import { TextControlProps } from '../types'
import { ControlContainer, Label, TextInput } from '../ui'

export const TextControl = ({
    id,
    label,
    icon,
    description,
    disabled,
    value,
    onChange,
    context = { path: [] },
}: TextControlProps) => {
    const handleUpdate = useCallback(event => onChange?.(event.target.value), [onChange])

    return (
        <ControlContainer id={id} description={description}>
            <Label id={id} label={label} icon={icon} context={context} />
            <Container>
                <TextInput
                    id={id}
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
