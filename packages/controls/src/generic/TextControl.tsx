import styled from 'styled-components'
import { TextControlProps } from '../types'
import { ControlContainer, Label, TextInput, YGapSpacer } from '../ui'

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
    return (
        <ControlContainer id={id} description={description} isSingleRow={false}>
            <Label id={id} inputType="text" label={label} icon={icon} context={context} />
            <YGapSpacer />
            <Container>
                <TextInput id={id} value={value} onChange={onChange} disabled={disabled} />
            </Container>
        </ControlContainer>
    )
}

const Container = styled.div`
    & > div {
        width: 100%;
    }
`
