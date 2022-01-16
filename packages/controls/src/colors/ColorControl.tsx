import styled from 'styled-components'
import { ColorControlProps } from '../types'
import { ControlContainer, Label, ColorInput } from '../ui'

export const ColorControl = ({
    id,
    label,
    icon,
    value,
    context = { path: [] },
    onChange,
}: ColorControlProps) => {
    return (
        <ControlContainer id={id}>
            <Container>
                <Label id={id} label={label} inputType="color" icon={icon} context={context} />
                <ColorInput id={id} value={value} onChange={onChange} />
            </Container>
        </ControlContainer>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
