import React, { ReactNode } from 'react'
import isPlainObject from 'lodash/isPlainObject.js'
import isArray from 'lodash/isArray.js'
import isString from 'lodash/isString.js'
import isNumber from 'lodash/isNumber.js'
import isBoolean from 'lodash/isBoolean.js'
import isFunction from 'lodash/isFunction.js'
import styled from 'styled-components'
import { MdSubdirectoryArrowRight } from 'react-icons/md'
import { LuAsterisk } from 'react-icons/lu'
import { ControlContext, ChartProperty } from '../types'

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

interface PropertyHeaderProps {
    property: ChartProperty<any>
    context?: ControlContext
}

export const ControlHeader = ({ property, context }: PropertyHeaderProps) => {
    let label: ReactNode = property.name
    if (context) {
        label = (
            <>
                <LabelParentPath>{context.path.join('.')}.</LabelParentPath>
                {property.name}
            </>
        )
    }

    let propertyType: string | undefined = undefined
    if (property.type !== undefined) {
        if (typeof property.type === 'string') {
            propertyType = property.type
        } else if (typeof property.type === 'object' && context?.currentFlavor) {
            // If an object is provided, it means it depends on the current flavor.
            propertyType = property.type[context.currentFlavor]
        }
    }

    const isNested = context ? context.path.length > 0 : false

    return (
        <Container $isNested={isNested}>
            {isNested && (
                <NestedIndicator>
                    <MdSubdirectoryArrowRight />
                </NestedIndicator>
            )}
            <Label>{label}</Label>
            {property.required && (
                <Required>
                    <LuAsterisk />
                </Required>
            )}
            {propertyType && <Type>{propertyType}</Type>}
            {property.defaultValue !== undefined && (
                <>
                    <Default>default:</Default>
                    {getDefaultValue(property.defaultValue)}
                </>
            )}
        </Container>
    )
}

const Container = styled.div<{
    $isNested: boolean
}>`
    margin-bottom: ${({ theme }) => theme.spacing[3]};
    position: relative;
    padding-left: ${({ $isNested }) => ($isNested ? '20px' : '0')};
`

const Label = styled.label`
    display: inline-block;
    white-space: nowrap;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
`

const NestedIndicator = styled.span`
    position: absolute;
    top: -3px;
    left: 0;
    display: inline-flex;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textLight};
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
    width: 10px;
    height: 1em;
    position: relative;
    color: ${({ theme }) => theme.colors.accent};

    svg {
        position: absolute;
        top: -2px;
    }
`

const Default = styled.span`
    display: inline-block;
    white-space: nowrap;
    margin: 0 5px 0 9px;
    color: ${({ theme }) => theme.colors.textLight};
`
