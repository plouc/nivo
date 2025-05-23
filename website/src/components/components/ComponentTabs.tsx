import React, { PropsWithChildren, useCallback, useState, useRef } from 'react'
import styled, { useTheme } from 'styled-components'
import { FaCameraRetro, FaRegCopy, FaCheck } from 'react-icons/fa'
import { useCopyToClipboard } from '../../lib/useCopyToClipboard'
import media from '../../theming/mediaQueries'
import { Highlight } from '../Highlight'
import { CodeBlock } from '../CodeBlock'
import { ChartCaptureEffect, ChartCaptureEffectHandle } from './ChartCaptureEffect'

type TabType = 'chart' | 'code' | 'data'
const tabs: TabType[] = ['chart', 'code', 'data']

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

    const captureEffectRef = useRef<ChartCaptureEffectHandle>(null)
    const handleCapture = useCallback(() => {
        captureEffectRef.current?.trigger()
        download?.()
    }, [download, captureEffectRef])

    const [codeCopied, copyCode] = useCopyToClipboard()
    const handleCodeCopy = useCallback(async () => {
        await copyCode(code)
    }, [copyCode, code])

    const [dataCopied, copyData] = useCopyToClipboard()

    let content
    if (currentTab === 'chart') {
        content = (
            <Content id="chart" role="tabpanel">
                {children}
                <ChartCaptureEffect ref={captureEffectRef} />
            </Content>
        )
    } else if (currentTab === 'code') {
        content = (
            <>
                <Code role="tabpanel">
                    <Highlight code={code} language="jsx" />
                </Code>
                <CopyButton onClick={handleCodeCopy} $copied={codeCopied}>
                    {!codeCopied && <FaRegCopy />}
                    {codeCopied && (
                        <>
                            <span>code</span>
                            <FaCheck />
                        </>
                    )}
                </CopyButton>
            </>
        )
    } else if (availableTabs.includes('data') && currentTab === 'data') {
        const dataJson = JSON.stringify(data, null, '  ')
        content = (
            <>
                <Code role="tabpanel">
                    <CodeBlock>{dataJson}</CodeBlock>
                </Code>
                <CopyButton
                    onClick={async () => {
                        await copyData(dataJson)
                    }}
                    $copied={dataCopied}
                >
                    {!dataCopied && <FaRegCopy />}
                    {dataCopied && (
                        <>
                            <span>data</span>
                            <FaCheck />
                        </>
                    )}
                </CopyButton>
            </>
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
                                $isCurrent={isCurrent}
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
                            onClick={handleCapture}
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

const Wrapper = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.dimensions.headerHeight}px;
    right: 0;
    --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
    width: calc(var(--innerWidth) * 0.55);
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
    height: calc(var(--innerHeight) * 0.6);
    z-index: 10;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    ${media.tablet`
        & {
            top: ${({ theme }) => theme.dimensions.headerHeight}px;
            right: 0;
            width: 55%;
            --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
            height: calc(var(--innerHeight) * 0.6);
        }
    `}

    ${media.mobile`
        & {
            position: relative;
            top: auto;
            right: auto;
            width: auto;
            height: 460px;
            z-index: 0;
            border-top: 1px solid ${({ theme }) => theme.colors.border};
        }
    `}
`

const Header = styled.div`
    height: 46px;
    background: ${({ theme }) => theme.colors.background};
    font-size: 15px;
    color: #aaa;
    position: relative;
    display: flex;
    justify-content: space-between;
`

const Nav = styled.nav`
    height: 100%;
    position: relative;
    display: flex;

    ${media.mobile`
        & {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
        }
    `}
`

const NavItem = styled.span<{
    $isCurrent: boolean
}>`
    cursor: pointer;
    height: 46px;
    display: block;
    position: relative;
    padding-left: 46px;
    padding-right: 14px;
    padding-top: 11px;
    background: ${({ $isCurrent, theme }) =>
        $isCurrent ? theme.colors.cardBackground : 'transparent'};

    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }
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

const Content = styled.div`
    position: absolute;
    top: 46px;
    bottom: 0;
    width: 100%;
`

const ExtraButtons = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding-right: 16px;

    ${media.mobile`
        & {
            padding-right: 9px;
        }
    `}
`

const ExtraButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    line-height: 1em;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9rem;
    white-space: pre;

    &:hover {
        background: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.background};
    }
`

const DiceRollButton = styled(ExtraButton)`
    padding: 0 10px;
`

const DownloadButton = styled(ExtraButton)`
    width: 32px;
    font-size: 20px;
    margin-left: 6px;
`

const NodeCount = styled.span`
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    background-color: ${({ theme }) => theme.colors.cardAltBackground};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 13px;
    padding: 5px 11px;

    .isCapturing & {
        display: none;
    }
`

const Code = styled.div`
    position: absolute;
    top: 46px;
    bottom: 0;
    width: 100%;
    overflow: auto;
`

const CopyButton = styled.span<{
    $copied?: boolean
}>`
    position: absolute;
    z-index: 10;
    top: 58px;
    right: 12px;
    height: 32px;
    width: ${({ $copied }) => ($copied ? 'auto' : '32px')};
    padding: ${({ $copied }) => ($copied ? '0 6px 0 12px' : 0)};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.cardAltBackground};
    color: ${({ theme }) => theme.colors.textLight};
    cursor: pointer;

    svg {
        font-size: 18px;
        margin-left: ${({ $copied }) => ($copied ? '9px' : 0)};
    }

    &:hover {
        svg {
            color: ${({ theme }) => theme.colors.accent};
        }
    }
`
