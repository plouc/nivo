import styled from 'styled-components'
import { ControlContainer, Label, Switch } from '../ui'
import { SwitchControlProps } from '../types'

export const SwitchControl = ({
    id,
    label,
    icon,
    description,
    value,
    onChange,
    context = { path: [] },
}: SwitchControlProps) => {
    return (
        <ControlContainer id={id} description={description}>
            <TopContainer>
                <Label id={id} label={label} icon={icon} context={context} />
                <Switch id={id} label={label} value={value} onChange={onChange} />
            </TopContainer>
        </ControlContainer>
    )
}

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
