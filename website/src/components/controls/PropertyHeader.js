/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import isFunction from 'lodash/isFunction'
import styled from 'styled-components'

const getDefaultValue = value => {
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

const PropertyHeader = ({ id, name, type, required, defaultValue, context }) => {
    let label = name
    if (context) {
        label = (
            <>
                <LabelParentPath>{context.path.join('.')}.</LabelParentPath>
                {name}
            </>
        )
    }

    return (
        <Container>
            <Label htmlFor={id}>{label}</Label>
            {type !== undefined && <Type>{type}</Type>}
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

export default PropertyHeader
