import React, { ReactNode } from 'react'
import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import isFunction from 'lodash/isFunction'
import styled from 'styled-components'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext } from '../types'

const getDefaultValue = (value: any) => {
    if (isPlainObject(value)) {
        return `${JSON.stringify(value)}`
    } else if (isArray(value)) {
        const elements = value.reduce((acc, v, i) => {
            acc.push(React.cloneElement(getDefaultValue(v), { key: i }))
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

type PropertyHeaderProps = ChartProperty & {
    id?: string
    name?: string
    context?: ControlContext
    currentFlavor?: Flavor
}

export const PropertyHeader = ({
    id,
    name,
    type,
    required,
    defaultValue,
    context,
    currentFlavor,
}: PropertyHeaderProps) => {
    let label: ReactNode = name
    if (context) {
        label = (
            <>
                <LabelParentPath>{context.path.join('.')}.</LabelParentPath>
                {name}
            </>
        )
    }

    let propertyType: string | undefined = undefined
    if (type !== undefined) {
        if (typeof type === 'string') {
            propertyType = type
        } else if (typeof type === 'object' && currentFlavor) {
            // If an object is provided, it means it depends on the current flavor.
            propertyType = type[currentFlavor]
        }
    }

    return (
        <Container>
            <Label htmlFor={id}>{label}</Label>
            {propertyType && <Type>{propertyType}</Type>}
            {required && <Required>required</Required>}
            {!required && <Optional>optional</Optional>}
            {defaultValue !== undefined && (
                <>
                    <Default>default:</Default>
                    {getDefaultValue(defaultValue)}
                </>
            )}
        </Container>
    )
}

const Container = styled.div`
    margin-bottom: 7px;
`

const Label = styled.label`
    display: inline-block;
    white-space: nowrap;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
`

const LabelParentPath = styled.span`
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textLight};
`

const Type = styled.span`
    display: inline-block;
    white-space: nowrap;
    margin-left: 9px;
    color: ${({ theme }) => theme.colors.textLight};
`

const Required = styled.span`
    display: inline-block;
    white-space: nowrap;
    margin-left: 9px;
    color: ${({ theme }) => theme.colors.text};
`

const Optional = styled.span`
    display: inline-block;
    white-space: nowrap;
    margin-left: 9px;
    color: ${({ theme }) => theme.colors.text};
    font-style: italic;
`

const Default = styled.span`
    display: inline-block;
    white-space: nowrap;
    margin: 0 5px 0 9px;
    color: ${({ theme }) => theme.colors.textLight};
`
