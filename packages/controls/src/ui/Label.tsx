import { ReactNode } from 'react'
import styled from 'styled-components'
import { ControlContext, InputType } from '../types'
import { IconType, Icon } from './Icon'
import { generateInputId } from '../helpers'

export type LabelProps = {
    id: string
    label?: string
    inputType?: InputType
    icon?: IconType | ReactNode
    context: ControlContext
}

export const Label = ({ id, label: _label, inputType, icon, context }: LabelProps) => {
    let label: ReactNode = _label || id
    if (context.path.length > 0) {
        label = (
            <>
                <LabelParentPath>{context.path.join('.')}.</LabelParentPath>
                {label}
            </>
        )
    }

    const htmlFor = inputType ? generateInputId(id, inputType) : undefined

    return (
        <Container>
            {icon && <Icon type={icon} />}
            <HtmlLabel htmlFor={htmlFor}>{label}</HtmlLabel>
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
