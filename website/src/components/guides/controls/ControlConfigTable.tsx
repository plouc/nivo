import React from 'react'
import styled from 'styled-components'
import { FiCheck } from 'react-icons/fi'

export type ControlConfigItem = {
    name: string
    type: string
    required: boolean
    defaultValue?: any
    description?: string
}

export const ControlConfigTable = ({ config }: { config: ControlConfigItem[] }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <Heading>name</Heading>
                    <Heading>type</Heading>
                    <Heading>required</Heading>
                    <Heading>default</Heading>
                    <Heading>description</Heading>
                </tr>
            </thead>
            <tbody>
                {config.map(item => {
                    return (
                        <tr key={item.name}>
                            <Name>{item.name}</Name>
                            <Type>
                                <code>{item.type}</code>
                            </Type>
                            <Required $isRequired={item.required}>
                                {item.required && <FiCheck />}
                            </Required>
                            <td>{item.defaultValue}</td>
                            <Description>{item.description}</Description>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

const Table = styled.table`
    font-size: 14px;
    border-collapse: collapse;
    width: 100%;

    & tbody tr:nth-child(even) {
        background-color: ${({ theme }) => theme.colors.cardAltBackground};
    }
`

const Heading = styled.th`
    font-size: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`

const Name = styled.td`
    font-weight: 600;
`

const Type = styled.td`
    code {
        color: ${({ theme }) => theme.colors.accent};
    }
`

const Required = styled.td<{
    $isRequired: boolean
}>``

const Description = styled.td`
    color: ${({ theme }) => theme.colors.textLight};
`
