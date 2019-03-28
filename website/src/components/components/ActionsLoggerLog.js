/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

const ActionContainer = styled.div`
    font-size: 13px;
`

const ActionHeader = styled.div`
    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    display: grid;
    grid-template-columns: 60px auto 60px;
    align-items: center;
    cursor: pointer;
`

const ActionType = styled.span`
    padding: 7px 12px;
    opacity: 0.5;
`

const ActionLabel = styled.span`
    font-weight: 600;
    padding: 7px 12px;
`

const ActionData = styled.pre`
    font-size: 12px;
    padding: 7px 12px;
    line-height: 18px;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    margin: 0;
`

const Toggle = styled.span`
    padding: 7px 12px;
    text-align: right;
`

const ActionsLoggerLog = ({ action }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = useCallback(() => setIsOpen(flag => !flag), [setIsOpen])

    return (
        <ActionContainer>
            <ActionHeader onClick={toggle}>
                <ActionType>{action.type}</ActionType>
                <ActionLabel>{action.label}</ActionLabel>
                <Toggle>{isOpen ? '-' : '{ … }'}</Toggle>
            </ActionHeader>
            {isOpen && <ActionData>{JSON.stringify(action.data, null, '  ')}</ActionData>}
        </ActionContainer>
    )
}

export default ActionsLoggerLog
