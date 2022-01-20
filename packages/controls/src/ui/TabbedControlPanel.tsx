import { useCallback, useMemo, useState } from 'react'
import styled, { ThemeProvider, DefaultTheme } from 'styled-components'
import { Panel } from './Panel'
import { ControlProps } from '../types'
import { Control } from '../Control'

interface TabbedControlsTab {
    name: string
    controls: ControlProps[]
}

interface TabbedControlPanelProps {
    tabs: TabbedControlsTab[]
    theme: DefaultTheme
}

export const TabbedControlPanel = ({ tabs, theme }: TabbedControlPanelProps) => {
    const [tabId, setTabId] = useState(tabs[0].name)
    const currentTab = useMemo(() => tabs.find(({ name }) => name === tabId), [tabs, tabId])

    return (
        <ThemeProvider theme={theme}>
            <Panel>
                <TabsContainer>
                    {tabs.map(tab => (
                        <Tab
                            key={tab.name}
                            tab={tab}
                            isCurrent={tab.name === tabId}
                            setTab={setTabId}
                        />
                    ))}
                </TabsContainer>
                {currentTab && (
                    <>
                        {currentTab.controls.map(control => (
                            <Control key={control.id} control={control} />
                        ))}
                    </>
                )}
            </Panel>
        </ThemeProvider>
    )
}

interface TabProps {
    tab: TabbedControlsTab
    isCurrent: boolean
    setTab: (tab: string) => void
}

const Tab = ({ tab, isCurrent, setTab }: TabProps) => {
    const onClick = useCallback(() => {
        setTab(tab.name)
    }, [setTab, tab.name])

    return (
        <TabContainer isCurrent={isCurrent} onClick={onClick}>
            {tab.name}
        </TabContainer>
    )
}

const TabsContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: ${({ theme }) => theme.colors.inputBackground};
`

const TabContainer = styled.div<{
    isCurrent: boolean
}>`
    flex-shrink: 0;
    display: flex;
    padding: ${({ theme }) => theme.spacing.controlPaddingY}px
        ${({ theme }) => theme.spacing.controlPaddingX}px;
    white-space: nowrap;
    cursor: pointer;
    background-color: ${({ isCurrent, theme }) =>
        isCurrent ? theme.colors.panelBackground : theme.colors.inputBackground};
    color: ${({ isCurrent, theme }) => (isCurrent ? theme.colors.text : theme.colors.textLight)};
    font-weight: ${({ isCurrent }) => (isCurrent ? 600 : 400)};

    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }
`