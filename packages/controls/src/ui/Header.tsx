import { ReactNode, cloneElement } from 'react'
import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import isFunction from 'lodash/isFunction'
import styled from 'styled-components'
import { ControlContext } from '../types'
import { IconType, Icon } from './Icon'

const getDefaultValue = (value: any) => {
    if (isPlainObject(value)) {
        return `${JSON.stringify(value)}`
    } else if (isArray(value)) {
        const elements = value.reduce((acc, v, i) => {
            acc.push(cloneElement(getDefaultValue(v), { key: i }))
            if (i + 1 < value.length) {
                acc.push(<span key={`${i}.comma`}>, </span>)
            }
            return acc
        }, [])

        return <span>[{elements}]</span>
    } else if (isString(value)) {
        return <code className="code-string">'{value}'</code>
    } else if (isNumber(value)) {
        return <code className="code-number">{value}</code>
    } else if (isBoolean(value)) {
        return <code className="code-boolean">{value ? 'true' : 'false'}</code>
    } else if (isFunction(value)) {
        return `{${value.toString()}}`
    }

    return value
}

type HeaderProps = {
    name: string
    icon?: IconType | ReactNode
    context: ControlContext
}

export const Header = ({ name, icon, context }: HeaderProps) => {
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
            <Label htmlFor={name}>{label}</Label>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Label = styled.label`
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-weight: 600;
`

const LabelParentPath = styled.span`
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textLight};
`
