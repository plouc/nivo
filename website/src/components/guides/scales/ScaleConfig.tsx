import React from 'react'
import styled from 'styled-components'
import capitalize from 'lodash/capitalize.js'
import { ScaleType } from '@nivo/scales'
import { Markdown } from '../../Markdown'
import { ScaleConfigAttr } from './types'

interface ScaleConfigProps {
    type: ScaleType
    config: ScaleConfigAttr[]
}

export const ScaleConfig = ({ type, config }: ScaleConfigProps) => {
    return (
        <>
            <h3 id={`${type}-scale-config`}>
                <a href={`#${type}-scale-config`}>{capitalize(type)} scale configuration</a>
            </h3>
            <p>
                The most minimal {type} scale configuration is:&nbsp;
                <code>{`scale={{ type: '${type}' }}`}</code>
            </p>
            <ScaleConfigTable>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {config.map(attr => (
                        <tr key={attr.key}>
                            <td>{attr.key}</td>
                            <td>{attr.type}</td>
                            <td>{`${attr.defaultValue}`}</td>
                            <td>
                                <Markdown source={attr.description} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ScaleConfigTable>
        </>
    )
}

const ScaleConfigTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    th {
        padding: 6px 12px;
        color: ${({ theme }) => theme.colors.textLight};
        font-size: 11px;
        font-weight: 800;
        border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }

    td {
        padding: 4px 12px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

        &:first-child {
            font-weight: 600;
        }

        &:first-child,
        &:nth-child(2),
        &:nth-child(3) {
            font-size: 13px;
            font-family: ${({ theme }) => theme.fontFamilyMono};
        }

        &:last-child p {
            margin: 0;
        }
    }

    tbody {
        font-size: 14px;

        tr:nth-child(even) {
            background-color: ${({ theme }) => theme.colors.cardBackground};
        }

        tr:last-child {
            td {
                border-bottom-width: 0;
            }
        }
    }
`
