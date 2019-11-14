/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import media from '../../theming/mediaQueries'
import { useTheme } from '../../theming/context'
import Highlight from '../Highlight'
import CodeBlock from '../CodeBlock'

const tabs = ['chart', 'code', 'data']

const ComponentTabs = ({
    chartClass,
    data,
    dataKey = 'data',
    code,
    children,
    diceRoll,
    nodeCount,
    nodeCountWording = 'nodes',
}) => {
    const theme = useTheme()

    const [currentTab, setCurrentTab] = useState('chart')
    const [hoverTab, setHoverTab] = useState(null)

    let availableTabs = tabs
    if (data === undefined) {
        availableTabs = availableTabs.filter(t => t !== 'data')
    }

    let content
    if (currentTab === 'chart') {
        content = <Content id="chart">{children}</Content>
    } else if (currentTab === 'code') {
        content = (
            <Code>
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
            <Nav>
                {availableTabs.map(tab => {
                    const isCurrent = tab === currentTab
                    const icon = tab === 'chart' ? chartClass : tab
                    const iconColors = isCurrent || hoverTab === tab ? 'colored' : 'neutral'

                    return (
                        <NavItem
                            key={tab}
                            className="no-select"
                            isCurrent={isCurrent}
                            onClick={() => setCurrentTab(tab)}
                            onMouseEnter={() => setHoverTab(tab)}
                            onMouseLeave={() => setHoverTab(null)}
                        >
                            <Icon className={`sprite-icons-${icon}-${theme.id}-${iconColors}`} />
                            {tab === 'data' ? dataKey : tab}
                        </NavItem>
                    )
                })}
                {diceRoll && (
                    <DiceRollButton className="no-select" onClick={diceRoll}>
                        roll the dice
                    </DiceRollButton>
                )}
            </Nav>
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

ComponentTabs.propTypes = {
    chartClass: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    dataKey: PropTypes.string,
    code: PropTypes.string.isRequired,
    nodeCount: PropTypes.number,
    nodeCountWording: PropTypes.string,
    diceRoll: PropTypes.func,
}

export default ComponentTabs

const Wrapper = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.dimensions.headerHeight}px;
    right: 0;
    width: 60%;
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

const Nav = styled.nav`
    height: 46px;
    background: ${({ theme }) => theme.colors.background};
    font-size: 15px;
    color: #aaa;
    position: relative;
    display: flex;

    ${media.mobile`
        & {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
        }
    `}
`

const NavItem = styled.span`
    cursor: pointer;
    height: 46px;
    display: block;
    position: relative;
    padding-left: 46px;
    padding-right: 14px;
    padding-top: 11px;
    background: ${({ isCurrent, theme }) =>
        isCurrent ? theme.colors.cardBackground : 'transparent'};

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

const DiceRollButton = styled.span`
    position: absolute;
    top: 7px;
    right: 16px;
    display: block;
    padding: 8px 10px;
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

    ${media.mobile`
        & {
            grid-column-start: 4;
            justify-self: end;
            right: 8px;
            padding: 8px 8px;
        }
    `}
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
