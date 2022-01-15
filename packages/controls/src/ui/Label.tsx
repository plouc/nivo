import { ReactNode } from 'react'
import styled from 'styled-components'
import { ControlContext } from '../types'
import { IconType, Icon } from './Icon'

type LabelProps = {
    name: string
    icon?: IconType | ReactNode
    context: ControlContext
}

export const Label = ({ name, icon, context }: LabelProps) => {
    let label: ReactNode = name
    if (context.path.length > 0) {
        label = (
            <>
                <LabelParentPath>{context.path.join('.')}.</LabelParentPath>
                {name}
            </>
        )
    }

    return (
        <Container>
            {icon && <Icon type={icon} />}
            <HtmlLabel htmlFor={name}>{label}</HtmlLabel>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
`

const HtmlLabel = styled.label`
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-weight: 600;
`

const LabelParentPath = styled.span`
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textLight};
`
