import { ReactNode } from 'react'
import styled from 'styled-components'
import { ControlContext } from '../types'
import { IconType, Icon } from './Icon'

type LabelProps = {
    id: string
    label?: string
    icon?: IconType | ReactNode
    context: ControlContext
}

export const Label = ({ id, label: _label, icon, context }: LabelProps) => {
    let label: ReactNode = _label || id
    if (context.path.length > 0) {
        label = (
            <>
                <LabelParentPath>{context.path.join('.')}.</LabelParentPath>
                {label}
            </>
        )
    }

    return (
        <Container>
            {icon && <Icon type={icon} />}
            <HtmlLabel htmlFor={id}>{label}</HtmlLabel>
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
