import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { FaRegHandPointer } from 'react-icons/fa'
import { ActionsLoggerLog } from './ActionsLoggerLog'
import media from '../../theming/mediaQueries'

export const useActionsLogger = (): [any[], (action: any) => void] => {
    const [actions, setActions] = useState<any[]>([])
    const logAction = useCallback(
        action => {
            setActions(actions => [action, ...actions])
        },
        [setActions]
    )

    return [actions, logAction]
}

interface ActionsLoggerProps {
    actions: any[]
    isFullWidth?: boolean
}

export const ActionsLogger = ({ actions, isFullWidth = false }: ActionsLoggerProps) => {
    return (
        <Wrapper isFullWidth={isFullWidth}>
            <Header>Actions Logs</Header>
            {actions.length === 0 && (
                <EmptyContainer>
                    <EmptyIcon size={28} />
                    <EmptyMessage>Start interacting with the chart to log actions</EmptyMessage>
                </EmptyContainer>
            )}
            {actions.map((action, i) => {
                return (
                    <ActionsLoggerLog key={`${i}.${action.type}.${action.label}`} action={action} />
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div<{
    isFullWidth: boolean
}>`
    position: fixed;
    right: 0;
    bottom: 0;
    --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
    --partialWidth: calc(var(--innerWidth) * 0.55);
    ${({ isFullWidth, theme }) => {
        if (isFullWidth) {
            return `
                width: var(--partialWidth);
            `
        }

        return `
            border-left: 1px solid ${theme.colors.border};
            width: calc(var(--partialWidth) / 2);
        `
    }}
    background: ${({ theme }) => theme.colors.cardAltBackground};
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
    height: calc(var(--innerHeight) * 0.4);
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;

    ${media.tablet`
        & {
            right: 0;
            bottom: 0;
            --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
            height: calc(var(--innerHeight) * 0.4);
            ${({ isFullWidth, theme }) => {
                if (isFullWidth) {
                    return `width: 55%;`
                }

                return `
                    border-left: 1px solid ${theme.colors.border};
                    width: calc(55% * 0.5);
                `
            }}
        }
    `}

    ${media.mobile`
        & {
            position: relative;
            right: auto;
            bottom: auto;
            width: auto;
            height: auto;
            border-left-width: 0;
            z-index: 0;
        }
    `}
`

const Header = styled.div`
    top: 0;
    left: 0;
    padding: 7px 12px;
    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
`

const EmptyContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: 0.4;
    padding: 20px;
`

const EmptyMessage = styled.div`
    text-align: center;
    margin-top: 16px;
`

const EmptyIcon = styled(FaRegHandPointer)``
