import React, { ReactNode } from 'react'
import isPlainObject from 'lodash/isPlainObject.js'
import isArray from 'lodash/isArray.js'
import isString from 'lodash/isString.js'
import isNumber from 'lodash/isNumber.js'
import isBoolean from 'lodash/isBoolean.js'
import isFunction from 'lodash/isFunction.js'
import styled from 'styled-components'
import { LuAsterisk } from 'react-icons/lu'
import { MdSubdirectoryArrowRight } from 'react-icons/md'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext } from '../types'

const getDefaultValue = (value: any) => {
    if (isPlainObject(value)) {
        return <code className="code-object">{JSON.stringify(value)}</code>
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

    const isNested = context ? context.path.length > 0 : false

    return (
        <Container $isNested={isNested}>
            {isNested && (
                <NestedIndicator>
                    <MdSubdirectoryArrowRight />
                </NestedIndicator>
            )}
            <Label htmlFor={id}>{label}</Label>
            {required && (
                <Required>
                    <LuAsterisk />
                </Required>
            )}
            {propertyType && <Type>{propertyType}</Type>}
            {defaultValue !== undefined && (
                <>
                    <Default>default:</Default>
                    {getDefaultValue(defaultValue)}
                </>
            )}
        </Container>
    )
}

const Container = styled.div<{
    $isNested: boolean
}>`
    position: relative;
    margin-bottom: 7px;
    padding-left: ${({ $isNested }) => ($isNested ? '20px' : '0')};

    code.code-object {
        font-size: 12px;
    }
`

const Label = styled.label`
    display: inline-block;
    white-space: nowrap;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
`

const NestedIndicator = styled.span`
    position: absolute;
    top: 1px;
    left: -3px;
    display: inline-flex;
    font-size: 20px;
    opacity: 0.35;
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
    font-size: 12px;

    svg {
        position: absolute;
        top: -4px;
    }
`

const Default = styled.span`
    display: inline-block;
    white-space: nowrap;
    margin: 0 5px 0 9px;
    color: ${({ theme }) => theme.colors.textLight};
`
