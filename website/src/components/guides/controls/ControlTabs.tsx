import React, { PropsWithChildren, useCallback } from 'react'
import styled, { useTheme } from 'styled-components'

interface ControlTabsProps {
    tab: 'code' | 'config'
    setTab: (tab: 'code' | 'config') => void
}

export const ControlTabs = ({ tab, setTab }: ControlTabsProps) => {
    return (
        <Tabs role="tablist">
            <ControlTab id="config" isCurrent={tab === 'config'} setTab={setTab}>
                Config
            </ControlTab>
            <ControlTab id="code" isCurrent={tab === 'code'} setTab={setTab}>
                Code
            </ControlTab>
        </Tabs>
    )
}

interface ControlTabProps {
    id: 'code' | 'config'
    isCurrent: boolean
    setTab: (tab: 'code' | 'config') => void
}

const ControlTab = ({ id, isCurrent, setTab, children }: PropsWithChildren<ControlTabProps>) => {
    const handleClick = useCallback(() => {
        setTab(id)
    }, [setTab, id])

    const theme = useTheme()
    const icon = id === 'code' ? 'code' : 'data'
    const iconColors = isCurrent ? 'colored' : 'neutral'

    return (
        <Tab $isCurrent={isCurrent} onClick={handleClick}>
            <Icon className={`sprite-icons-${icon}-${theme.id}-${iconColors}`} />
            {children}
        </Tab>
    )
}

const Tabs = styled.nav`
    height: 46px;
    background: ${({ theme }) => theme.colors.background};
    font-size: 15px;
    color: #aaa;
    position: relative;
    display: flex;
`

const Icon = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    transform: scale(0.44);
    transform-origin: top left;
    margin: 12px 0 0 12px;
`

const Tab = styled.span<{
    $isCurrent: boolean
}>`
    cursor: pointer;
    height: 46px;
    display: block;
    position: relative;
    padding-left: 46px;
    padding-right: 18px;
    padding-top: 11px;
    background: ${({ $isCurrent, theme }) =>
        $isCurrent ? theme.colors.cardBackground : 'transparent'};

    ${Icon} {
        opacity: ${({ $isCurrent }) => ($isCurrent ? 1 : 0.5)};
    }

    &:hover {
        color: ${({ theme }) => theme.colors.text};

        ${Icon} {
            opacity: 1;
        }
    }
`
