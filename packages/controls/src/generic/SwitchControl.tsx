import styled from 'styled-components'
import { ControlContainer, Label, Switch } from '../ui'
import { SwitchControlProps } from '../types'

export const SwitchControl = ({
    name,
    icon,
    description,
    value,
    onChange,
    context = { path: [] },
}: SwitchControlProps) => {
    return (
        <ControlContainer name={name} description={description}>
            <TopContainer>
                <Label name={name} icon={icon} context={context} />
                <Switch name={name} value={value} onChange={onChange} />
            </TopContainer>
        </ControlContainer>
    )
}

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
