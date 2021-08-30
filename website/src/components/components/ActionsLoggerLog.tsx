import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

export const ActionsLoggerLog = ({ action }: { action: any }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = useCallback(() => setIsOpen(flag => !flag), [setIsOpen])

    return (
        <ActionContainer>
            <ActionHeader onClick={toggle}>
                <ActionType>{action.type}</ActionType>
                <Color>
                    {action.color && (
                        <ColorChip style={{ background: action.color || 'transparent' }} />
                    )}
                </Color>
                <ActionLabel>{action.label}</ActionLabel>
                <Toggle>{isOpen ? '-' : '{ … }'}</Toggle>
            </ActionHeader>
            {isOpen && <ActionData>{JSON.stringify(action.data, null, '  ')}</ActionData>}
        </ActionContainer>
    )
}

const ActionContainer = styled.div`
    font-size: 13px;
`

const ActionHeader = styled.div`
    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    display: grid;
    grid-template-columns: 60px 8px auto 60px;
    align-items: center;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};
    }
`

const ActionType = styled.span`
    padding: 7px 12px;
    opacity: 0.5;
`

const Color = styled.span`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ColorChip = styled.span`
    width: 8px;
    height: 8px;
    display: block;
    border-radius: 6px;
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
