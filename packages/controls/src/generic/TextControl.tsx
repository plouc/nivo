import { memo } from 'react'
import styled from 'styled-components'
import { TextControlProps } from '../types'
import { ControlContainer, Label, TextInput, YGapSpacer } from '../ui'
import { defaultContext } from '../defaults'

const NoMemoTextControl = ({
    id,
    label,
    icon,
    description,
    disabled,
    value,
    onChange,
    context = defaultContext,
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

export const TextControl = memo(NoMemoTextControl) as typeof NoMemoTextControl

const Container = styled.div`
    & > div {
        width: 100%;
    }
`
