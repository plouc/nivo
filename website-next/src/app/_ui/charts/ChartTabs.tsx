'use client'
import {JSX, useState} from "react";
import styles from './ChartTabs.module.css'

type TabType = 'chart' | 'code' | 'data'
const tabs: TabType[] = ['chart', 'code', 'data']

interface ChartTabsProps<Data> {
    chartIcon: string
    data?: Data
    dataKey?: string
    code: string
    nodeCount?: number
    nodeCountWording?: string
    diceRoll?: () => void
    download?: () => void
    children: JSX.Element
}

export const ChartTabs = <Data,>({
    // chartIcon,
    data,
    dataKey = 'data',
    code,
    diceRoll,
    nodeCount,
    nodeCountWording = 'nodes',
    download,
    children,
}: ChartTabsProps<Data>) => {
    const [currentTab, setCurrentTab] = useState<TabType>('chart')
    // const [hoverTab, setHoverTab] = useState<TabType | null>(null)

    let availableTabs = tabs
    if (data === undefined) {
        availableTabs = availableTabs.filter(t => t !== 'data')
    }

    let content: JSX.Element = <></>
    if (currentTab === 'chart') {
        content = (
            <div id="chart" role="tabpanel" className={styles.content}>
                {children}
            </div>
        )
    } else if (currentTab === 'code') {
        content = (
            <div role="tabpanel" className={styles.code}>
                {code}
                {/* <Highlight code={code} language="jsx" /> */}
            </div>
        )
    } else if (availableTabs.includes('data') && currentTab === 'data') {
        content = (
            <div role="tabpanel" className={styles.code}>
                {JSON.stringify(data, null, '  ')}
                {/*
                <CodeBlock>{JSON.stringify(data, null, '  ')}</CodeBlock>
                */}
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <nav className={styles.nav} role="tablist">
                    {availableTabs.map((tab, index) => {
                        const isCurrent = tab === currentTab
                        // const icon = tab === 'chart' ? chartClass : tab
                        // const iconColors = isCurrent || hoverTab === tab ? 'colored' : 'neutral'

                        return (
                            <span
                                key={tab}
                                role="tab"
                                tabIndex={0}
                                aria-setsize={availableTabs.length}
                                aria-posinset={index + 1}
                                aria-selected={isCurrent}
                                className={isCurrent ? styles.navitem__curent : styles.navitem}
                                onClick={() => setCurrentTab(tab)}
                                // onMouseEnter={() => setHoverTab(tab)}
                                // onMouseLeave={() => setHoverTab(null)}
                            >
                                {/* <Icon}
                                    className={`sprite-icons-${icon}-${theme.id}-${iconColors}`}
                                /> */}
                                {/*
                                <Icon
                                    className={`sprite-icons-${icon}-${theme.id}-${iconColors}`}
                                />
                                */}
                                {tab === 'data' ? dataKey : tab}
                            </span>
                        )
                    })}
                </nav>
                <div className={styles.actions}>
                    {diceRoll && currentTab !== 'code' && (
                        <span
                            className={styles.dice_roll}
                            onClick={diceRoll}
                            role="button"
                            tabIndex={0}
                        >
                            roll the dice
                        </span>
                    )}
                    {download && currentTab === 'chart' && (
                        <span
                            className={styles.download}
                            onClick={download}
                            role="button"
                            tabIndex={0}
                        >
                            X
                            {/*<FaCameraRetro />*/}
                        </span>
                    )}
                </div>
            </div>
            {content}
            {currentTab === 'chart' && nodeCount !== undefined && (
                <span className={styles.node_count}>
                    <strong>{nodeCount}</strong>
                    &nbsp;
                    {nodeCountWording}
                </span>
            )}
        </div>
    )
}
/*
import React, { PropsWithChildren, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { FaCameraRetro } from 'react-icons/fa'
import media from '../../theming/mediaQueries'
import { Highlight } from '../Highlight'
import { CodeBlock } from '../CodeBlock'

interface ComponentTabsProps<D = any> {
    chartClass: string
    data?: D
    dataKey?: string
    code: string
    nodeCount?: number
    nodeCountWording?: string
    diceRoll?: () => void
    download?: () => void
}

export const ComponentTabs = <D extends any = any>({
    chartClass,
    data,
    dataKey = 'data',
    code,
    children,
    diceRoll,
    nodeCount,
    nodeCountWording = 'nodes',
    download,
}: PropsWithChildren<ComponentTabsProps<D>>) => {
    const theme = useTheme()

    const [currentTab, setCurrentTab] = useState<TabType>('chart')
    const [hoverTab, setHoverTab] = useState<TabType | null>(null)

    let availableTabs = tabs
    if (data === undefined) {
        availableTabs = availableTabs.filter(t => t !== 'data')
    }

    let content
    if (currentTab === 'chart') {
        content = (
            <Content id="chart" role="tabpanel">
                {children}
            </Content>
        )
    } else if (currentTab === 'code') {
        content = (
            <Code role="tabpanel">
                <Highlight code={code} language="jsx" />
            </Code>
        )
    } else if (availableTabs.includes('data') && currentTab === 'data') {
        content = (
            <Code>
                <CodeBlock>{JSON.stringify(data, null, '  ')}</CodeBlock>
            </Code>
        )
    }

    return (
        <Wrapper className={`chart-tabs--${currentTab}`}>
            <Header>
                <Nav role="tablist">
                    {availableTabs.map((tab, index) => {
                        const isCurrent = tab === currentTab
                        const icon = tab === 'chart' ? chartClass : tab
                        const iconColors = isCurrent || hoverTab === tab ? 'colored' : 'neutral'

                        return (
                            <NavItem
                                key={tab}
                                role="tab"
                                tabIndex={0}
                                aria-setsize={availableTabs.length}
                                aria-posinset={index + 1}
                                aria-selected={isCurrent}
                                className="no-select"
                                isCurrent={isCurrent}
                                onClick={() => setCurrentTab(tab)}
                                onMouseEnter={() => setHoverTab(tab)}
                                onMouseLeave={() => setHoverTab(null)}
                            >
                                <Icon
                                    className={`sprite-icons-${icon}-${theme.id}-${iconColors}`}
                                />
                                {tab === 'data' ? dataKey : tab}
                            </NavItem>
                        )
                    })}
                </Nav>
                <ExtraButtons>
                    {diceRoll && currentTab !== 'code' && (
                        <DiceRollButton
                            className="no-select"
                            onClick={diceRoll}
                            role="button"
                            tabIndex={0}
                        >
                            roll the dice
                        </DiceRollButton>
                    )}
                    {download && currentTab === 'chart' && (
                        <DownloadButton
                            className="no-select"
                            onClick={download}
                            role="button"
                            tabIndex={0}
                        >
                            <FaCameraRetro />
                        </DownloadButton>
                    )}
                </ExtraButtons>
            </Header>
            {content}
            {currentTab === 'chart' && nodeCount !== undefined && (
                <NodeCount>
                    <strong>{nodeCount}</strong>
                    &nbsp;
                    {nodeCountWording}
                </NodeCount>
            )}
        </Wrapper>
    )
}
 */